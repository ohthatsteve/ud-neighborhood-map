var map;

//Function to be ran after map is initialized
function initMap(){
	
	var geocoder;
	var infowindow;
	//Retrieve map div and give it an initial location
	map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 43.042, lng: -76.123},
          zoom: 15,
          styles: mapStyle,
          mapTypeControlOptions: { mapTypeIds: [] }

        });
	
	//Initialize geocoder after the map is initialized to retrieve latlng information
	geocoder = new google.maps.Geocoder();
	

	//Request and store latlng data for each location in array
	initialLocations.forEach(function(location){
		
		geocoder.geocode(
		{
			address: location.address,
			componentRestrictions: {locality: 'Syracuse'}
		}, 
			function(results, status){
				//If the location is found
				if(location.address && status == google.maps.GeocoderStatus.OK){
					//Store latlng data as an object in the object for the current location
					location.latLng = { lat: results['0'].geometry.location.lat(),
										lng: results['0'].geometry.location.lng()
										}
					
					//Create markers for each location
					location.marker = new google.maps.Marker({
						position: location.latLng,
						map: null,
						animation: google.maps.Animation.DROP,
						title: location.name
					})

					//Create infowindow for each marker
					location.marker.infowindow = new google.maps.InfoWindow({
						content: '<div class = "info-window"> <h3>' + location.name + ' </h3></div>'
					})

					//Open infowindow when you click the marker
					location.marker.addListener('click', function(){
						location.marker.infowindow.open(map, location.marker);
					})

				}
				
				else{
					location.error(true);
				}
				
			}
		)
	})

};
		
var ViewModel = function(){ 

	//Display or hide marker and infowindow of location clicked on list
	this.showMarker = function(){
		//If the marker isn't displayed, display it
		if(this.marker.map == null){
			this.marker.setMap(map);
			this.marker.infowindow.open(map, this.marker);
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

		//If catagory is inactive, display all markers for selected catagory
		if(!active){
			initialLocations.forEach(function(location){
				if(location.catagory == currentCatagory){
					location.marker.setMap(map);
				}
			})
		
		//Set selected catagory to active
		this.active = true;
		}
		
		//Else remove markers from selected catagory from the map
		else{
			initialLocations.forEach(function(location){
				if(location.catagory == currentCatagory){
					location.marker.setMap(null);
					location.marker.infowindow.close();
				}
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
		
		$navContainer.toggleClass('open closed');
		$navIcon.toggleClass('open');
	}

	
	//Fade header after any click
	this.fadeHeader = function(){
		var $header = $('#header');
		$header.addClass('fade-out');
	}

	ko.applyBindings(new ViewModel());