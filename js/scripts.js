//Global Variables
var Name;
var Image;
var Type;
var ActuationForce;
var SwitchM; 					//Switch Manufacturer

$(document).ready(function(){
	//change the menu animation for UI purposes
	document.getElementById('menu').classList.toggle('change'); 
	
	//Firebase anonymous authentication
	firebase.auth().signInAnonymously().then(function() {
		console.log('Logged in as Anonymous!')
		}).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode);
		console.log(errorMessage);
	});
	
	retrieveDatabase();
	
	$('#nav').onePageNav(); //go to page 1

	$('a[href^="http"]').attr('target','_blank');
	
	$('.toggle').click(function(){
		$('.overview').toggleClass('open');
	});

	//get value of Type from database through a loop of every object inside
	/*for (var key in switchDatabase.Switches) {
		console.log("DB: "+key);
		console.log(switchDatabase.Switches[key].Type);
	}*/
	//
	firebase.database().ref().child('Switches').orderByChild('Name').on('child_added', snap =>{ 		//loop by firebase code to get each child data and put them into a table
		const SwitchTable = document.getElementById('SwitchTable');				//Define Switch table, add rows and columns to table
		
		var Name = snap.child('Name').val();									//Get Name from database
		var Image = snap.child('Picture').val()									//Get Picture from database
		var Type = snap.child('Type').val()										//Get Type from database
		var ActuationForce = snap.child('ActuationForce').val()					//Get Actuation Force from database
		var SwitchM = snap.child('SwitchM').val()								//Get switch manufacturer from database
		
		var row = SwitchTable.insertRow(-1);									//add data to table
  		var cell1 = row.insertCell(0);
    	var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		cell1.innerHTML = SwitchM;
		cell2.innerHTML = Name;
		cell3.innerHTML = Type;
		cell4.innerHTML = ActuationForce;
		cell5.innerHTML = '<img src="'+Image+'"/>';
	});	
	
});
// Get a reference to the database service
 	const database = firebase.database();

//Function to write data to the database	
function writeSwitchData(switchManufacturer, name, types, actuationForce, imageUrl) {
 	   firebase.database().ref('Switches/' + switchManufacturer + name).set({
        Name: name,
   	 	Type: types,
    	Picture : imageUrl,
		SwitchM : switchManufacturer,
		ActuationForce: actuationForce
  	});
}

//retrieve database
function retrieveDatabase(){
firebase.database().ref().on('value', function(snapshot) {
	switchDatabase = snapshot.val();								//snapshot.val() is the object's value returned from the database
	console.log(Object.keys(switchDatabase.Switches).length); 		//logs the no. of items in the database
	}, function (error) {
		console.log('Error: ' + error.code);
	});
}

//Submit new switch data
document.getElementById('Submit').onclick= function(){
	Name = document.getElementById('Name').value;
	Image = document.getElementById('Image').value;
	Type = document.getElementById('Type').value;
	ActuationForce = document.getElementById('ActuationForce').value + 'g';
	SwitchM = document.getElementById('SwitchM').value;

	writeSwitchData(SwitchM, Name, Type, ActuationForce, Image);	
}

//closing and opening of the sidebar menu with the animation line
document.getElementById('menu').onclick= function(){
	document.getElementById('menu').classList.toggle('change');  //animate the menu button
	var div = document.getElementById('overview');
    if (div.style.display !== 'none') {
        div.style.display = 'none';  							 //close the sidebar
		document.getElementById('content').style.width = '100%';  //content to fill page
    }
    else {
        div.style.display = 'block';							 //open the sidebar
		document.getElementById('content').style.width = 'calc(100% - 320px)' //content back to original size
    }
}