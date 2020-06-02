// Fake update
// Author: Judge2020 https://judge2020.com
// Edited by: Coderdude112 on GitHub 
// Pressing enter on the update screen will display a fake BSOD screen

layout('us');				// Set keyboard layout to US
typingSpeed(0,0);			// Sets the typing speed to FAST
var Ready = "False"			// Sets Ready to false beacuse we are not ready to begin the attack

function Attack() { 		// Initalizes the function Attack
  delay(2200);				// Delay to make sure that File Explorer doesent take focus
  press("GUI r");			// Opens a run command
  delay(500);

  // Select your OS option by un-commenting that line

  //type("iexplore -k http://fakeupdate.net/xp/\n"); 		// Windows XP
  //type("iexplore -k http://fakeupdate.net/vista/\n"); 	// Windows Vista
  //type("iexplore -k http://fakeupdate.net/win7/\n"); 	    // Windows 7
  //type("iexplore -k http://fakeupdate.net/win8/\n"); 	    // Windows 8
  //type("iexplore -k http://fakeupdate.net/apple/\n"); 	// OSX update
  //type("iexplore -k http://fakeupdate.net/win10/\n"); 	// Windows 10 Install
  //type("iexplore -k http://fakeupdate.net/win10ue/\n");   // Windows 10 Update
  //type("iexplore -k http://fakeupdate.net/steam/\n"); 	// Steam OS Update
  //type("iexplore -k http://fakeupdate.net/wnc/\n"); 	    // Wanna Cry Fake **NOTE: This is very obvious that it is a fake**

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
