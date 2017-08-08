$(document).ready(function(){

	document.getElementsByTagName('body')[0].onkeyup = function(e) { //checks for zooming, since ctrl is usually used to zoom. If user uses the inbrowser zoom functions manually using mouse clicks, then this function will not activate
      var ev = e || event;
      if(ev.keyCode == 17) {//&& ev.ctrlKey) {
         console.log('ctrl')
		 binarySearch();	//changes the width of the left navigation panel accordingly inside the function itself
      }
	}
	
	//change the menu animation for UI purposes
	document.getElementById('menu').classList.toggle('change'); 
	document.getElementById('MXsecret').style.display = 'none';				//hide secret
	document.getElementById('Alpssecret').style.display = 'none';			//hide secret
	document.getElementById('clearInput').style.display = 'none';			//hide X button to clear the search button
	
	AnonymousLogin();														
	
	$('#nav').onePageNav(); //go to page 1/top of the page

	$('a[href^="http"]').attr('target','_blank'); //onclick nav, go to specific reference

	getListOfHeaders();
	
	BuildAlpsTable();	
	
	BuildMXTable()
	
	sessionStorage.clickcount = 0;						//make a sessionStorage of click count to check if something has been pressed how many times
	
	binarySearch();
	
});



document.getElementById('myInput').onkeyup = function(){					//when keystroke is up, the search function will be initiated
	binarySearch();
}

//Clear the search input
document.getElementById('clearInput').onclick = function(){					//when button is clicked, clear search input field
	document.getElementById('myInput').value = "";
	binarySearch();
}

//closing and opening of the sidebar menu with the animation line
document.getElementById('menu').onclick= function(){
	document.getElementById('menu').classList.toggle('change');  //animate the menu button
	var div = document.getElementById('overview');
    if (div.style.display !== 'none') {
        div.style.display = 'none';  							 //close the sidebar
		document.getElementById('content').style.marginLeft = '0'		//move content left
		document.getElementById('wrapper').style.maxWidth = '1000px';		//width restrict content for best viewing experience
		    }
    else {
        div.style.display = 'block';							 //open the sidebar
		document.getElementById('content').style.marginLeft = '320px' //content back to original size, moved to the right
		document.getElementById('wrapper').style.maxWidth = '1500px';
    }	
}

document.getElementById('Secret').onclick= function(){ 			//checks if the secret button has been clicked already or not
	if (sessionStorage.clickcount < 2){
		console.log('You have activated the secret menu');
		document.getElementById('MXsecret').style.display = 'block';			//show secret
		document.getElementById('Alpssecret').style.display = 'block';			//show secret
	} else {
		sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;      //add 1 to clickcount in localstorage 
	}
}

function AnonymousLogin(){ 									//anonymous login and authentication to Firebase Database 
	firebase.auth().signInAnonymously().then(function() {
		console.log('Logged in as Anonymous!')
		}).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log(errorCode);
		console.log(errorMessage);
	});
}

function BuildMXTable(){
	// Build MX switch table
	firebase.database().ref().child('Switches').orderByChild('SwitchM').on('child_added', snap =>{ 		//loop by firebase code to get each child data and put them into a table
		const SwitchTable = document.getElementById('SwitchTable');				//Define Switch table, add rows and columns to table
		
		var MXName = snap.child('Name').val();									//Get Name from database
		var MXImage = snap.child('Picture').val()								//Get Picture from database
		var MXType = snap.child('Type').val()									//Get Type from database
		var MXForce = snap.child('Force').val()									//Get Actuation Force from database
		var MXForceType = snap.child('ForceType').val()							//Get Forcetype of the switch from database
		var MXSwitchM = snap.child('SwitchM').val()								//Get switch manufacturer from database
		
		var row = SwitchTable.insertRow(-1);									//add row to end of table table, hence the -1
  		var cell1 = row.insertCell(0);											//add cell in first index of the row
    	var cell2 = row.insertCell(1);											//add more cell
		var cell3 = row.insertCell(2);
		var cell4 = row.insertCell(3);
		var cell5 = row.insertCell(4);
		cell1.innerHTML = MXSwitchM;											//add text to cell in first column
		cell2.innerHTML = MXName;												//add text to cell in 2nd column
		cell3.innerHTML = MXType;												//add text to cell in 3rd column
		cell4.innerHTML = MXForce + ' ' +MXForceType + ' Force';				//add text to cell in 4th column
		cell5.innerHTML = '<img style = "margin: 0px auto" src="'+MXImage+'"/>';							//add image to cell in 5th column
	});	
}

function BuildAlpsTable() {
	//build alps table
	firebase.database().ref().child('Alps').orderByChild('SwitchM').on('child_added', snap =>{ 		//loop by firebase code to get each child data and put them into a table
		const SwitchTable = document.getElementById('AlpsSwitchTable');				//Define Switch table, add rows and columns to table
		
		var AlpsName = snap.child('Name').val();									//Get Name from database
		var AlpsImage = snap.child('Picture').val()									//Get Picture from database, is a link e.g. https://...
		var AlpsType = snap.child('Type').val()										//Get Type from database
		var AlpsForce = snap.child('Force').val()									//Get Actuation Force from database
		var AlpsForceType = snap.child('ForceType').val()							//Get Forcetype of the switch from database
		var AlpsSwitchM = snap.child('SwitchM').val()								//Get switch manufacturer from database
		
		var row = SwitchTable.insertRow(-1);										//add another row on the end of the table
  		var cell1 = row.insertCell(0);												//add cell
    	var cell2 = row.insertCell(1);												//add cell
		var cell3 = row.insertCell(2);												//add cell
		var cell4 = row.insertCell(3);												//add cell
		var cell5 = row.insertCell(4);												//add cell
		cell1.innerHTML = AlpsSwitchM;												//text to cell
		cell2.innerHTML = AlpsName;													//text to cell
		cell3.innerHTML = AlpsType;													//text to cell
		cell4.innerHTML = AlpsForce + ' ' + AlpsForceType + ' Force';				//text to cell
		cell5.innerHTML = '<img style = "margin: 0px auto" src="'+AlpsImage+'"/>';								//image to cell
	});	
}

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
	alert('Written to MX database');
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
	alert('Written to Alps database');
}

//Submit new switch MX data
document.getElementById('Submit').onclick= function(){
	var Empty = []										//Array of names of input boxes that are empty
	if (document.getElementById('Name').value == ''){
		Empty.push('Name')
	}
	if (document.getElementById('Image').value == ''){
		Empty.push('Image Link')
	}
	if (document.getElementById('Type').value == ''){
		Empty.push('Type')
	}
	if (document.getElementById('Force').value == ''){
		Empty.push('Force')
	}
	if (document.getElementById('SwitchM').value == ''){
		Empty.push('Switch Manufacturer')
	}
	if (document.getElementById('ForceType').value == ''){
		Empty.push('Force Type')
	}
	
	if (Empty.length >= 1){								//check if there are any blank input boxes
		if (Empty.length == 1){							//if there is only 1 empty box, using correct grammar alert user
			alert('The input field for ' + Empty[0] + ' is empty')
		} else {
			var Message
			for (i = 0; i<Empty.length; i++){
				if (i == (Empty.length - 1)){
					Message = Message + ' and ' + Empty[i];
				} else if (i == 0){
					Message = Empty[i];
				} else {
					Message = Message + ', ' + Empty[i];
				}
			}
			alert('The input fields ' + Message + ' are empty. Please fill these in to add to the table.')
		}
	} else {
		if (confirm("Please check everything is correct. You will not be able to change it once you press OK")){
			var MXName = document.getElementById('Name').value;
			var MXImage = document.getElementById('Image').value;
			var MXType = document.getElementById('Type').value;
			var MXForce = document.getElementById('Force').value;
			var MXSwitchM = document.getElementById('SwitchM').value;
			var MXForceType = document.getElementById('ForceType').value;
			
			writeSwitchData(MXSwitchM, MXName, MXType, MXForce, MXForceType, MXImage);	
			
			document.getElementById('Name').value = ''									//clear input
			document.getElementById('Image').value = '';								//clear input
			document.getElementById('Force').value = '';								//clear input
			document.getElementById('SwitchM').value = '';								//clear input
		}else{
			return false
		}
	}
}


//Submit new switch ALPS data
document.getElementById('AlpsSubmit').onclick= function(){
	var Empty = []
	if (document.getElementById('AlpsName').value == ''){		//checks to see if there are any blank input sections
		Empty.push('Name')
	}
	if (document.getElementById('AlpsImage').value == ''){		//checks to see if there are any blank input sections
		Empty.push('Image Link')
	}
	if (document.getElementById('AlpsType').value == ''){		//checks to see if there are any blank input sections
		Empty.push('Type')
	}
	if (document.getElementById('AlpsForce').value == ''){		//checks to see if there are any blank input sections
		Empty.push('Force')
	}
	if (document.getElementById('AlpsSwitchM').value == ''){	//checks to see if there are any blank input sections
		Empty.push('Switch Manufacturer')
	}
	if (document.getElementById('AlpsForceType').value == ''){	//checks to see if there are any blank input sections
		Empty.push('Force Type')
	}
	if (Empty.length >= 1){										//If there are any left out blank spaces, alert the user		
		if (Empty.length == 1){									//if only one blank space left out, tell the user of that ONE
			alert('The input field for ' + Empty[0] + ' is empty')
		} else {												//if there is more than 1 blank space, using correct grammar tell the user the list of inputs left blank
			var Message
			for (i = 0; i<Empty.length; i++){
				if (i == (Empty.length - 1)){					//if last one it must have AND 
					Message = Message + ' and ' + Empty[i];
				} else if (i == 0){								//if first one, it must be just the link
					Message = Empty[i];
				} else {										//if a middle one, it must have a comma
					Message = Message + ', ' + Empty[i];
				}
			}
			alert('The input fields ' + Message + ' are empty. Please fill these in to add to the table.')
		}
	} else {
		if (confirm("Please check everything is correct. You will not be able to change it once you press OK")){ //get values from inputs
			var MXName = document.getElementById('AlpsName').value;
			var MXImage = document.getElementById('AlpsImage').value;
			var MXType = document.getElementById('AlpsType').value;
			var MXForce = document.getElementById('AlpsForce').value;
			var MXSwitchM = document.getElementById('AlpsSwitchM').value;
			var MXForceType = document.getElementById('AlpsForceType').value;
			
			writeAlpsSwitchData(AlpsSwitchM, AlpsName, AlpsType, AlpsForce, AlpsForceType, AlpsImage);			//write to the database, another function
			
			document.getElementById('AlpsName').value = ''									//clear input
			document.getElementById('AlpsImage').value = '';								//clear input
			document.getElementById('AlpsForce').value = '';								//clear input
			document.getElementById('AlpsSwitchM').value = '';								//clear input
		}else{
			return false
		}
	}
}
	
//sorting table, bubble sort, called from the HTML page through onclick function
function sortTable(n,TableID){
	var table, rowsSort, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
	console.log(n, TableID)
  	table = document.getElementById(TableID.id);
  	switching = true;
  	dir = "asc";  							//Set the sorting direction to ascending:
  	/*Make a loop that will continue until no switching has been done:*/
  	while (switching) {
    	switching = false;
    	rowsSort = table.getElementsByTagName("TR");
    	/*Loop through all table rows (except the first, which contains table headers):*/
    	for (i = 1; i < (rowsSort.length - 1); i++) {
			//start by saying there should be no switching:
			shouldSwitch = false;
			x = rowsSort[i].getElementsByTagName("TD")[n].innerHTML.toLowerCase();						//first row to compare
			y = rowsSort[i + 1].getElementsByTagName("TD")[n].innerHTML.toLowerCase();					//second row to compare
			if (dir == "asc") {
				if (TableID.id == 'SwitchTable'){									//change menu option showing ascending or descending direction
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
				} else if (TableID.id == 'AlpsSwitchTable'){
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
			rowsSort[i].parentNode.insertBefore(rowsSort[i + 1], rowsSort[i]); //if should switch, then move the row that is less than the row above, to above that row
			switching = true;
			//Each time a switch is done, increase this count by 1:
			switchcount ++;      
		} else {
			console.log(switchcount)
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
					} else if (n == 3){
						document.getElementById("MXForceArrow").innerHTML = '▲'
					}
				} else if (TableID.id == 'AlpsSwitchTable'){
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

//Binary Search
function binarySearch(){
	var inputDIV = document.getElementById('overview');
	var inputCSS = document.getElementById('myInput');
	var array = sessionStorage.getItem("arrayListHeaders").split(",")		//defines array of list headers ID
    var startIndex  = 0;													//start index of binary search, MINIMUM value
    var stopIndex = array.length - 1;										//last index of binary serach array, max value
    var middle = Math.floor((stopIndex + startIndex)/2);					//*middle of array*/
	var input = document.getElementById('myInput').value.replace(/\s/g, '').toLowerCase() //changes the user input to replace spaces and all lower case
	var moreThanOne = 0														//if there is more than one of the same letter, then increase (look in code below)
	var moreThanOneArray = []												//add the ID's of those that have the same starting x no. of letters
	var counter = input.length												//how long the user input's string is
	
	
	function navAllShow(){													//make all the items in the side nav on screen be shown
		for (i = 0; i < array.length; i++){
			document.getElementById('+' + array[i]).style.display = "block" //ID of each element that will be shown/hidden has a + in front of it
		}
	}
	
	function navAllHide(){													//make all the items in the side nav on screen disappear
		for (i = 0; i < array.length; i++){
			document.getElementById('+' + array[i]).style.display = "none"
		}
	}
	
	for (var m = 0; m < array.length; m++){ 								//loops to check if there is more than one value that the user has input. e.g. 2 items starting with the same letter
		if (array[m].toLowerCase().replace(/\s/g, '').substring(0,counter) == input){
			moreThanOneArray.push(array[m])									//add to the moreThanOneArray if user input and the item in array has the same characters
		}
	}

	if (input == ""){														//checks if the input box is blank
		navAllShow()
		document.getElementById('clearInput').style.display = 'none';
		console.log(inputDIV.scrollHeight, inputDIV.clientHeight, inputDIV.scrollWidth ,inputDIV.clientWidth)
		if(inputDIV.scrollHeight <= inputDIV.clientHeight){
			inputCSS.style.width = '258.4px';
			console.log('258.4')
		} else { 
			inputCSS.style.width = '241.7px';
			console.log('241.7')
		}
	} else if (moreThanOneArray.length > 1){							//if there are more than one items in the original array with the same characters
		document.getElementById('clearInput').style.display = '';
		if (inputDIV.scrollHeight <= inputDIV.clientHeight){
			inputCSS.style.width = '234.4px';  //when there is no scroll bar
		} else {
			inputCSS.style.width = '216.4px' //when there is a scroll bar
		}
		navAllHide();
		console.log('allhidden')
		for (var h = 0; h < moreThanOneArray.length; h++){					//make all items in the moreThenOneArray be shown.
			console.log('morethanone')								
			document.getElementById('+' + moreThanOneArray[h]).style.display = "block" 
		}
	} else {
		document.getElementById('clearInput').style.display = '';
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
			document.getElementById('myInput').style.width = '234.4px'; // changes the input width
			console.log('position: ' + middle)
			document.getElementById('+' + array[middle]).style.display = "block";		//show this found value
			var foundValue = array[middle]												//make a variable equal to the found value
			array.splice(middle, 1);													//delete this found value from the array
			navAllHide();
			array.push(foundValue);														//re-add the found variable back to the array and sort
			array.sort();										
		} else {
			console.log('not found')
			navAllShow()
			document.getElementById('myInput').style.width = '220.4px';
		}
		return (array[middle] != input) ? -1 : middle;				 					//make sure it's the right value
	}
}

function getListOfHeaders(){	//gets all the values of the items in the 'list' which is the headers of the HTML files and add  them all to an array
	var arrayListHeaders = []
	var listh1 = document.getElementsByTagName('h1')
	var listh2 = document.getElementsByTagName('h2')
	var listh3 = document.getElementsByTagName('h3')
	var listh4 = document.getElementsByTagName('h4')
		
	for (var k = 0; k < listh1.length; k++){
		arrayListHeaders.push(listh1[k].innerHTML)
	}
	for (var k = 0; k < listh2.length; k++){
		arrayListHeaders.push(listh2[k].innerHTML)
	}
	for (var k = 0; k < listh3.length; k++){
		arrayListHeaders.push(listh3[k].innerHTML)
	}
	for (var k = 0; k < listh4.length; k++){
		arrayListHeaders.push(listh4[k].innerHTML)
	}
	arrayListHeaders.sort()
	sessionStorage.setItem("arrayListHeaders",arrayListHeaders)
}


