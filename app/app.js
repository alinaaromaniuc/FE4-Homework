﻿//set map options
var myLatLng = { lat: 47.151726, lng: 27.587914 };
var mapOptions = {
    center: myLatLng,
    zoom: 10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

//create map
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create a DirectionsService object to use the route method and get a result for the request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

//define calcRoute function
function calcRoute() {
    //create request
    var request = {
        origin: document.getElementById('from').value,
        destination: document.getElementById('to').value,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    };

    //pass the request to the route method
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            //Get distance
            $('#output').html(
                "<div class='alert-info'>" +
                // <br />Durata calatoriei: ' +
                // result.routes[0].legs[0].duration.text +
                ' Multumim pentru comanda domnule ' +
                document.getElementById('name').value +
                '. <br /> Pretul dumneavoastra este ' +
                (result.routes[0].legs[0].distance.value / 1000) *
                document.getElementById('masina1').value +
                ' lei unde: <br /> ' +
                (result.routes[0].legs[0].distance.value / 1000) *
                document.getElementById('masina1').value +
                ' = ' +
                result.routes[0].legs[0].distance.text +
                ' * ' +
                document.getElementById('masina1').value +
                '</div>'
            );

            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            map.setCenter(myLatLng);

            //show error message
            $('#output').html(
                "<div class='alert-danger'>Could not retrieve driving distance.</div>"
            );
        }
    });
}

//create autocomplete objects for all inputs
var options = {
    types: ['(cities)']
};

var input1 = document.getElementById('from');
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById('to');
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);