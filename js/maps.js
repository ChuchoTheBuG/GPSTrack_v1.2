 
var mainMarker;
var map;
var infowindow;
var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<div id="bodyContent">'+
            '<h5><b>Estado de la Grua ID: XAL001</b></h5>' +
            '<ul>'+
            '<li>ID: XAL001</li>'+
            '<li>Toma de Fuerza: '+ 'Desactivada' +'</li>'+
            '<li>Ultima Conexion: </li>'+
            '<li>Lat, Lng: </li>'+
            '<li>Alimentacion: Principal</li>'+
            '<li>Bateria: Voltage: </li>'+
            '<li>Señal GSM: </li>'+
            '</ul>'+
            '</div>'+
            '</div>';

function initMap() {



	var myLatLng = {lat: 19.5421271, lng: -96.9199274};
	var myCoor = {lat: 19.563354, lng: -96.926013};

		map = new google.maps.Map(document.getElementById('map'), {
		zoom: 8,
		center: myLatLng
	});

		infowindow = new google.maps.InfoWindow({
          content: contentString
        });
		
		
		mainMarker = new google.maps.Marker({
		position: myLatLng,
		map: map,
		animation: google.maps.Animation.DROP,
		title: 'Grua XAL001 Esta Aqui'

	});

		mainMarker.addListener('click', function() {
          infowindow.open(map, mainMarker);
        });

	
}