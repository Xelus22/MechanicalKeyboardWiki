---
sectionid: MXSwitches
sectionclass: h3
title: MX Switches
number: 3110
parent-id: Switches
is-parent: no
---
- There are many different mechanical switch manufacturers such as Gateron, Kailh, Greetech, Cherry (now known as ZF) and many others. Each company has their own way of colour-coding the switches into their different properties and aspects. Below is a table of all the MX style mechanical switches known to the community. Each entry shows the type of switch, the actuation or bottom out force and includes a picture for easy identification. You may add new switches yourself as new switches appear from the community or OEMs.

<b>This table is for MX type switches only. For Alps switches go <a href = "#Alps">here</a>.</b>

<br>
<table id = 'SwitchTable'>
<tr>
    <th width = '18%' height = '18%' onclick = 'sortTable(0, SwitchTable)' class = 'menu'>Manufacturer<span id = 'MXManufacturerArrow'>‌‌▼</span><span class = 'menutooltip'>Click here to sort table by Manufacturer</span></th>
    <th width = '16%' height = '16%' onclick = 'sortTable(1, SwitchTable)' class = 'menu'>Name<span id = 'MXNameArrow'>‌‌ </span><span class = 'menutooltip'>Click here to sort table by Name</span></th>
	<th width = '10%' height = '10%' onclick = 'sortTable(2, SwitchTable)' class = 'menu'>Type<span id = 'MXTypeArrow'>‌‌ </span><span class = 'menutooltip'>Click here to sort table by Type</span></th>
    <th width = '18%' height = '18%' onclick = 'sortTable(3, SwitchTable)' class = 'menu'>Force<span id = 'MXForceArrow'>‌‌ </span><span class = 'menutooltip'>Click here to sort table by Force</span></th>
	<th width = '18%' height = '18%'>Image</th>
  </tr>
</table>

<br>

Add new or forgotten switches to the database here.
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