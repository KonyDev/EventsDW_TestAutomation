define({
    /*
      This is an auto generated file and any modifications to it may result in corruption of the action sequence.
    */
    /** onClick defined for flxProfile **/
    AS_FlexContainer_e3528929001243eab8a07b6082e56662: function AS_FlexContainer_e3528929001243eab8a07b6082e56662(eventobject) {
        var self = this;
        this.showProfileOptions()
    },
    /** onClick defined for btnUser **/
    AS_Button_a55900dc4596483f88dfdfae647e2e4c: function AS_Button_a55900dc4596483f88dfdfae647e2e4c(eventobject) {
        var self = this;
        var ntf = new kony.mvc.Navigation("frmLogin");
        ntf.navigate();
    },
    /** onClick defined for flexEventLogo **/
    AS_FlexContainer_ed0ab3dd91e04110b55bd4c0dbf62e48: function AS_FlexContainer_ed0ab3dd91e04110b55bd4c0dbf62e48(eventobject) {
        var self = this;
        this.view.menuItem.createEvent(this.option1SelectionCallback());
    },
    /** onClick defined for flxCreateNewEvent **/
    AS_FlexContainer_c984428e8ee443c9b8c1ca75a1a1d086: function AS_FlexContainer_c984428e8ee443c9b8c1ca75a1a1d086(eventobject) {
        var self = this;
        this.view.menuItem.getEvents(this.option1SelectionCallback());
    },
    /** onClick defined for flexAllNewEvent **/
    AS_FlexContainer_a67aefd6aba347adbec0cb25a3a1b695: function AS_FlexContainer_a67aefd6aba347adbec0cb25a3a1b695(eventobject) {
        var self = this;
        this.view.menuItem.getEvents(this.option2SelectionCallback());
    },
    /** onClick defined for flxManageUser **/
    AS_FlexContainer_fda83b9dad124ee9be1f655ef0217d73: function AS_FlexContainer_fda83b9dad124ee9be1f655ef0217d73(eventobject) {
        var self = this;
        this.view.menuItem.manageUser(this.option3SelectionCallback());
    },
    /** onClick defined for FlexEventPreviewBack **/
    AS_FlexContainer_i201eedcb3da4b04abb6f6aaed6d1829: function AS_FlexContainer_i201eedcb3da4b04abb6f6aaed6d1829(eventobject) {
        var self = this;
        this.animateDetailsPage(100);
    },
    /** onclick defined for btnRegister **/
    AS_Button_a77c9e4b46584c6a8031b138ae67ca28: function AS_Button_a77c9e4b46584c6a8031b138ae67ca28(eventobject) {
        var self = this;
        this.doTabActions("btnSessions");
        //this.onClickProceed();
    },
    /** onclick defined for mapGoogleMap **/
    AS_Map_dc29fc7eec7d4303adf9fbc8adfe586d: function AS_Map_dc29fc7eec7d4303adf9fbc8adfe586d(eventobject, location) {
        var self = this;
        //this.setLocationOnMap();
    },
    /** onClick defined for flxMenuClose **/
    AS_FlexContainer_a4d31c6292514e3e8ca53491392a8737: function AS_FlexContainer_a4d31c6292514e3e8ca53491392a8737(eventobject) {
        var self = this;
        this.setHamVisibility();
    },
    /** onClick defined for flxLogout **/
    AS_FlexContainer_aa163ba9939340b0930dc8b5096e510e: function AS_FlexContainer_aa163ba9939340b0930dc8b5096e510e(eventobject) {
        var self = this;
        if (EVENT_CONSTANS.MODE.USERROLE == EVENT_CONSTANS.USERROLE.CONSUMER) {
            this.logout();
        } else {
            Events.consumerLogin.logout(this.logout)
        }
    },
    /** init defined for frmAllEvents **/
    AS_Form_f76d5d0ba82e4796a6aac9e8f327e43d: function AS_Form_f76d5d0ba82e4796a6aac9e8f327e43d(eventobject) {
        var self = this;
        this.view.onBreakpointChange = function(eventobject, breakpoint) {
            self.checkBreakpointAndCreateCards(eventobject, breakpoint);
        };
    },
    /** postShow defined for frmAllEvents **/
    AS_Form_hbe07b3ca4164101b2660362c4fc8c23: function AS_Form_hbe07b3ca4164101b2660362c4fc8c23(eventobject) {
        var self = this;
        postshow();
        try {
            kony.application.destroyForm("frmCreateEvent");
        } catch (err) {
            kony.print(err);
        }
        this.getEventsData();
    },
    /** onDeviceBack defined for frmAllEvents **/
    AS_Form_f4846a2d4d6342d5b65a424619ff391d: function AS_Form_f4846a2d4d6342d5b65a424619ff391d(eventobject) {
        var self = this;
        kony.print("device back clicked");
    },
    /** onBreakpointChange defined for frmAllEvents **/
    AS_Form_fd3de6c9354149ab96133808aa3dc33d: function AS_Form_fd3de6c9354149ab96133808aa3dc33d(eventobject, breakpoint) {
        var self = this;
        this.checkBreakpointAndCreateCards(eventobject, breakpoint);
    }
});