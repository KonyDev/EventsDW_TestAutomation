//#ifdef desktopweb
var glbUserAttributes = {};
var glbLoggedUserId =  "";
var glbProfile = "";
var glbIsLoggedIn = false;
var glbEventIdToRegister = "";
var glbBreakPoint = "";
/**
 * @function postshow
 * @description - This function will remove the outline border and change the
 * mouse to pointer in button
 */
function postshow() {
	try {
		var elems = document.querySelectorAll("input[kwidgettype='Button']");
		for (var i = 0, iMax = elems.length; i < iMax; i++) {
			elems[i].style.outline = 'none';
			elems[i].style.cursor = 'pointer';
		}
	} catch (err) {
		kony.print("events utility" + JSON.stringify(err));
	}
}
/**
 * @function showLoading
 * @description - This function call the kony loading API with custom skin to show loading indicator
 */
function showLoading(currentScope){
    kony.application.showLoadingScreen("sknloading",
                                       "",
                                       constants.LOADING_SCREEN_POSITION_FULL_SCREEN,
                                       true,
                                       false, {
      enableMenuKey: false,
      enableBackKey: false,
      progressIndicatorColor: "000000"
    });
  currentScope.view.forceLayout();
}

function isMobile(breakpoint){
  if(breakpoint<=EVENT_CONSTANS.BREAKPOINT.MOBILE){
	 return true;
  }
  return false;
}

function isTablet(breakpoint){
   if(breakpoint<=EVENT_CONSTANS.BREAKPOINT.TABLET && breakpoint>EVENT_CONSTANS.BREAKPOINT.MOBILE){
     return true;
   }
  return false;
}

function isDesktopLarge(breakpoint){
   if(breakpoint<=EVENT_CONSTANS.BREAKPOINT.DESKTOPL && breakpoint>EVENT_CONSTANS.BREAKPOINT.DESKTOP){
    return true;
  }
  return false;
}

function isDesktop(breakpoint){
  if(breakpoint<=EVENT_CONSTANS.BREAKPOINT.DESKTOP && breakpoint>EVENT_CONSTANS.BREAKPOINT.TABLET){
    return true;
  }
  return false;
}
//#endif