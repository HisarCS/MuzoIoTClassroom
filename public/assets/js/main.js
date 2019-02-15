
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

let temp_data = {'type': 'line',
                 'axisYType': "primary",
                 'name': "Temperature",
                 'showInLegend': false,
                 'markerSize': 5,
				 'dataPoints': []}

let pressure_data = {'type': 'line',
                    'axisYType': "secondary",
                    'name': "Pressure",
                    'showInLegend': true,
                    'markerSize': 0,
					'dataPoints': []}


function toogleDataSeries(e){
	if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	} else{
		e.dataSeries.visible = true;
	}
	chart.render();
}

var temp_chart = new CanvasJS.Chart("temp-graph", { 
	title: {text: "Temperature"},
	animationEnabled: true,
	zoomEnabled: true,
	axisX: {valueFormatString: "DD MMM HH:MM"},
	axisY: {title: "Degrees (C)"},
	axisY2: {title: "Pressure (PSI)"},
	toolTip: {shared: true},
	legend: {cursor: "pointer", verticalAlign:"top", horizontalAlign: "center", dockInsidePlotArea: true, itemclick: toogleDataSeries},
	data: [temp_data, pressure_data]
});

// Create reference
var data_ref = firebase.database().ref().child('hisarcs').child('data');

data_ref1.on("child_added", (snap, prev)=>{
	var new_data = snap.val();
	date = new Date(new_data.ts)
	pressure_data.dataPoints.push({'y': parseInt(new_data.pres), 'x': date})
	temp_data.dataPoints.push({y: parseInt(new_data.temp), x: date})
	temp_chart.render();
});