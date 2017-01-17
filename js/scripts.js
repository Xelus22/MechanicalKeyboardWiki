$(document).ready(function(){
	
	$('#nav').onePageNav();

	$('a[href^="http"]').attr('target','_blank');
	
	$('.toggle').click(function(){
		$('.overview').toggleClass('open');
	});
	
	
	// Get a reference to the database service
 	var database = firebase.database();
	
	//Get elements
	const preObject = document.getElementById('object');
	
	//Create references
	const dbRefObject = firebase.database().ref().child('object');
	
	/*//Sync object changes
	dbRefObject.on('value', snap => {
		preObject.innerText = JSON.stringify(snap.val(), null, 3);	
	});
	*/
	//change data
	function writeUserData(userId, name, types, imageUrl) {
 	   firebase.database().ref('Switches/' + userId).set({
        Name: name,
   	 	Type: types,
    	Picture : imageUrl
  });
}
//changing existing data
  //writeUserData('MXBlues', 'MXBlues', 'Clicky', 'image');
firebase.database().ref().on("value", function(snapshot) {
   console.log(snapshot.val());
}, function (error) {
   console.log("Error: " + error.code);
});
console.log('test');


});

document.getElementById('test').onclick= function(){
	var div = document.getElementById('overview');
    if (div.style.display !== 'none') {
        div.style.display = 'none';
    }
    else {
        div.style.display = 'block';
    }
}