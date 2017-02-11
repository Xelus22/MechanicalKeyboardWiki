---
sectionid: Alps
sectionclass: h3
title: Alps
number: 3120
parent-id: Switches
is-parent: no
---
- SKCL switches are all linear complicated.

SKCM switches are all clicky/tactile complicated.

SKBL switches are all linear simplified.

SKBM switches are all clicky/tactile simplified.

<br>

<table id = 'AlpsSwitchTable'>
<tr>
    <th width = '18%' height = '18%' onclick = 'sortTable(0, AlpsSwitchTable)'>Manufacturer<span id = 'AlpsManufacturerArrow'>‌‌▼</span></th>
    <th width = '16%' height = '16%' onclick = 'sortTable(1, AlpsSwitchTable)'>Name<span id = 'AlpsNameArrow'>‌‌ </span></th>
	<th width = '10%' height = '10%' onclick = 'sortTable(2, AlpsSwitchTable)'>Type<span id = 'AlpsTypeArrow'>‌‌ </span></th>
    <th width = '18%' height = '18%' onclick = 'sortTable(3, AlpsSwitchTable)'>Force<span id = 'AlpsForceArrow'>‌‌ </span></th>
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