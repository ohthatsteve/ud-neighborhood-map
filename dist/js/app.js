function getImgUrl(e,t){return e.photos?imgUrl=e.photos[0].getUrl({maxWidth:250,maxHeight:250}):imgUrl="http://maps.googleapis.com/maps/api/streetview?size=400x200&location="+t.address,imgUrl}function initMap(){function e(e){function o(o){for(var a=0;a<8;a++)newLocation=new Location(o[a]),t(newLocation),newLocation.type=e,locationArray.push(newLocation)}request={location:map.center,radius:"350",rankby:"prominence",type:e,keyword:"photos"},a.nearbySearch(request,o)}function t(e){e.marker=new google.maps.Marker({position:e.latLng,map:null,title:e.name}),r.extend(e.marker.position),e.marker.infowindow=new google.maps.InfoWindow({content:'<div class = "info-window"><img class = "info-window-top-img" src = "'+e.img+'"><h3 class = "info-window-title">'+e.name+" </h3></div>"}),e.marker.addListener("click",function(){e.marker.infowindow.open(map,e.marker),e.marker.setAnimation(google.maps.Animation.BOUNCE),setTimeout(function(){e.marker.setAnimation(null)},1500)})}var o=["restaurant","store"];map=new google.maps.Map(document.getElementById("map"),{center:{lat:43.0485152,lng:-76.1574217},zoom:17,styles:mapStyle,mapTypeControlOptions:{mapTypeIds:[]}});for(var a=new google.maps.places.PlacesService(map),r=new google.maps.LatLngBounds,l=0;l<o.length;l++)e(o[l])}var map,locationArray=ko.observableArray(),catagories=[{type:"restaurant",icon:"🍽",active:ko.observable(!1)},{type:"store",icon:"🛍",active:ko.observable(!1)}],Location=function(e){this.name=e.name,this.address=e.vicinity,this.rating=e.rating,this.hours=e.opening_hours,lat=e.geometry.location.lat(),lng=e.geometry.location.lng(),this.latLng={lat:lat,lng:lng},this.active=ko.observable(!0),this.img=getImgUrl(e,this)},ViewModel=function(){currentLocation=null,this.showMarker=function(){null==currentLocation&&(currentLocation=this),null==this.marker.map?(currentLocation.marker.setMap(null),this.marker.setAnimation(google.maps.Animation.DROP),this.marker.setMap(map),this.marker.infowindow.open(map,this.marker),map.setCenter(this.latLng),currentLocation=this):(this.marker.infowindow.close(),this.marker.setMap(null))};var e,t;this.showCatagory=function(){e=this.type,t=this.active(),t?(locationArray().forEach(function(e){e.active(!0)}),this.active(!1)):(locationArray().forEach(function(t){t.type==e?t.active(!0):t.active(!1)}),this.active(!0))}},$navContent=$("#nav-content"),$navContainer=$("#nav-container"),$navIcon=$("#nav-icon");this.toggleNav=function(){setTimeout(function(){$navContent.toggleClass("hidden")},250),$navContainer.toggleClass("closed"),$navIcon.toggleClass("open")},this.fadeHeader=function(){var e=$("#header");e.addClass("fade-out")},setTimeout(this.fadeHeader,5e3),ko.applyBindings(new ViewModel);var mapStyle=[{elementType:"geometry",stylers:[{color:"#1d2c4d"}]},{elementType:"labels.text.fill",stylers:[{color:"#8ec3b9"}]},{elementType:"labels.text.stroke",stylers:[{color:"#1a3646"}]},{featureType:"administrative",elementType:"geometry",stylers:[{visibility:"off"}]},{featureType:"administrative.country",elementType:"geometry.stroke",stylers:[{color:"#4b6878"}]},{featureType:"administrative.land_parcel",elementType:"labels.text.fill",stylers:[{color:"#64779e"}]},{featureType:"administrative.province",elementType:"geometry.stroke",stylers:[{color:"#4b6878"}]},{featureType:"landscape.man_made",elementType:"geometry.stroke",stylers:[{color:"#334e87"}]},{featureType:"landscape.natural",elementType:"geometry",stylers:[{color:"#023e58"}]},{featureType:"poi",stylers:[{visibility:"off"}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#283d6a"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#6f9ba5"}]},{featureType:"poi",elementType:"labels.text.stroke",stylers:[{color:"#1d2c4d"}]},{featureType:"poi.park",elementType:"geometry.fill",stylers:[{color:"#023e58"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#3C7680"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#304a7d"}]},{featureType:"road",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"labels.text.fill",stylers:[{color:"#98a5be"}]},{featureType:"road",elementType:"labels.text.stroke",stylers:[{color:"#1d2c4d"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#2c6675"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#255763"}]},{featureType:"road.highway",elementType:"labels.text.fill",stylers:[{color:"#b0d5ce"}]},{featureType:"road.highway",elementType:"labels.text.stroke",stylers:[{color:"#023e58"}]},{featureType:"transit",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"labels.text.fill",stylers:[{color:"#98a5be"}]},{featureType:"transit",elementType:"labels.text.stroke",stylers:[{color:"#1d2c4d"}]},{featureType:"transit.line",elementType:"geometry.fill",stylers:[{color:"#283d6a"}]},{featureType:"transit.station",elementType:"geometry",stylers:[{color:"#3a4762"}]},{featureType:"water",elementType:"geometry",stylers:[{color:"#0e1626"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#4e6d70"}]}];