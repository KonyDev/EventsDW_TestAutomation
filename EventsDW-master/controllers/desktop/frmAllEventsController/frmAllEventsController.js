define({
	eventList: null,
	/**
	 * @function onNavigate
	 * @description This function is used to populate data on the form while navigating to it.
	 * @private
	 */
	onNavigate: function (param) {
		try {
			if (param !== undefined) {
				this.currentMode = param;
			}
			this.setMenubar();
			this.view.menuItem.setSelectedFlex(1);
			this.view.flxScEventList.removeAll();
			this.setProfile();
		} catch (error) {
			kony.print("FrmAllEvents Controller" + JSON.stringify(error));
		}
	},
	/**
	 * @function setProfile
	 * @description This function is used to set the profile data
	 */
	setProfile: function () {
		if (glbIsLoggedIn) {
            this.view.profileheader.flexProfilePhotoANdTitle.isVisible = true;
			this.view.profileheader.btnUser.isVisible = false;
			if (glbProfile !== undefined && glbProfile !== null && glbProfile !== {}) {
				if (glbProfile.first_name !== undefined) {
					this.view.profileheader.lblUserName.isVisible = true;
					this.view.profileheader.lblUserName.text = glbProfile.first_name;
				}
				if (glbProfile.profile !== undefined) {
					this.view.profileheader.imgProfile.src = glbProfile.profile;
				} else {
					this.view.profileheader.imgProfile.src = "profile.png";
				}
				this.view.profileheader.flxProfile.isVisible = true;
			}
		} else {
			this.view.profileheader.btnUser.isVisible = true;
			this.view.profileheader.flexProfilePhotoANdTitle.isVisible = false;
		}

	},
	/**
	 * @function ProcessEventData
	 * @description This function is used to pre process the data before setting it to the form widget.
	 * @private
	 */
	ProcessEventData: function (records) {
		this.view.flxScEventList.removeAll();
		if (records === null || records === undefined)
			return;
		var eventList = [];
		var event;
		var location;
		records = this.checkUserRoleandGetData(records);
		try {
			for (var i = 0; i < records.length; i++) {
				event = records[i];
				location = "";
				if (records[i]["event_banners"] !== null && records[i]["event_banners"] !== undefined) {
					if (records[i]["event_banners"].length > 0) {
						if (records[i]["event_banners"][0]["banner_url"] === undefined || records[i]["event_banners"][0]["banner_url"] === null) {
							records[i]["event_banners"][0]["banner_url"] = "event01.jpg";
						}
					} else {
						records[i]["event_banners"] = [{
								"banner_url": "event01.jpg"
							}
						];
					}
				} else {
					records[i]["event_banners"] = [{
							"banner_url": "event01.jpg"
						}
					];
				}

				if (records[i]["name"] === null || records[i]["name"] === undefined) {
					records[i]["name"] = "Name not available";
				}
				if (records[i]["event_category"] === null || records[i]["event_category"] === undefined) {
					records[i]["event_category"] = "NA";
				} else {
					records[i]["event_category"] = getEventCategory(records[i]["event_category"]);
				}
				records[i].start_year = dateFormatting.getYear(records[i]["start_date"]);
				records[i].st_date = dateFormatting.getDate(records[i]["start_date"]);
				records[i].start_month = dateFormatting.getMonth(records[i]["start_date"]);
				records[i].end_year = dateFormatting.getYear(records[i]["end_date"]);
				records[i].ed_date = dateFormatting.getDate(records[i]["end_date"]);
				records[i].end_month = dateFormatting.getMonth(records[i]["end_date"]);
				records[i]["event_date"] = getDateRange(records[i]["start_date"], records[i]["end_date"]); //records[i]["start_date_mon"] + " - " + records[i]["end_date_mon"] + "," + records[i]["end_year"];
			}
			eventList = records;

			this.eventList = eventList.sort(sort_by_date); ;
			this.createEventList(this.noOfCards);
		} catch (excp) {
			kony.print("exception occured while parsing the response: " + excp.message);
		}
	},

	/**
	 * @function getEventsData
	 * @description This function is used to fetch all events.
	 * @private
	 */
	getEventsData: function () {
		showLoading(this);
		try {
			var client = kony.sdk.getCurrentInstance();
          var objSvc = kony.sdk.getCurrentInstance().getObjectService("EventsSOS", {
					"access": "online"
				});
          
			var dataObject = new kony.sdk.dto.DataObject("event");
			var options = {
				"dataObject": dataObject,
              	"queryParams": {
               		"$expand":"location,event_banners,presenter,event_sessions,event_images"
                }
			};
			if(glbIsLoggedIn){
              options.queryParams ={
               		"$expand":"location,event_banners,presenter,event_sessions,event_images,event_registration"
                };
            }
			objSvc.fetch(options,
				this.eventFetchSuccessCallback.bind(this),
				this.eventFetchFailureCallback.bind(this));
          
		} catch (excp) {
			this.stopLoadingScreen();
			alert(excp.message);
		}
	},
	/**
	 * @function eventFetchSuccessCallback
	 * @description This function is the success callback for the getEventsData method.
	 * @private
	 * @param {JSONArray} result
	 */
	eventFetchSuccessCallback: function (result) {
		try {
          	var eventDetail = result.records;
			this.stopLoadingScreen();
			this.ProcessEventData(eventDetail);
		} catch (error) {
			kony.print("FrmAllEvents Controller" + JSON.stringify(error));
		}
	},
	/**
	 * @function eventFetchFailureCallback
	 * @description This function is the failure callback for the getEventsData method.
	 * @private
	 * @param {JSON} error
	 */
	eventFetchFailureCallback: function (error) {
		this.stopLoadingScreen();
		alert("something went wrong.Please try later");
	},
	/**
	 * @function stopLoadingScreen
	 * @description This function is used to dismiss the loading screen.
	 * @private
	 */
	stopLoadingScreen: function () {
		kony.application.dismissLoadingScreen();
	},
	/**
	 * @function navigateToFormCreateNewEvent
	 * @description This functioncheckUserRoleandGetData is used to navigate to form CreateNewEvent.
	 * @private
	 */
	navigateToFormCreateNewEvent: function () {
		try {
            glbBreakPoint =this.breakpoint;
			var navobj = new kony.mvc.Navigation("frmCreateEvent");
			navobj.navigate();
		} catch (excp) {
			kony.print("excp: " + excp.message);
		}
	},
	/**
	 * @function displayEvents
	 * @description This function is used to displayEvents
	 * @private
	 * @param {JSONArray} eventList
	 */
	displayEvents: function (eventList,noOfCards) {
		try {
			var eventListLength = eventList.length;
			var flexContainer;
			var eventComp;
			var left = 2;
			var top = -340;
			var i;
			for (i = 0; i < eventListLength; i++) {
				if (i % 3 === 0) {
					left = 2;
					top = top + 370;
				}
				eventComp = getEventDescComp(i, left, top, eventList[i], this);
				this.view.flxScEventList.add(eventComp);
				left = left + 354;
			}
			if (EVENT_CONSTANS.MODE.USERROLE === EVENT_CONSTANS.USERROLE.ADMIN) {
				if (i % 3 === 0) {
					left = 0;
					top = top + 370;
					//getCreateNewEventComp
					this.view.flxScEventList.add(getCreateNewEventComp(left, top, this));
				} else {
					this.view.flxScEventList.add(getCreateNewEventComp(left, top, this));
				}
			}

			if (top < 500) {
				top = 430;
			}
			var footer = getFooter(0, top + 350);
			this.view.flxScEventList.add(footer);
			this.view.forceLayout();
		} catch (error) {
			kony.print("FrmAllEvents Controller" + JSON.stringify(error));
		}
	},
	/**
	 * @function onViewEvent
	 * @description This function is used to view the eventdetails
	 * @param {JSON} event
	 */
	onViewEvent: function (event) {
		glbEventIdToRegister = event.event_id;
		if (EVENT_CONSTANS.MODE.USERROLE === EVENT_CONSTANS.USERROLE.ADMIN || event.isRegister || event.isPast) {
			this.view.eventpreview.btnRegister.isVisible = false;
			this.view.eventpreview.btnRegisterBottom.isVisible = false;
		} else {
			this.view.eventpreview.btnRegister.isVisible = true;
			this.view.eventpreview.btnRegisterBottom.isVisible = true;
		}
		this.view.eventpreview.setEventDetails(event,this.breakpoint);
		this.animateDetailsPage(this.eventPreviewLeft);
	},
	/**
	 * @function onEventEdit
	 * @description This function is used to navigate to the frmCreteEvent and edit the existing event by passing event data to it.
	 * @private
	 * @param {JSON} event
	 */
	onEventEdit: function (event) {
		try {
            glbBreakPoint =this.breakpoint;
			var navObj = new kony.mvc.Navigation("frmCreateEvent");
			var param = {};
			param.editMode = true;
			param.eventData = event;
			navObj.navigate(param);
		} catch (error) {
			kony.print("FrmAllEvents Controller" + JSON.stringify(error));
		}
	},
	/**
	 * @function onEventRemove
	 * @description This function is used to navigate to the frmCreteEvent and edit the existing event by passing event data to it.
	 * @private
	 * @param {JSON} event
	 */
	onEventRemove: function (event) {
		try {
			this.eventsToDel = [];
			this.eventsToDel.push({
				"event_id": event.event_id
			});
			var pspConfig = {
				"iconPosition": constants.ALERT_CONTENT_ALIGN_CENTER,
				"contentAlignment": constants.ALERT_ICON_POSITION_LEFT
			};
			var alert = kony.ui.Alert({
					"message": "Are you sure you want to delete this event?",
					"alertType": constants.ALERT_TYPE_CONFIRMATION,
					"alertTitle": "Delete",
					"yesLabel": "Yes",
					"noLabel": "No",
					"alertIcon": "",
					"alertHandler": handleAlert.bind(this)
				},
					pspConfig);
			function handleAlert(response) {
				if (response)
					this.delete ("event", this.getEventsData, this.eventsToDel);
			}
		} catch (error) {
			kony.print("FrmAllEvents Controller" + JSON.stringify(error));
		}
	},
	onMenuItemClick: function () {},

	delete : function (object, callback, data) {
		try {
			showLoading(this);
			this.delCount = 0;
			this.delObjectName = object;
			this.delCallBack = callback;
			this.dataToDelete = data;
			this.deleteRecursiveCommon();
		} catch (error) {
			kony.print("FrmAllEvents Controller" + JSON.stringify(error));
		}
	},

	//Delete Recursive call
	deleteRecursiveCommon: function () {
		try {
			if (this.dataToDelete.length) {
				var objSvc = kony.sdk.getCurrentInstance().getObjectService("EventsSOS", {
						"access": "online"
					});
				var dataObject = new kony.sdk.dto.DataObject(this.delObjectName);
				dataObject.setRecord(this.dataToDelete[this.delCount]);
				var options = {
					"dataObject": dataObject
				};
				objSvc.deleteRecord(options,
					this.deleteRecursiveCommonSuccessCallback.bind(this),
					this.deleteRecursiveCommonFailureCallback.bind(this));
			} else {
				this.delCallBack();
			}
		} catch (err) {
			kony.application.dismissLoadingScreen();
			alert("Something went wrong while deleting " + this.delObjectName + " Error:" + JSON.stringify(error));
		}

	},

	deleteRecursiveCommonSuccessCallback: function (success) {
		try {
			this.delCount++;
			if (this.delCount < this.dataToDelete.length) {
				this.deleteRecursiveCommon();
			} else {
				this.delCallBack();
			}
		} catch (error) {
			kony.print("FrmAllEvents Controller" + JSON.stringify(error));
		}
	},

	deleteRecursiveCommonFailureCallback: function (error) {
		kony.application.dismissLoadingScreen();
		alert("Something went wrong while deleting " + this.delObjectName + " Error:" + JSON.stringify(error));
	},
	navigateToManageUser: function () {
		try {
			var nav = new kony.mvc.Navigation("frmManageUser");
			nav.navigate();
		} catch (excp) {
			kony.print("Exception while navigating to manage user form!" + JSON.stringify(excp));
		}

	},

	/**
	 * @function animateDetailsPage
	 * @description Function to animate the event previe page to the given left
	 * @private
	 */
	animateDetailsPage: function (left) {
		try {
			this.view.eventpreview.animate(
				kony.ui.createAnimation({
					100: {
						left: left + "%",
						"stepConfig": {}
					}
				}), {
				delay: 0,
				fillMode: kony.anim.FILL_MODE_FORWARDS,
				duration: 0.1
			}, {
				animationEnd: function () {}
			});
		} catch (error) {
			kony.print("frm Event Login Controller" + JSON.stringify(error));
		}
	},

	//Consumer App operations start
    
    /**
	 * @function checkUserRoleandGetData
	 * @description This function is used to check the user role 
     * Based on the user role it will load the events 
     * If user role is admin all  Events will be loaded with edit and remove provisioning
     * If user role is consumer Events will be loaded with out edit and remove, with register 
	 */
	checkUserRoleandGetData: function (eventList) {
		this.animateDetailsPage(100);
		if (EVENT_CONSTANS.MODE.USERROLE === EVENT_CONSTANS.USERROLE.ADMIN) {
			this.setDashBoardTitle(EVENT_CONSTANS.TITLE.ALLEVENTS);
			return eventList;
		} else if (EVENT_CONSTANS.MODE.USERROLE === EVENT_CONSTANS.USERROLE.CONSUMER) {
			switch (this.currentMode) {
			case EVENT_CONSTANS.MODE.MYEVENTS:
				this.setDashBoardTitle(EVENT_CONSTANS.TITLE.MYEVENTS);
				this.view.menuItem.setSelectedFlex(2);
				eventList = this.getEventsBetweenTwoDates(eventList, this.getDate(0), this.getDate(6), true);
				break;
			case EVENT_CONSTANS.MODE.ALLEVENTS:
				this.setDashBoardTitle(EVENT_CONSTANS.TITLE.ALLEVENTS);
				this.view.menuItem.setSelectedFlex(1);
				eventList = this.getEventsBetweenTwoDates(eventList, this.getDate(0), this.getDate(6), true);
				break;
			case EVENT_CONSTANS.MODE.UPCOMMINGEVENTS:
				this.setDashBoardTitle(EVENT_CONSTANS.TITLE.UPCOMMINGEVENTS);
				this.view.menuItem.setSelectedFlex(3);
				eventList = this.getEventsBetweenTwoDates(eventList, this.getDate(0), this.getDate(6), false);
				break;
			default:
				this.setDashBoardTitle(EVENT_CONSTANS.TITLE.ALLEVENTS);
				this.view.menuItem.setSelectedFlex(1);
				eventList = this.getEventsBetweenTwoDates(eventList, this.getDate(0), this.getDate(6), true);
			}
			if (glbIsLoggedIn === true) {
				eventList = this.mergeUserEvents(eventList);
			}
			return eventList;
		}

	},
    /**
	 * @function setDashBoardTitle
     * @description - this function set the title to the header
	 */
	setDashBoardTitle: function (title) {
		this.view.LblTitle.text = title;
	},
     /**
	 * @function mergeUserEvents
     * @description - this function will filter the registered event and non registered events 
     * based on the user id
	 */
	mergeUserEvents: function (eventList) {
		try {
			var tempEventList = [];
			if (eventList.length > 0) {
				for (var i = 0; i < eventList.length; i++) {
					if (this.currentMode == EVENT_CONSTANS.MODE.MYEVENTS) {
						if (this.isUserPresent(eventList[i].event_registration)) {
							eventList[i].isRegister = true;
							tempEventList.push(eventList[i]);
						}
					} else {
						eventList[i].isRegister = this.isUserPresent(eventList[i].event_registration);
						tempEventList.push(eventList[i]);
					}
				}
				return tempEventList;
			}
		} catch (error) {
			kony.print("frm Event Landing Controller" + JSON.stringify(error));
		}
	},
	
    /**
	 * @function isUserPresent
     * @description - this function will check if the 
	 */
	isUserPresent: function (registeredUserList) {
		var isRegistered = false;
		if (registeredUserList !== undefined && registeredUserList.length > 0) {
			for (var i = 0; i < registeredUserList.length; i++) {
				if (registeredUserList[i].user_id === glbLoggedUserId) {
					isRegistered = true;
					break;
				}
			}
			return isRegistered;
		} else {
			return false;
		}
	},

	/**
	 * @member of  frmEventsLandingController.js
	 * @function filterEventsBetweenTwoDates
	 * @description - This wil return the event list between two given dates
	 * @param {array of JSON} - eventList
	 **/
	getEventsBetweenTwoDates: function (eventlist, startDate, endData, isIncludePastEvents) {
		try {
			var eventsBetweenTwoDates = [];
			for (var i = 0; i < eventlist.length; i++) {
				if (eventlist[i].start_date >= startDate && eventlist[i].start_date <= endData) {
					eventsBetweenTwoDates.push(eventlist[i]);
				} else if (isIncludePastEvents) {
					eventlist[i].isPast = true;
					eventsBetweenTwoDates.push(eventlist[i]);
				}
			}
			return eventsBetweenTwoDates;
		} catch (error) {
			kony.print("frm Event Landing Controller" + JSON.stringify(error));
		}
	},

	/* * @member of  frmEventsLandingController.js
	 * @function getEventsLessThanToday
	 * @description - This wil return the event list less than today
	 * @param {array of JSON} - eventList
	 **/
	getEventsLessThanToday: function (eventlist, today) {
		try {
			var eventsBetweenTwoDates = [];
			for (var i = 0; i < eventlist.length; i++) {
				if (eventlist[i].start_date < today) {
					eventsBetweenTwoDates.push(eventlist[i]);
				}
			}
			return eventsBetweenTwoDates;
		} catch (error) {
			kony.print("frm Event Landing Controller" + JSON.stringify(error));
		}
	},

	getDate: function (noOfMonths) {
		try {
			var month = {
				"jan": "01",
				"feb": "02",
				"mar": "03",
				"apr": "04",
				"may": "05",
				"jun": "06",
				"jul": "07",
				"aug": "08",
				"sep": "09",
				"oct": "10",
				"nov": "11",
				"dec": "12",
			};
			var d = new Date();
			d.setMonth(d.getMonth() + noOfMonths);
			var dateString = d.toDateString().split(" ");
			var formattedDateString = dateString[3] + "-";
			formattedDateString = formattedDateString + month[dateString[1].toLowerCase()] + "-";
			formattedDateString = formattedDateString + dateString[2] + "T";
			formattedDateString = formattedDateString + this.getTimeInAMPMFormat(d);
			return formattedDateString;
		} catch (error) {
			kony.print("frm Event Landing Controller" + JSON.stringify(error));
		}
	},

	/**
	 * @member of  frmEventsLandingController.js
	 * @function getTimeInAMPMFormat
	 * @description - util function to convert the time to AM PM Format
	 * @param {date Object} - a date object
	 * @return {String} - return a T<time>AM|PM String
	 **/
	getTimeInAMPMFormat: function (date) {
		try {
			var hours = date.getHours();
			var minutes = date.getMinutes();
			var strTime = hours + ':' + minutes + ":00";
			return strTime;
		} catch (error) {
			kony.print("frm Event Landing Controller" + JSON.stringify(error));
		}
	},
    
     /**
    * @function setMenubar
    * @description - this function is used to set menu bar based on the user role
    **/
	setMenubar: function () {
		if (EVENT_CONSTANS.MODE.USERROLE === EVENT_CONSTANS.USERROLE.ADMIN) {
			this.view.menuItem.imgCreateNewEvent.isVisible = true;
			this.view.menuItem.imgAllNewEvent.isVisible = true;
			this.view.menuItem.imgManageUser.isVisible = true;
			this.view.menuItem.lblCreateNewEvent.text = "Create New Event";
			this.view.menuItem.lblAllEvent.text = "All Events";
			this.view.menuItem.lblManageUser.text = "Manage Users";
		} else {
			this.view.menuItem.imgCreateNewEvent.isVisible = false;
			this.view.menuItem.imgAllNewEvent.isVisible = false;
			this.view.menuItem.imgManageUser.isVisible = false;
			this.view.menuItem.lblCreateNewEvent.text = "My Events";
			this.view.menuItem.lblAllEvent.text = "All Events";
			this.view.menuItem.lblManageUser.text = "Upcoming Events";
		}
	},
    
  
   /**
    * @function registerToEvent
    * @description - this function calls tne linked in login to register the user
    * on click of regoster button
    **/
	registerToEvent: function () {
		if (glbIsLoggedIn) {
			Events.consumerLogin.doLinkedInLogin(EVENT_CONSTANS.MODE.REGISTER);
		} else {
			var pspConfig = {
				"iconPosition": constants.ALERT_CONTENT_ALIGN_CENTER,
				"contentAlignment": constants.ALERT_ICON_POSITION_LEFT
			};
			var alert = kony.ui.Alert({
					"message": "Please login in order to register for the event.",
					"alertType": constants.ALERT_TYPE_CONFIRMATION,
					"alertTitle": "Consumer Login",
					"yesLabel": "Login",
					"noLabel": "Cancel",
					"alertIcon": "",
					"alertHandler": handleAlert.bind(this)
				},
					pspConfig);
			function handleAlert(response) {
				if (response){
                  Events.consumerLogin.doLinkedInLogin(EVENT_CONSTANS.MODE.REGISTER);
                }
			}

		}
	},
  
   /**
    * @function checkBreakpointAndSetUI
    * @description - this function will check breakpoint and set sidemenu and change layout for sessions
    **/
    checkBreakpointAndCreateCards : function(eventobject, breakpoint){
      this.setProfile();
      this.breakpoint = breakpoint;
      if(isTablet(breakpoint)){
          this.setMenuItem(false);
          this.noOfCards = 2;
          this.eventPreviewLeft = 0;
          this.isCloseAvailableForMenu = true;
          this.setProfileName(true);
      }else if(isDesktop(breakpoint)){
          this.setMenuItem(true);
          this.noOfCards = 3;
          this.eventPreviewLeft = 19.2;
          this.isCloseAvailableForMenu = false;
          this.setProfileName(true);
      }else if(isDesktopLarge(breakpoint)){
          this.setMenuItem(true);
          this.noOfCards = 4;
          this.eventPreviewLeft = 19.2;
          this.isCloseAvailableForMenu = false;
          this.setProfileName(true);
      }else if(isMobile(breakpoint)){
          this.setMenuItem(false);
          this.eventPreviewLeft = 0;
          this.noOfCards = 1;
          this.isCloseAvailableForMenu = true;
          this.setProfileName(false);
      }
      if(this.eventList!==null){
        this.createEventList(this.noOfCards);
      }else{
        
      }
    },
    
  
    /**
    * @function createEventList
    * @description - this function will create the event cards dynamically based on the noOfCards
    * on click of regoster button
    * @param {Number : noOfCardsPerRow} - Number of cards to be added dynamically per row based on the braek point.
    **/
    createEventList : function(noOfCardsPerRow){
  		this.view.flxScEventList.removeAll();
        var left = 2;
        var cardWidth = (100/noOfCardsPerRow) -left - (left/noOfCardsPerRow);
        var height = 340;   
        var top = 20;
        for(var i=0;i<this.eventList.length;i++){
          if(i % noOfCardsPerRow ===0 && i!==0){
             top = top+height+20;
             left = 2;
          }else if(i!==0){
            left = left+cardWidth+2;
          }
          var eventComp = getEventDescComp(i, left, top, cardWidth, height, this.eventList[i], this);
		  this.view.flxScEventList.add(eventComp);  
        }
     this.createDummyFlex(top+height+20);       
    },
   
   /**
    * @function createDummyFlex
    * @description - this function will create the dummy flex at the bottom of all cards 
    * so that there will be some space after all cards
    **/
   createDummyFlex : function(top){
     	var flxFDummy = new kony.ui.FlexContainer({
 				"autogrowMode": kony.flex.AUTOGROW_NONE,
 				"top": top +"dp",
 				"clipBounds": true,
 				"height": "10%",
 				"id": "flxDummy",
 				"isVisible": true,
 				"layoutType": kony.flex.FREE_FORM,
 				"left": "0",
 				"skin": "slFbox",
 				"width": "100%",
 				"zIndex": 20
 			}, {}, {});
       this.view.flxScEventList.add(flxFDummy);
   },
  
   /**
  * @function setMenuItem
  * @description - this function will set menu Item visibility and handles menu click on different break point
  **/
   setMenuItem : function(visibility){
     if(!visibility){
       this.view.profileheader.flxMenuIcon.onClick = function(){
         this.setHamVisibility();
       }.bind(this);
       this.setMenuVisbility(false);
     }else{
       this.view.profileheader.flxMenuIcon.onClick = null;
       this.setMenuVisbility(true);
     }
   },
   
   /**
  * @function setMenuVisbility
  * @description - this function will sets the visibility of menuItem
  **/
   setMenuVisbility : function(visibility){
     this.view.menuItem.setVisibility(visibility);
     this.view.forceLayout();
   },
  
   /**
  * @function setHamVisibility
  * @description - this function will check the visibility ot the menu bar, 
  * if the menu bar is visible then it makes the menubar visibility false else true
  **/
   setHamVisibility : function(){
     var menubarVisibity = this.view.menuItem.isVisible;
     if(menubarVisibity){
       if(this.isCloseAvailableForMenu){
          this.view.flxMenuClose.isVisible = false;
          this.setMenuVisbility(false);
       }
     }else{
       if(this.isCloseAvailableForMenu){
         this.view.flxMenuClose.isVisible = true;
       }
       this.setMenuVisbility(true);
     }
   },
  
 /**
  * @function option1SelectionCallback
  * @description -this function check the user role, if consumer navigate to Myevents
  * else this function is the callback of onclick of create new event on the menubar
  * this function sets the menubar visibilty false and set the selected flex to create event
  **/  
  option1SelectionCallback : function(){
       this.setHamVisibility();
     if (EVENT_CONSTANS.MODE.USERROLE == EVENT_CONSTANS.USERROLE.ADMIN) {
            this.navigateToFormCreateNewEvent();
        } else {
            if (glbIsLoggedIn) {
                this.currentMode = EVENT_CONSTANS.MODE.MYEVENTS;
                this.getEventsData();
            } else {
                Events.consumerLogin.doLinkedInLogin(EVENT_CONSTANS.MODE.MYEVENTS);
            }
        }
   },
  
 /**
  * @function option2SelectionCallback
  * @description -this function check the user role, if consumer navigate to AllEvents
  * else this function is the callback of onclick of All events
  * this function sets the menubar visibilty false and set the selected flex to create event
  **/  
  option2SelectionCallback : function(){
    this.setHamVisibility();
     if (EVENT_CONSTANS.MODE.USERROLE == EVENT_CONSTANS.USERROLE.ADMIN) {
            this.view.menuItem.setSelectedFlex(1);
            this.getEventsData();
        } else {
            this.currentMode = EVENT_CONSTANS.MODE.ALLEVENTS;
            this.getEventsData();
        }
   },
  
  
 /**
  * @function option3SelectionCallback
  * @description -this function check the user role, if consumer navigate to upcomming events
  * else this function is the callback of onclick of manage user and calls navigateToManageUser()
  * this function sets the menubar visibilty false and set the selected flex to create event
  **/      
  option3SelectionCallback : function(){
        this.setHamVisibility();
    if (EVENT_CONSTANS.MODE.USERROLE == EVENT_CONSTANS.USERROLE.ADMIN) {
            this.navigateToManageUser();
        } else {
            this.currentMode = EVENT_CONSTANS.MODE.UPCOMMINGEVENTS;
            this.getEventsData();
        }
   },
   
 /**
  * @function showProfileOptions
  * @description - this function make the visibility changes for flexProfileOptions
  **/   
   showProfileOptions : function(){
     if(this.view.flexProfileOptions.isVisible){
       this.view.flexProfileOptions.isVisible = false;
     }else{
       this.view.flexProfileOptions.isVisible = true;
     }
   },
  
  /**
  * @function logout
  * @description - this function will reset the UI back to logout state
  **/   
   logout : function(){
     glbIsLoggedIn = false;
     EVENT_CONSTANS.MODE.USERROLE = EVENT_CONSTANS.USERROLE.CONSUMER;
     this.option2SelectionCallback();
     this.setProfile();
     this.setMenubar();
     this.showProfileOptions();
     this.view.forceLayout();
   },
  
    setProfileName : function(visibility){
    this.view.profileheader.lblUserName.isVisible = visibility;
    
  },
   

});