var map; 

//Array to be populated with location objects
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

this.img = getImgUrl(data, this);

}

//If the location has a photos property, get that image url, if not use streetview
function getImgUrl(data, self){
	if(data.photos){
		imgUrl = data.photos[0].getUrl({'maxWidth': 250, 'maxHeight': 250})
	}
	else{
	imgUrl = 'http://maps.googleapis.com/maps/api/streetview?size=400x200&location=' + self.address;
	}
	return imgUrl;
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
		zoom: 17,
		styles: mapStyle,
		mapTypeControlOptions: { mapTypeIds: [] }

	});

	var service = new google.maps.places.PlacesService(map);
	var bounds = new google.maps.LatLngBounds();
	for(var i = 0; i < types.length; i++){
		getLocations(types[i]);

	}
	
	function getLocations(type){
		//Request object for places nearby search	
		request = {
			location: map.center,
			radius: '350',
			rankby: 'prominence',
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
					newLocation.type = type;
					locationArray.push(newLocation);
				}
			}
	}
	
	//Add marker and info window to location object
	 function addMarker(location){
		//Create marker for current location
		location.marker = new google.maps.Marker({
			position: location.latLng,
			map: null,
			title: location.name
		})
		
		//Extend bounderies of the map to fit all markers
		bounds.extend(location.marker.position);
		
		//Create info window for new marker
		location.marker.infowindow = new google.maps.InfoWindow({
			content: '<div class = "info-window"><img class = "info-window-top-img" src = "'+location.img+'"><h3 class = "info-window-title">' + location.name + ' </h3></div>'
		})

		//Add click event listener to marker to open info window
		location.marker.addListener('click', function(){
			location.marker.infowindow.open(map, location.marker);
			location.marker.setAnimation(google.maps.Animation.BOUNCE);
			setTimeout(function(){
				location.marker.setAnimation(null);
				}, 1500);
			})


		}

}//END INIT MAP


var ViewModel = function(){ 
	currentLocation = null;
	//Display or hide marker and infowindow of location clicked on list
	this.showMarker = function(){
		if(currentLocation == null){
			currentLocation = this;
		}
	
		//If the marker isn't displayed, display it and center the viewport on it
		if(this.marker.map == null){
			currentLocation.marker.setMap(null);
			this.marker.setAnimation(google.maps.Animation.DROP);
			this.marker.setMap(map);
			this.marker.infowindow.open(map, this.marker);
			map.setCenter(this.latLng);
			currentLocation = this;
		}


		//Else take it off the map
		else{
			this.marker.infowindow.close();
			this.marker.setMap(null);
		}
	};

	//Variables used in showCatagory function
	var currentCatagory,
		active;
	
	//Display markers for all locations of the selected catagory
	this.showCatagory = function(){
		currentCatagory = this.type;
		active = this.active();
		
		//If catagory was inactive, display only locations of selected catagory
		if(!active){
			locationArray().forEach(function(location){
				if(location.type == currentCatagory){
					location.active(true);
				}
				else{
					location.active(false);
				}
			})
		
		//Set selected catagory to active
		this.active(true);
		}
		
		//Else remove filter
		else{
			locationArray().forEach(function(location){
				location.active(true);
			})
		
		//Set selected catagory to inactive
		this.active(false);
		}
	}

};
	//Variables used in toggleNav function
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

	//Fade header after any click or on timer
	this.fadeHeader = function(){
		var $header = $('#header');
		$header.addClass('fade-out');
	

	}

	setTimeout(this.fadeHeader, 5000);

	ko.applyBindings(new ViewModel());