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
	document.getElementById('MXsecret').style.display = 'none';
	document.getElementById('Alpssecret').style.display = 'none';
	
	//Firebase anonymous authentication
	firebase.auth().signInAnonymously().then(function() {
		console.log('Logged in as Anonymous!')
		}).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode);
		console.log(errorMessage);
	});
	
	retrieveDatabase();  //counts how many items in the MX table
	
	$('#nav').onePageNav(); //go to page 1

	$('a[href^="http"]').attr('target','_blank'); //onclick nav, go to specific reference
	
	// Build MX switch table
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
	
	//build alps table
	
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
	var check = confirm("Please check everything is correct. You will not be able to change it once you press OK")
	if (check == true){
		Name = document.getElementById('Name').value;
		Image = document.getElementById('Image').value;
		Type = document.getElementById('Type').value;
		Force = document.getElementById('Force').value;
		SwitchM = document.getElementById('SwitchM').value;
		ForceType = document.getElementById('ForceType').value;
		
		writeSwitchData(SwitchM, Name, Type, Force, ForceType, Image);	
		
		document.getElementById('Name').value = ''
		document.getElementById('Image').value = '';
		document.getElementById('Force').value = '';
		document.getElementById('SwitchM').value = '';
	}else{
		return false
	}
}


//Submit new switch ALPS data
document.getElementById('AlpsSubmit').onclick= function(){
	if (confirm("Please check everything is correct. You will not be able to change it once you press OK")){
		AlpsName = document.getElementById('AlpsName').value;
		AlpsImage = document.getElementById('AlpsImage').value;
		AlpsType = document.getElementById('AlpsType').value;
		AlpsForce = document.getElementById('AlpsForce').value;
		AlpsSwitchM = document.getElementById('AlpsSwitchM').value;
		AlpsForceType = document.getElementById('AlpsForceType').value;
		
		writeAlpsSwitchData(AlpsSwitchM, AlpsName, AlpsType, AlpsForce, AlpsForceType, AlpsImage);	
		
		document.getElementById('AlpsName').value = '';
		document.getElementById('AlpsImage').value = '';
		document.getElementById('AlpsForce').value = '';
		document.getElementById('AlpsSwitchM').value = '';
	}else{
		return false
	}
}

//sorting table
function sortTable(n,TableID){
	var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	console.log(n, TableID)
  	table = document.getElementById(TableID.id);
  	switching = true;
  	dir = "asc";  							//Set the sorting direction to ascending:
  	/*Make a loop that will continue until no switching has been done:*/
  	while (switching) {
    	switching = false;
    	rows = table.getElementsByTagName("TR");
    	/*Loop through all table rows (except the first, which contains table headers):*/
    	for (i = 1; i < (rows.length - 1); i++) {
		  //start by saying there should be no switching:
		  shouldSwitch = false;
		  x = rows[i].getElementsByTagName("TD")[n].innerHTML.toLowerCase();
		  y = rows[i + 1].getElementsByTagName("TD")[n].innerHTML.toLowerCase();
		  if (dir == "asc") {
			  if (TableID.id == 'SwitchTable'){
				if (n == 0){
			  	document.getElementById("MXManufacturerArrow").innerHTML = '▼'
				document.getElementById("MXNameArrow").innerHTML = ''
				document.getElementById("MXTypeArrow").innerHTML = ''
				document.getElementById("MXForceArrow").innerHTML = ''
				} else if (n == 1){
				document.getElementById("MXManufacturerArrow").innerHTML = ''
				document.getElementById("MXNameArrow").innerHTML = '▼'
				document.getElementById("MXTypeArrow").innerHTML = ''
				document.getElementById("MXForceArrow").innerHTML = ''
				} else if (n == 2){
				document.getElementById("MXManufacturerArrow").innerHTML = ''
				document.getElementById("MXNameArrow").innerHTML = ''
				document.getElementById("MXTypeArrow").innerHTML = '▼'
				document.getElementById("MXForceArrow").innerHTML = ''
				}else if (n == 3){
				document.getElementById("MXManufacturerArrow").innerHTML = ''
				document.getElementById("MXNameArrow").innerHTML = ''
				document.getElementById("MXTypeArrow").innerHTML = ''
				document.getElementById("MXForceArrow").innerHTML = '▼'
				}
			  }
			  else if (TableID.id == 'AlpsSwitchTable'){
				if (n == 0){
			  	document.getElementById("AlpsManufacturerArrow").innerHTML = '▼'
				document.getElementById("AlpsNameArrow").innerHTML = ''
				document.getElementById("AlpsTypeArrow").innerHTML = ''
				document.getElementById("AlpsForceArrow").innerHTML = ''
				} else if (n == 1){
				document.getElementById("AlpsManufacturerArrow").innerHTML = ''
				document.getElementById("AlpsNameArrow").innerHTML = '▼'
				document.getElementById("AlpsTypeArrow").innerHTML = ''
				document.getElementById("AlpsForceArrow").innerHTML = ''
				} else if (n == 2){
				document.getElementById("AlpsManufacturerArrow").innerHTML = ''
				document.getElementById("AlpsNameArrow").innerHTML = ''
				document.getElementById("AlpsTypeArrow").innerHTML = '▼'
				document.getElementById("AlpsForceArrow").innerHTML = ''
				}else if (n == 3){
				document.getElementById("AlpsManufacturerArrow").innerHTML = ''
				document.getElementById("AlpsNameArrow").innerHTML = ''
				document.getElementById("AlpsTypeArrow").innerHTML = ''
				document.getElementById("AlpsForceArrow").innerHTML = '▼'
				}
			  }
			if (x > y) {
			  //if so, mark as a switch and break the loop:
			  shouldSwitch= true;
			  break;
			}
		  } else if (dir == "desc") {
			if (x < y) {
			  //if so, mark as a switch and break the loop:
			  shouldSwitch= true;
			  break;
			  }
			}
      	}
	  if (shouldSwitch) {
		/*If a switch has been marked, make the switch and mark that a switch has been done:*/
		rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		switching = true;
		//Each time a switch is done, increase this count by 1:
		switchcount ++;      
	  } else {
		/*If no switching has been done AND the direction is "asc",set the direction to "desc" and run the while loop again.*/
		if (switchcount == 0 && dir == "asc") {
		  dir = "desc";
		  switching = true;
		  if (TableID.id == 'SwitchTable'){
				if (n == 0){
			  	document.getElementById("MXManufacturerArrow").innerHTML = '▲'
				} else if (n == 1){
				document.getElementById("MXNameArrow").innerHTML = '▲'
				} else if (n == 2){
				document.getElementById("MXTypeArrow").innerHTML = '▲'
				}else if (n == 3){
				document.getElementById("MXForceArrow").innerHTML = '▲'
				}
			  }
			  else if (TableID.id == 'AlpsSwitchTable'){
				if (n == 0){
			  	document.getElementById("AlpsManufacturerArrow").innerHTML = '▲'
				} else if (n == 1){
				document.getElementById("AlpsNameArrow").innerHTML = '▲'
				} else if (n == 2){
				document.getElementById("AlpsTypeArrow").innerHTML = '▲'
				}else if (n == 3){
				document.getElementById("AlpsForceArrow").innerHTML = '▲'
				}
			  }
		}
      }
   }	
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

var activated = 0;
document.getElementById('Secret').onclick= function(){
	if (activated == 0){
		activated++
		console.log('You have activated the secret menu');
		document.getElementById('MXsecret').style.display = 'block';
		document.getElementById('Alpssecret').style.display = 'block';
	}
}
