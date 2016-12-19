//Long arrays of data are moved to a seperate file to improve readability

//Hardcoded location data array
var initialLocations = [{
	name: 'MOST',
	address: '500 S Franklin St',
	catagory: 'entertainment',
	error: ko.observable(false)
},{
	name: 'Oncenter War Memorial',
	address: '800 S State St',
	catagory: 'entertainment',
	error: ko.observable(false)	
},{
	name: 'Everson Museum of Art',
	address: '401 Harrison St',
	catagory: 'entertainment',
	error: ko.observable(false)
},{
	name: 'Carrier Dome',
	address: '900 Irving Ave',
	catagory: 'entertainment',
	error: ko.observable(false)
},{
	name: 'Dinosaur BBQ',
	address: '246 E Willow St',
	catagory: 'dining',
	error: ko.observable(false)
},{
	name: 'Recess Coffee',
	address: '110 Montgomery St #103',
	catagory: 'dining' ,
	error: ko.observable(false)	
},{
	name: 'Cafe Kubal',
	address: '401 S Salina St',
	catagory: 'dining',
	error: ko.observable(false)	
},{
	name: 'Roji Tea Lounge',
	address: '108 E Washington St #2',
	catagory: 'dining',
	error: ko.observable(false)	
},{
	name: 'Strong Hearts Cafe',
	address: '719 E Genesee St',
	catagory: 'dining',
	error: ko.observable(false)	
},{
	name: 'J. Ryan\'s',
	address: '253 E Water St',
	catagory: 'nightlife',
	error: ko.observable(false) 	
},{
	name: 'Modern Malt',
	address: '325 S Clinton St',
	catagory: 'nightlife',
	error: ko.observable(false)	
},{
	name: 'asdfjkae',
	error: ko.observable(false)
}];

//Array of catagories used for filtering
var catagories = [{
	type: 'dining',
	icon: '🍽',
	active: false
},{
	type: 'entertainment',
	icon: '🎭',
	active: false
},{
	type: 'nightlife',
	icon: '🍸',
	active: false
}];

//Map style to remove Google's points of interest and make the map prettier, generated from https://mapstyle.withgoogle.com/
var mapStyle = [
		  {
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#1d2c4d"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#8ec3b9"
		      }
		    ]
		  },
		  {
		    "elementType": "labels.text.stroke",
		    "stylers": [
		      {
		        "color": "#1a3646"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative.country",
		    "elementType": "geometry.stroke",
		    "stylers": [
		      {
		        "color": "#4b6878"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative.land_parcel",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#64779e"
		      }
		    ]
		  },
		  {
		    "featureType": "administrative.province",
		    "elementType": "geometry.stroke",
		    "stylers": [
		      {
		        "color": "#4b6878"
		      }
		    ]
		  },
		  {
		    "featureType": "landscape.man_made",
		    "elementType": "geometry.stroke",
		    "stylers": [
		      {
		        "color": "#334e87"
		      }
		    ]
		  },
		  {
		    "featureType": "landscape.natural",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#023e58"
		      }
		    ]
		  },
		  {
		    "featureType": "poi",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "poi",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#283d6a"
		      }
		    ]
		  },
		  {
		    "featureType": "poi",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#6f9ba5"
		      }
		    ]
		  },
		  {
		    "featureType": "poi",
		    "elementType": "labels.text.stroke",
		    "stylers": [
		      {
		        "color": "#1d2c4d"
		      }
		    ]
		  },
		  {
		    "featureType": "poi.park",
		    "elementType": "geometry.fill",
		    "stylers": [
		      {
		        "color": "#023e58"
		      }
		    ]
		  },
		  {
		    "featureType": "poi.park",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#3C7680"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#304a7d"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "labels.icon",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#98a5be"
		      }
		    ]
		  },
		  {
		    "featureType": "road",
		    "elementType": "labels.text.stroke",
		    "stylers": [
		      {
		        "color": "#1d2c4d"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#2c6675"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "geometry.stroke",
		    "stylers": [
		      {
		        "color": "#255763"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#b0d5ce"
		      }
		    ]
		  },
		  {
		    "featureType": "road.highway",
		    "elementType": "labels.text.stroke",
		    "stylers": [
		      {
		        "color": "#023e58"
		      }
		    ]
		  },
		  {
		    "featureType": "transit",
		    "stylers": [
		      {
		        "visibility": "off"
		      }
		    ]
		  },
		  {
		    "featureType": "transit",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#98a5be"
		      }
		    ]
		  },
		  {
		    "featureType": "transit",
		    "elementType": "labels.text.stroke",
		    "stylers": [
		      {
		        "color": "#1d2c4d"
		      }
		    ]
		  },
		  {
		    "featureType": "transit.line",
		    "elementType": "geometry.fill",
		    "stylers": [
		      {
		        "color": "#283d6a"
		      }
		    ]
		  },
		  {
		    "featureType": "transit.station",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#3a4762"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "geometry",
		    "stylers": [
		      {
		        "color": "#0e1626"
		      }
		    ]
		  },
		  {
		    "featureType": "water",
		    "elementType": "labels.text.fill",
		    "stylers": [
		      {
		        "color": "#4e6d70"
		      }
		    ]
		  }
		]