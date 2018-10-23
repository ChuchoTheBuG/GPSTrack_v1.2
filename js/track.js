
window.onload=actualizarMarcador;
setInterval(actualizarMarcador, 15000);

var image;
//Funcion ejecutada al cargar la pagian web
function actualizarMarcador(){

    //LLamamos a la funcion xmlHTTPRequest para hacer una peticion al servidor
    //mediante metodo GET, con el codigo 200 para solicitar las gruas activas
    var xmlhttp;
    console.log("Realizando consulta");

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function(){
    	if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    		var obj = JSON.parse(xmlhttp.responseText); 
    		console.log(obj);

    		actualizarInfoWindow(obj);
    		setMarker(obj);
    	}
    }

    xmlhttp.open("GET","http://restapi.talleresygruasmendez.com.mx/v1.1/auto/201");
    xmlhttp.send(); 

}


function setMarker(obj){

	actualizarImage(obj);


	var latlng = {lat: parseFloat(obj.response.lat), lng: parseFloat(obj.response.lon)};

	mainMarker.setPosition(latlng);
	mainMarker.setIcon(image);
	map.setCenter(latlng);
	map.setZoom(16);

}




function actualizarInfoWindow(obj){
	var tomadeFuerza;
	var estadoBateria;

	if (obj.response.b_estado === "200") {
		estadoBateria = "Principal"
	}
	else{
		estadoBateria = "Bateria Interna";
	}


	if (obj.response.tf === "201") {
		tomadeFuerza = "Activada";
	}

	else{
		tomadeFuerza = "Desactivada";
	}
	console.log("Toma de Fuerza: "+obj.response.tf);


	contentString = '<div id="content">'+
	'<div id="siteNotice">'+
	'</div>'+
	'<div id="bodyContent">'+
	'<h5><b>Estado de la Grua ID: XAL001</b></h5>' +
	'<ul>'+
	'<li>ID: XAL001</li>'+
	'<li>Toma de Fuerza: '+ tomadeFuerza +'</li>'+
	'<li>Ultima Conexion: '+obj.response.date+'</li>'+
	'<li>Lat, Lng: '+obj.response.lat+', '+obj.response.lon+'</li>'+
	'<li>Alimentacion: Principal</li>'+
	'<li>Bateria: '+obj.response.b_porcent+' Voltage: '+obj.response.b_voltage+ '</li>'+
	'<li>Señal GSM: '+obj.response.gsmq+'</li>'+
	'</ul>'+
	'</div>'+
	'</div>';

	infowindow.setContent(contentString);

}

function actualizarImage(obj){
    //toma de fierza activada
    if (obj.response.tf === "201") {
    	image = {
    		url: 'http://talleresygruasmendez.com.mx/track/img/marker.png',
    		// This marker is 20 pixels wide by 32 pixels high.
    		size: new google.maps.Size(100, 97),
    		// The origin for this image is (0, 0).
    		origin: new google.maps.Point(0, 0),
    		// The anchor for this image is the base of the flagpole at (0, 32).
    		anchor: new google.maps.Point(17, 97)};

    	}


    	else{

    		image = {
    			url: 'http://talleresygruasmendez.com.mx/track/img/markerOff.png',
    	// This marker is 20 pixels wide by 32 pixels high.
    	size: new google.maps.Size(100, 97),
    	// The origin for this image is (0, 0).
    	origin: new google.maps.Point(0, 0),
    	// The anchor for this image is the base of the flagpole at (0, 32).
    	anchor: new google.maps.Point(17, 97)};

    }

}