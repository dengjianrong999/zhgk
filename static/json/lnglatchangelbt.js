var EPSLN = (typeof Number.EPSILON === 'undefined') ? 1.0e-10 : Number.EPSILON;
var conv = 180 / Math.PI;
var HALF_PI = Math.PI / 2;
var SPI = 3.14159265359;
var TWO_PI = 2 * Math.PI;
var a = 6378137;
var b = 6356752.314245179;
var e = 0.08181919084262157;
var lat1 = 0.52359877559829;
var lat2 = 1.04719755119659; 
var long0 = 1.8029251173101;
var lat0 = 0;
var k0 = 1; 
var ns;
var f0;
var rh;

//常用的转换参数，直接提取引用
var tsfnz = function(eccent, phi, sinphi) {
    var con = eccent * sinphi;
    var com = 0.5 * eccent;
    con = Math.pow(((1 - con) / (1 + con)), com);
    return(Math.tan(0.5 * (HALF_PI - phi)) / con);
};
var sign = function(x) {
    return x < 0 ? -1 : 1;
};
var msfnz = function(eccent, sinphi, cosphi) {
    var con = eccent * sinphi;
    return cosphi / (Math.sqrt(1 - con * con));
};

var adjust_lon = function(x) {
    return(Math.abs(x) <= SPI) ? x : (x - (sign(x) * TWO_PI));
};

var phi2z = function(eccent, ts) {
    var eccnth = 0.5 * eccent;
    var con, dphi;
    var phi = HALF_PI - 2 * Math.atan(ts);
    for(var i = 0; i <= 15; i++) {
        con = eccent * Math.sin(phi);
        dphi = HALF_PI - 2 * Math.atan(ts * (Math.pow(((1 - con) / (1 + con)), eccnth))) - phi;
        phi += dphi;
        if(Math.abs(dphi) <= 0.0000000001) {
            return phi;
        }
    }
    //console.log("phi2z has NoConvergence");
    return -9999;
};

//根据proj4的坐标系描述字符串，解析其中的参数
function init(prjstr) {
    if(prjstr.indexOf(" ") > -1) {
        var _prjArr = prjstr.split(" ");
        _prjArr.forEach(function(item, index, input) {
            if(item.indexOf("lat_0") > -1) {
                lat0 = parseFloat(item.split("=")[1]) / conv;
            }
        })
    }
    var sin1 = Math.sin(lat1);
    var cos1 = Math.cos(lat1);
    var ms1 = msfnz(e, sin1, cos1);
    var ts1 = tsfnz(e, lat1, sin1);

    var sin2 = Math.sin(lat2);
    var cos2 = Math.cos(lat2);
    var ms2 = msfnz(e, sin2, cos2);
    var ts2 = tsfnz(e, lat2, sin2);

    var ts0 = tsfnz(e, lat0, Math.sin(lat0));
    if(Math.abs(lat1 - lat2) > EPSLN) {
        ns = Math.log(ms1 / ms2) / Math.log(ts1 / ts2);
    } else {
        ns = sin1;
    }
    if(isNaN(ns)) {
        ns = sin1;
    }
    f0 = ms1 / (ns * Math.pow(ts1, ns));
    rh = a * f0 * Math.pow(ts0, ns);
}

//经纬度坐标转兰伯特坐标
function projCood(lon, lat) {
    var sin1 = Math.sin(lat1);
    var cos1 = Math.cos(lat1);
    var ms1 = msfnz(e, sin1, cos1);
    var ts1 = tsfnz(e, lat1, sin1);

    var sin2 = Math.sin(lat2);
    var cos2 = Math.cos(lat2);
    var ms2 = msfnz(e, sin2, cos2);
    var ts2 = tsfnz(e, lat2, sin2);

    var ts0 = tsfnz(e, lat0, Math.sin(lat0));
    if(Math.abs(lat1 - lat2) > EPSLN) {
        ns = Math.log(ms1 / ms2) / Math.log(ts1 / ts2);
    } else {
        ns = sin1;
    }
    if(isNaN(ns)) {
        ns = sin1;
    }
    f0 = ms1 / (ns * Math.pow(ts1, ns));
    rh = a * f0 * Math.pow(ts0, ns);
    
    lon = lon / conv;
    lat = lat / conv;
    if(Math.abs(2 * Math.abs(lat) - Math.PI) <= EPSLN) {
        lat = sign(lat) * (HALF_PI - 2 * EPSLN);
    }
    
    var con = Math.abs(Math.abs(lat) - HALF_PI);
    var ts, rh1;
    if(con > EPSLN) {
        ts = tsfnz(e, lat, Math.sin(lat));
        rh1 = a * f0 * Math.pow(ts, ns);
    } else {
        con = lat * ns;
        if(con <= 0) {
            return null;
        }
        rh1 = 0;
    }
    var theta = ns * adjust_lon(lon - long0);
    console.log(ns);
    var nlon = (rh1 * Math.sin(theta));
    var nlat = (rh - rh1 * Math.cos(theta));
   
    return [nlon, nlat];
}
export{projCood}
//兰伯特坐标转经纬度坐标
function inverseProj(x1, y1) {
    var rh1, con, ts;
    var lat, lon;
    var x = x1 / k0;
    var y = (rh - y1 / k0);
    if(ns > 0) {
        rh1 = Math.sqrt(x * x + y * y);
        con = 1;
    } else {
        rh1 = -Math.sqrt(x * x + y * y);
        con = -1;
    }
    var theta = 0;
    if(rh1 !== 0) {
        theta = Math.atan2((con * x), (con * y));
    }
    if((rh1 !== 0) || (ns > 0)) {
        con = 1 / ns;
        ts = Math.pow((rh1 / (a * f0)), con);
        lat = phi2z(e, ts);
        if(lat === -9999) {
            return null;
        }
    } else {
        lat = -HALF_PI;
    }
    lon = adjust_lon(theta / ns + long0);

    return [lon * conv, conv * lat];
}