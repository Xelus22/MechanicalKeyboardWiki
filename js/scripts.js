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

var arrayListHeaders = []

var listh1 = document.getElementsByTagName('h1')
var listh2 = document.getElementsByTagName('h2')
var listh3 = document.getElementsByTagName('h3')
var listh4 = document.getElementsByTagName('h4')

$(document).ready(function(){
	getListOfHeaders(listh1)
	getListOfHeaders(listh2)
	getListOfHeaders(listh3)
	getListOfHeaders(listh4)
	arrayListHeaders.sort()
	console.log(arrayListHeaders)


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

//sorting table, bubble sort
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
	  if (shouldSwitch == true) {
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
		  if (TableID.id == 'SwitchTable'){										//change the visual representation of the sorting algorithm
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

//Binary Search
function binarySearch(){
	

	var array = arrayListHeaders											//defines array of list headers ID
    var startIndex  = 0;													//start index of binary search, MINIMUM value
    var stopIndex = array.length - 1;										//last index of binary serach array, max value
    var middle = Math.floor((stopIndex + startIndex)/2);					//*middle of array*/
	var input = document.getElementById('myInput').value.replace(/\s/g, '').toLowerCase() //changes the user input to replace spaces and all lower case
	var moreThanOne = 0														//if there is more than one of the same letter, then increase (look in code below)
	var moreThanOneArray = []												//add the ID's of those that have the same starting x no. of letters
	var counter = input.length												//how long the user input's string is
	
	function navAllShow(){
	for (i = 0; i < array.length; i++){
		  document.getElementById('+' + array[i]).style.display = "block"
		}
	}
	
	for (var m = 0; m < array.length; m++){ 								//loops to check if there is more than one value that the user has input. e.g. 2 items starting with the same letter
		if (array[m].toLowerCase().replace(/\s/g, '').substring(0,counter) == input){
			moreThanOneArray.push(array[m])									//add to the moreThanOneArray if user input and the item in array has the same characters
		}
	}

	if (input == ""){														//checks if the input box is blank
		navAllShow()
	} else if (moreThanOneArray.length > 1){							//if there are more than one items in the original array with the same characters
		for (var p = 0; p < array.length; p++){
			document.getElementById('+' + array[p]).style.display = "none" 	//make all the items in the side nav on screen disappear
		}
		console.log('allhidden')
		for (var h = 0; h < moreThanOneArray.length; h++){					//make all items in the moreThenOneArray be shown.
			console.log('morethanone')								
			document.getElementById('+' + moreThanOneArray[h]).style.display = "block" 
		}
	} else {
	  while(array[middle].toLowerCase().replace(/\s/g, '').substring(0,counter) != input && startIndex < stopIndex){	//binary search if the first letters of the array is equal the user input	
		  //adjust search area
			  if (input < array[middle].toLowerCase().replace(/\s/g, '').substring(0,counter)){
				  stopIndex = middle - 1;
			  } else if (input > array[middle].toLowerCase().replace(/\s/g, '').substring(0,counter)){
				  startIndex = middle + 1;
			  }
						  
		  //recalculate middle
		  middle = Math.floor((stopIndex + startIndex)/2);
	  }

	  if (array[middle].toLowerCase().replace(/\s/g, '').substring(0,counter) == input){ //make sure it's the right value
		console.log('position: ' + middle)
		document.getElementById('+' + array[middle]).style.display = "block";		//show this found value
		var foundValue = array[middle]												//make a variable equal to the found value
		array.splice(middle, 1)														//delete this found value from the array
		  for (j = 0; j < array.length; j++){											
			document.getElementById('+' + array[j]).style.display = "none";			//hide all the values except the found value in binary search
		  }	
		array.push(foundValue)														//re-add the found variable back to the array and sort
		array.sort()												
  
	  } else {
		console.log('not found')
		navAllShow()
	  }
	  return (array[middle] != input) ? -1 : middle;				  //make sure it's the right value
	}
}

function getListOfHeaders(list){	//gets all the values of the items in the 'list' which is the headers of the HTML files and add  them all to an array
	for (var k = 0; k < list.length; k++){
		var pushIt = list[k].innerHTML
		arrayListHeaders.push(pushIt)
	}
}


