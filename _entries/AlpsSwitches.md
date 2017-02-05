---
sectionid: Alps
sectionclass: h3
title: Alps
number: 3120
parent-id: Switches
is-parent: no
---
- 

<table id = 'AlpsSwitchTable'>
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
	<td width = '18%'><input type="text" id="AlpsSwitchM" placeholder = 'Manufacturer'></td>
</tr>
<tr>	
    <td width = '16%'>Name</td>
	<td width = '16%'><input type="text" id="AlpsName" placeholder = 'Name'></td>
</tr>
<tr>
	<td width = '10%'>Type</td>
	<td width = '10%'><select id = 'AlpsType'>
 		<option value="Linear">Linear</option>
  		<option value="Tactile">Tactile</option>
  		<option value="Clicky">Clicky</option>
		</select>
	</td>	
</tr>
<tr>
    <td width = '18%'>Force</td>
	<td width = '18%'><input type="text" id="AlpsForce" placeholder = 'Force'></td>
</tr>
<tr>
	<td width = '18%'>Force Type</td>
	<td width = '10%'><select id = 'AlpsForceType'>
		<option value="Actuation">Actuation</option>
 		<option value="Bottom Out">Bottom Out</option>
		</select>
	</td>
</tr>
<tr>
	<td width = '18%'>Image</td>
	<td width = '18%'><input type="text" id="AlpsImage" placeholder = 'direct link to image'></td>
</tr>
 <tr>
 	<td></td>
	<td width = '5%'><button id = 'AlpsSubmit'>Submit</button></td>
 </tr>
</table>