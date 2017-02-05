//Global Variables
var Name;
var Image;
var Type;
var Force;
var ForceType;
var SwitchM; 					//Switch Manufacturer

var AlpsName;					//global variabels for Alps switches
var AlpsImage;
var AlpsType;
var AlpsForce;
var AlpsForceType;
var AlpsSwitchM;

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
	
	// MX swithc table
	firebase.database().ref().child('Switches').orderByChild('SwitchM').on('child_added', snap =>{ 		//loop by firebase code to get each child data and put them into a table
		const SwitchTable = document.getElementById('SwitchTable');				//Define Switch table, add rows and columns to table
		
		var Name = snap.child('Name').val();									//Get Name from database
		var Image = snap.child('Picture').val()									//Get Picture from database
		var Type = snap.child('Type').val()										//Get Type from database
		var Force = snap.child('Force').val()					//Get Actuation Force from database
		var ForceType = snap.child('ForceType').val()
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
		cell4.innerHTML = Force + ' ' +ForceType + ' Force';
		cell5.innerHTML = '<img src="'+Image+'"/>';
	});	
	
	//alps table
	
	firebase.database().ref().child('Alps').orderByChild('SwitchM').on('child_added', snap =>{ 		//loop by firebase code to get each child data and put them into a table
		const SwitchTable = document.getElementById('AlpsSwitchTable');				//Define Switch table, add rows and columns to table
		
		var AlpsName = snap.child('Name').val();									//Get Name from database
		var AlpsImage = snap.child('Picture').val()									//Get Picture from database
		var AlpsType = snap.child('Type').val()										//Get Type from database
		var AlpsForce = snap.child('Force').val()					//Get Actuation Force from database
		var AlpsForceType = snap.child('ForceType').val()
		var AlpsSwitchM = snap.child('SwitchM').val()								//Get switch manufacturer from database
		
		var row = SwitchTable.insertRow(-1);									//add data to table
  		var cell1 = row.insertCell(0);
    	var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		cell1.innerHTML = AlpsSwitchM;
		cell2.innerHTML = AlpsName;
		cell3.innerHTML = AlpsType;
		cell4.innerHTML = AlpsForce + ' ' + AlpsForceType + ' Force';
		cell5.innerHTML = '<img src="'+AlpsImage+'"/>';
	});	
});
// Get a reference to the database service
 	const database = firebase.database();

//Function to write MX data to the database	
function writeSwitchData(switchManufacturer, name, types, force, forceType, imageUrl) {
 	   firebase.database().ref('Switches/' + switchManufacturer + name).set({
        Name: name,
   	 	Type: types,
    	Picture : imageUrl,
		SwitchM : switchManufacturer,
		Force: force,
		ForceType: forceType
  	});
}

//Function to write ALPS data to the database	
function writeAlpsSwitchData(switchManufacturer, name, types, force, forceType, imageUrl) {
 	   firebase.database().ref('Alps/' + switchManufacturer + name).set({
        Name: name,
   	 	Type: types,
    	Picture : imageUrl,
		SwitchM : switchManufacturer,
		Force: force,
		ForceType: forceType
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

//Submit new switch MX data
document.getElementById('Submit').onclick= function(){
	var confirm = confirm("Please check everything is correct. You will not be able to change it once you press OK")
	if (confirm == true){
		Name = document.getElementById('Name').value;
		Image = document.getElementById('Image').value;
		Type = document.getElementById('Type').value;
		Force = document.getElementById('Force').value;
		SwitchM = document.getElementById('SwitchM').value;
		ForceType = document.getElementById('ForceType').value;
	}

	writeSwitchData(SwitchM, Name, Type, Force, ForceType, Image);	
}

//Submit new switch ALPS data
document.getElementById('AlpsSubmit').onclick= function(){
	var confirm = confirm("Please check everything is correct. You will not be able to change it once you press OK")
	if (confirm == true){
		AlpsName = document.getElementById('AlpsName').value;
		AlpsImage = document.getElementById('AlpsImage').value;
		AlpsType = document.getElementById('AlpsType').value;
		AlpsForce = document.getElementById('AlpsForce').value;
		AlpsSwitchM = document.getElementById('AlpsSwitchM').value;
		AlpsForceType = document.getElementById('AlpsForceType').value;
	}

	writeAlpsSwitchData(AlpsSwitchM, AlpsName, AlpsType, AlpsForce, AlpsForceType, AlpsImage);	
}

//closing and opening of the sidebar menu with the animation line
document.getElementById('menu').onclick= function(){
	document.getElementById('menu').classList.toggle('change');  //animate the menu button
	var div = document.getElementById('overview');
    if (div.style.display !== 'none') {
        div.style.display = 'none';  							 //close the sidebar
		document.getElementById('content').style.marginLeft = '0'
		document.getElementById('wrapper').style.maxWidth = '1000px';
		    }
    else {
        div.style.display = 'block';							 //open the sidebar
		document.getElementById('content').style.marginLeft = '320px' //content back to original size
		document.getElementById('wrapper').style.maxWidth = '1500px';
    }	
}
