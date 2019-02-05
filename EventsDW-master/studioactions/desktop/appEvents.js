define({
    AS_AppEvents_e4e693e27dcc4ab2b5e5c8dc7dc593eb: function AS_AppEvents_e4e693e27dcc4ab2b5e5c8dc7dc593eb(eventobject) {
        var self = this;
        kony.application.setApplicationBehaviors({
            FormControllerSyncLoad: true
        })
    },
    AS_AppEvents_e38834025b794d44b1debb08918c3e47: function AS_AppEvents_e38834025b794d44b1debb08918c3e47(eventobject) {
        var self = this;
        if (eventobject.launchparams.formID == "frmAllEvents") {
            return "frmAllEvents";
        } else if (eventobject.launchparams.formID == "frmCreateEvent") {
            return "frmCreateEvent";
        } else if (eventobject.launchparams.formID == "frmManageUser") {
            return "frmManageUser";
        }
    }
});