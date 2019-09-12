// import {SP} from '@/swiper.js'
export function MP(ak) {  
  return new Promise(function (resolve, reject) {  
    window.onload = function () {  
        resolve(BMap);
        
        var script1 = document.createElement("script");  
        script1.type = "text/javascript";  
        script1.src = "http://api.map.baidu.com/library/DrawingManager/1.4/src/DrawingManager_min.js";  
        script1.onerror = reject; 
        document.head.appendChild(script1);
    }  
    var script = document.createElement("script");  
    script.type = "text/javascript";  
    script.src = "http://api.map.baidu.com/api?v=2.0&ak="+ak+"&callback=init";  
    script.onerror = reject;  

    document.head.appendChild(script);  
    // SP();

  })  
} 