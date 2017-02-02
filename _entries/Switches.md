---
sectionid: Switches
sectionclass: h2
title: Switches
number: 3100
parent-id: GeneralGuide
is-parent: no
---
- First of all, <strong>there is no best switch.</strong> There is a misconception that Cherry MX Blues are the best for typing and Cherry MX Reds or Browns for gaming. However, this is not true. Each person will have their own personal preference based on the type of switch.

<strong>"Different strokes for different folks" - /u/manofinterests (<a href = 'http://twitch.tv/topclack'>Topclack</a> host)</strong>

There are many different types of switches in keyboards. All of them have their unique feel along with its pros and cons. 
<br>

<table id = 'TypeSwitchTable'>
<tr>
    <th width = '18%' height = '10%'>Type of Switch</th>
    <th width = '16%' height = '60%'>General Feel</th>
	<th width = '10%' height = '10%'>Picture</th>
    <th width = '18%' height = '10%'>Example</th>
</tr>
<tr>
    <td width = '10%'>Rubber Dome</td>
    <td width = '60%'>By far the most common type of standalone keyboard it is cheap and easy to find. Unfortunately has a lower lifetime and many people think they feel like mashed potatoes after using a Mechanical Keyboard. See /r/Keyboard for more info.</td>
	<td width = '15%'>Rubber Dome Switch Picture (ew)</td>
    <td width = '15%'>Logitech G19s</td>
  </tr>
  
</table>
<br>
There are many different mechanical switch manufacturers such as Gateron, Kailh, Greetech, Cherry (now known as ZF) and many others. Each company has their own way of colour-coding the switches into their different properties and aspects. Below is a table of all the mechanical switches known to the community. Each entry shows the type of switch, the actuation and actuation force and includes a picture for easy identification. You may add new switches yourself as new switches appear from the community or OEMs.


<table id = 'SwitchTable'>
<tr>
    <th width = '18%' height = '18%'>Manufacturer</th>
    <th width = '16%' height = '16%'>Name</th>
	<th width = '10%' height = '10%'>Type</th>
    <th width = '18%' height = '18%'>Force</th>
	<th width = '18%' height = '18%'>Image</th>
  </tr>
</table>

<br>

Add new or forgotten switches to the database here. They will be shown once you have refreshed the page.
<br>

Note: For image link, please place in a direct link from imgur.
<br>
<table id = 'AddSwitchTable'>
<tr>
    <td width = '18%'>Manufacturer</td>
	<td width = '18%'><input type="text" id="SwitchM" placeholder = 'Manufacturer'></td>
</tr>
<tr>	
    <td width = '16%'>Name</td>
	<td width = '16%'><input type="text" id="Name" placeholder = 'Name'></td>
</tr>
<tr>
	<td width = '10%'>Type</td>
	<td width = '10%'><select id = 'Type'>
 		<option value="Linear">Linear</option>
  		<option value="Tactile">Tactile</option>
  		<option value="Clicky">Clicky</option>
		</select>
	</td>	
</tr>
<tr>
    <td width = '18%'>Force</td>
	<td width = '18%'><input type="text" id="Force" placeholder = 'Force'></td>
</tr>
<tr>
	<td width = '18%'>Force Type</td>
	<td width = '10%'><select id = 'ForceType'>
		<option value="Actuation">Actuation</option>
 		<option value="Bottom Out">Bottom Out</option>
		</select>
	</td>
</tr>
<tr>
	<td width = '18%'>Image</td>
	<td width = '18%'><input type="text" id="Image" placeholder = 'direct link to image'></td>
</tr>
 <tr>
 	<td></td>
	<td width = '5%'><button id = 'Submit'>Submit</button></td>
 </tr>
</table>