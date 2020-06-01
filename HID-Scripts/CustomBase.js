// Custom Base
// Author: 
// Edited by: Coderdude112 on GitHub 
// 

layout('us');				  // Set keyboard layout to US
typingSpeed(0,0);			// Sets the typing speed to FAST
var Ready = "False"		// Sets Ready to false beacuse we are not ready to begin the attack

function Attack() { 	// Initalizes the function Attack that acually exfiltrates the files
  delay(2200);				// Delay to make sure that File Explorer doesent take focus
  // Opens powershell
  press("GUI r");			// Opens a run command
  delay(500);
  type("powershell\n");	 // Opens powershell
  delay(500);
  
  type("powershell -windowstyle hidden {"); // Makes the window hidden for the duration of the attack
  
  type("exit;}\n");  					            	// Adds the close curly bracket making the attack hidden and starts the attack 
}

function Initalized() { 	// Initalizes the function that checks if the device has been initalized by the host before running the attack
  while (Ready = "False") {
    press("SCROLL");
    result = waitLED(SCROLL,10);
    
    if (result.SCROLL) { 	// If this is true then the device is initalized. The loop will break and the attack will start
      Ready = "True";
      break;   
    } else {				       // The device is not initalized so we will press scroll lock and retry
        press("SCROLL");
      }
    
  }
}

Initalized(); 				// Check if the host has initalized us
Attack();					    // Run the attack
