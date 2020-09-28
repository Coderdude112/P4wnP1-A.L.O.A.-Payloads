///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// WindowsRickroll.js
// Original author: NightRang3r https://github.com/NightRang3r/P4wnP1-A.L.O.A.-Payloads/blob/master/HIDScripts/RickRoll%20Win.js
// Edited by: Coderdude112 on GitHub 
// When plugged in, this script will play the rickroll video in fullscreen
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// PREREQUISTES: (Things that need to happen before you can use this attack)
// Enable the keyboard mode on the P4wnP1 ALOA

// Set the keyboard layout and all variables
layout('us');       // Set keyboard layout to US
typingSpeed(0,0);   // Sets the typing speed to FAST
var Ready = "False" // Sets Ready to false beacuse we are not ready to begin the attack

function Attack() { // Initalizes the function Attack
  delay(2200);  // Delay to make sure that File Explorer doesent take focus
  press("GUI r"); // Opens a run command
  delay(500);

  type("iexplore -k https://www.youtube.com/watch?v=dQw4w9WgXcQ\n"); // Open rickroll in fullscreen via internet explorer
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
