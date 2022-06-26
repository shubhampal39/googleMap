var lat,lng;
initGeolocation();
function myMap() {
    var apikey = 'AIzaSyBQrPYIALaBDXkgqrCOURz1iU3ZiXSyquQ';
    var weatherApi='2be9d25f94b958987119dc1c0808b9f2';
    var targetDate = new Date()
    var timestamp = targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60;
    var clickLocation,clickWeather;
    var mapProp = {
        center: new google.maps.LatLng(lat,lng),
        zoom: 10,

    };
    var coordinates = { lat: lat, lng: lng };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    
    placeMarker(map, coordinates);

    google.maps.event.addListener(map, 'click', function (event) {
        lat=event.latLng.lat();
        lng=event.latLng.lng();
        placeMarker(map, event.latLng);
    });

      function placeMarker(map, location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
      
        var googleMapUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${apikey}`;
        var openWeatherUrl =`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${weatherApi}`;

      var infowindow;
      getData(googleMapUrl,abcd).then(data=>{
        clickLocation=data;
        abcd();
        });
      
      function abcd(){
        getData(openWeatherUrl).then(data=>{
            clickWeather=data;
        var offsets = clickLocation.dstOffset * 1000 + clickLocation.rawOffset * 1000 ;
        var localdate = new Date(timestamp * 1000 + offsets) ;
        let sky= clickWeather.weather[0].description;
         infowindow = new google.maps.InfoWindow({
            content: 'Time Zone: ' + clickLocation.timeZoneId+
            '<br>Date & Time: ' + localdate.toLocaleString() +
                '<br>Weather: ' + sky
        });
        infowindow.open(map, marker);
      });
    }

    }
}

function getData(url){
    return fetch(url)
    .then((response) => response.json())
    .then((responseData) => {
         return responseData;
    })
    .catch(error => console.warn(error));
  }

      
  function initGeolocation()
  {

     if( navigator.geolocation )
     {
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
     }
     else
     {
        alert("Sorry, your browser does not support geolocation services.");
     }
  }

  function successFunction(position) {
     lat = position.coords.latitude;
     lng = position.coords.longitude;
     myMap();
 }
 
 function errorFunction(){
     alert("Geocoder failed");
 }
 