(function() {

	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyA0EPA1Gm0IHCFRhy3z2YG2hERSby8hiuU",
		authDomain: "muzoiotclassroom.firebaseapp.com",
		databaseURL: "https://muzoiotclassroom.firebaseio.com",
		projectId: "muzoiotclassroom",
		storageBucket: "muzoiotclassroom.appspot.com",
		messagingSenderId: "633687263683"
	};
	firebase.initializeApp(config);

	// Create reference
	var dbRefObject = firebase.database().ref().child('hisarcs').child('data');

	// Sync object changes
	dbRefObject.on('value', snap => {
		var snapVal = snap.val();

		var key = Object.keys(snapVal);
		for(var value in snapVal) {
			var temperature = snapVal[value]['temp'];
			var pressure = snapVal[value]['pres'];
			var ts = snapVal[value]['ts'].substring(11,19);

			var trElement = document.createElement("tr");
			var temperatureTr = document.createElement("th");
			var pressureTr = document.createElement("th");
			var tsTr = document.createElement("th");

			temperatureTr.innerHTML = temperature;
			pressureTr.innerHTML = pressure;
			tsTr.innerHTML = ts;

			trElement.appendChild(temperatureTr);
			trElement.appendChild(pressureTr);
			trElement.appendChild(tsTr);
			document.getElementById("line-chart").appendChild(trElement);
		}

	});

}());

