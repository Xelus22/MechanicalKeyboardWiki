---
sectionid: Firmware
sectionclass: h2
title: Firmware
number: 4600
parent-id: Parts
is-parent: no
---
Most OEM keyboards such as Logitech, Corsair and Razer all come with software to re-program and change the way how each button functions.
However in custom keyboards, there are two main paths of custom firmware. Either using PS2AVR based micro-controllers to use the Bootmapperclient or using Atmega32u4 based micro-controllers to use TMK/QMK. 

Bootmapperclient is a much easier and user-friendly experience when first starting as it has a graphical user interface to change the function of key on the board. It can be found here: <a href = 'http://winkeyless.kr/forums/topic/boot-mapper-client/'>http://winkeyless.kr/forums/topic/boot-mapper-client/</a>.

TMK is a firmware originally created by Hasu for Atmega32u4 based micro-controllers. While QMK is a fork of this project which has more added functions. You can find out more features of QMK on their github at <a href = 'https://docs.qmk.fm'>https://docs.qmk.fm</a>. 

Luckily for us, /u/iandr0idos has made a TMK based and QMK based online GUI. However you must use avrdude or xLoader to flash the .hex file yourself to the micro controller. The TMK one is <a href = 'http://kb.sized.io'>kb.sized.io</a> while the QMK one is <a href = 'http://www.kbfirmware.com'>www.kbfirmware.com</a>.