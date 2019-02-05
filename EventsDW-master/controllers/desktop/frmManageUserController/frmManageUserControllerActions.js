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
    /** onClick defined for btnProceed **/
    AS_Button_afc005346af041ea99edbfd77be06a8e: function AS_Button_afc005346af041ea99edbfd77be06a8e(eventobject) {
        var self = this;
        this.populateEvent();
        //this.setEvent();
    },
    /** onClick defined for flxCreateNewEvent **/
    AS_FlexContainer_gc9fc7c3894c4513967504ccf46bf3bb: function AS_FlexContainer_gc9fc7c3894c4513967504ccf46bf3bb(eventobject) {
        var self = this;
        this.view.menuItem.createEvent(this.option1SelectionCallback());
    },
    /** onClick defined for flexAllNewEvent **/
    AS_FlexContainer_h00c5831c06d4309a84e8b4839856432: function AS_FlexContainer_h00c5831c06d4309a84e8b4839856432(eventobject) {
        var self = this;
        this.view.menuItem.getEvents(this.option2SelectionCallback());
    },
    /** onClick defined for flxManageUser **/
    AS_FlexContainer_c95719533337433ca1cbac5343864bfd: function AS_FlexContainer_c95719533337433ca1cbac5343864bfd(eventobject) {
        var self = this;
        this.view.menuItem.manageUser(this.option3SelectionCallback());
    },
    /** onClick defined for flxMenuClose **/
    AS_FlexContainer_aa0e1bdec3354e9981dbb11e5e8aaa5e: function AS_FlexContainer_aa0e1bdec3354e9981dbb11e5e8aaa5e(eventobject) {
        var self = this;
        this.setHamVisibility();
    },
    /** onClick defined for flxLogout **/
    AS_FlexContainer_g35717c1d72b4c30bbf351d2fea25658: function AS_FlexContainer_g35717c1d72b4c30bbf351d2fea25658(eventobject) {
        var self = this;
        if (EVENT_CONSTANS.MODE.USERROLE == EVENT_CONSTANS.USERROLE.CONSUMER) {
            this.logout();
        } else {
            Events.consumerLogin.logout(this.logout)
        }
    },
    /** init defined for frmManageUser **/
    AS_Form_i6355a3694614e85b1e940843f7ef516: function AS_Form_i6355a3694614e85b1e940843f7ef516(eventobject) {
        var self = this;
        this.view.onBreakpointChange = function(eventobject, breakpoint) {
            self.checkBreakpointAndSetUI(breakpoint);
        }
    },
    /** postShow defined for frmManageUser **/
    AS_Form_e5ee2744321a4665a1dfc6cfd31bcbd9: function AS_Form_e5ee2744321a4665a1dfc6cfd31bcbd9(eventobject) {
        var self = this;
        //this.onPostShow();
        this.getAllEvent();
        try {
            kony.application.destroyForm("frmCreateEvent");
        } catch (err) {
            kony.print(err);
        }
    },
    /** onBreakpointChange defined for frmManageUser **/
    AS_Form_j7cf8c4a78074258b2feb8e0f8e76ba3: function AS_Form_j7cf8c4a78074258b2feb8e0f8e76ba3(eventobject, breakpoint) {
        var self = this;
        this.checkBreakpointAndSetUI(breakpoint);
    }
});