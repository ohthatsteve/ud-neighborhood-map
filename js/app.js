var map;
var locationArray = ko.observableArray();

//Model for location information
var Location = function(data){
	this.name  = data.name,
	this.address = data.vicinity,
	this.rating = data.rating,
	this.hours = data.opening_hours,
	lat = data.geometry.location.lat();
	lng = data.geometry.location.lng();
	this.latLng = {
		lat: lat,
		lng: lng
	},
	this.active = ko.observable(true),

self = this;
this.img = getImgUrl();

//If the location has a photos property, get that image url, if not use streetview
function getImgUrl(){
	if(data.photos){
		imgUrl = data.photos[0].getUrl({'maxWidth': 500, 'maxHeight': 300})
	}
	else{
	imgUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + self.address;
	}
	return imgUrl;
	}	
}



//Function to be ran after map is initialized
function initMap(){
	var infowindow;
	var types = ['restaurant', 'store'];
	var lat = 43.0485152;
	var	lng = -76.1574217;
	var latlng = lat + ','+ lng;

	//Retrieve map div and give it an initial location
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat : lat,
		lng : lng},
		zoom: 15,
		styles: mapStyle,
		mapTypeControlOptions: { mapTypeIds: [] }

	});
	service = new google.maps.places.PlacesService(map);
	for(var i = 0; i < types.length; i++){
		getLocations(types[i]);

	}
		function getLocations(type){
		//Request object for places nearby search	
		request = {
			location: map.center,
			radius: '500',
			type: type,
			keyword: 'photos'

			}
			
			//Retrieve location information
			service.nearbySearch(request, callback);
			
			//Create new Location objects for first 8 results
			function callback(results){
				for(var e = 0; e < 8; e++){
					newLocation = new Location(results[e]);
					addMarker(newLocation);
					addInfoWindow(newLocation);
					newLocation.type = type;
					locationArray.push(newLocation);
				}
			
			}
	}
	

	function addMarker(location){
		//Create markers for each location
		location.marker = new google.maps.Marker({
			position: location.latLng,
			map: null,
			animation: google.maps.Animation.DROP,
			title: location.name
		})
	};

	function addInfoWindow(location){
		//Create infowindow for each marker
		location.marker.infowindow = new google.maps.InfoWindow({
			content: '<div class = "info-window"><h3>' + location.name + ' </h3><img class = "info-window-top-img" src = "'+location.img+'"></div>'
		})


		//Add click event listener to marker to open infowindow
		location.marker.addListener('click', function(){
		location.marker.infowindow.open(map, location.marker);
		location.marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function(){
			location.marker.setAnimation(null);
			}, 1500);
		})


	}
}
		
var ViewModel = function(){ 

	
	//Display or hide marker and infowindow of location clicked on list
	this.showMarker = function(){
		//If the marker isn't displayed, display it
		if(this.marker.map == null){
			this.marker.setMap(map);
			map.setCenter(this.latLng);
		}


		//Else take it off the map
		else{
			this.marker.infowindow.close();
			this.marker.setMap(null);
		}
	};

	var currentCatagory;
	var active;
	
	//Display markers for all locations of the selected catagory
	this.showCatagory = function(){
		currentCatagory = this.type;
		active = this.active;
		console.log(currentCatagory);
		//If catagory is inactive, display all markers for selected catagory
		if(!active){
			locationArray().forEach(function(location){
				if(location.type == currentCatagory){
					location.marker.setMap(map);
					location.active(true);
				}
				else{
					location.marker.setMap(null);
					location.active(false);
				}
			})
		
		//Set selected catagory to active
		this.active = true;
		}
		
		//Else remove markers from selected catagory from the map
		else{
			locationArray().forEach(function(location){
				if(location.catagory == currentCatagory){
					location.marker.setMap(null);
					location.marker.infowindow.close();
				}
				location.active(true);
			})
		
		//Set selected catagory to inactive
		this.active = false;
		}
	}

};
	
	var $navContent = $('#nav-content'),
		$navContainer = $('#nav-container'),
		$navIcon = $('#nav-icon');

	//Toggle classes to hide or display the navigation panel
	this.toggleNav = function(){
		//Hide content of the navigation panel on a timeout
		setTimeout(function(){
			$navContent.toggleClass('hidden')
		}, 250);
		
		$navContainer.toggleClass('closed');
		$navIcon.toggleClass('open');
	}

	//Fade header after any click
	this.fadeHeader = function(){
		var $header = $('#header');
		$header.addClass('fade-out');
	}

	ko.applyBindings(new ViewModel());