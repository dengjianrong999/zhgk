export function SP(){
	// return new Promise(function(resolve,reject){
	// 	window.onload = function(){
	// 		resolve(Swiper);
	// 	}
		var script = document.createElement("script");  
		script.type = "text/javascript";  
		script.src = "https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.0.2/js/swiper.min.js";  

		document.head.appendChild(script);
	// });
}