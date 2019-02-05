define(function() {

  return {
    
    constructor : function(){
          this._selectedFlex=  this.view.flexAllNewEvent;
        },
   
    setSelectedFlex : function(selectedId){
      try{
      switch(selectedId){
        case 1:
          this._selectedFlex.skin = "slFbox";
          this.view.flexAllNewEvent.skin = "sknFlxMenuClick";
          this._selectedFlex = this.view.flexAllNewEvent;
          break;
        case 2:
          this._selectedFlex.skin = "slFbox";
          this.view.flxCreateNewEvent.skin = "sknFlxMenuClick";
          this._selectedFlex = this.view.flxCreateNewEvent;
          break;
        case 3:
          this._selectedFlex.skin = "slFbox";
          this.view.flxManageUser.skin = "sknFlxMenuClick";
          this._selectedFlex = this.view.flxManageUser;
          break;
        default :
          kony.print("Not Valid");
      }
      }catch(error){
             kony.print("Menu Item Controller"+JSON.stringify(error));
      }
    },
    onMenuClick:function(){
      try{
      var selectedRowIndex=this.view.SegOptions.selectedRowIndex;
      alert(selectedRowIndex);
      }catch(error){
             kony.print("Menu Item Controller"+JSON.stringify(error));
      }
    },
    getEvents:function(callback){
      this._selectedFlex.skin="slFbox";
      this.view.flexAllNewEvent.skin="sknFlxMenuClick";
      this._selectedFlex=this.view.flexAllNewEvent;
      try{
        if(callback!==null&&callback!==undefined){
         callback();
        }
      }catch(excp){
        kony.print("excp: "+excp.message);
      }
    },
    createEvent:function(callback){
      this._selectedFlex.skin="slFbox";
      this.view.flxCreateNewEvent.skin="sknFlxMenuClick";
      this._selectedFlex=this.view.flxCreateNewEvent;
      try{
        if(callback!==null&&callback!==undefined){
         callback();
        }
      }catch(excp){
        kony.print("excp: "+excp.message);
      }
    },
    manageUser:function(callback){
      this._selectedFlex.skin="slFbox";
      this.view.flxManageUser.skin="sknFlxMenuClick";
      this._selectedFlex=this.view.flxManageUser;
      try{
        if(callback!==null&&callback!==undefined){
         callback();
        }
      }catch(excp){
        kony.print("excp: "+excp.message);
      }
    },
    getNotification:function(){
      this._selectedFlex.skin="slFbox";
      this.view.flxNotification.skin="sknFlxMenuClick";
      this._selectedFlex=this.view.flxNotification;
      try{
        if(this.onGetNotificationClick!==null&&this.onGetNotificationClick!==undefined){
          this.onGetNotificationClick();
        }
      }catch(excp){
        kony.print("excp: "+excp.message);
      }
    },
    getMyCalendar:function(){
      this._selectedFlex.skin="slFbox";
      this.view.flxMyCalendar.skin="sknFlxMenuClick";
      this._selectedFlex=this.view.flxMyCalendar;
      try{
        if(this.onGetMyCalendar!==null&&this.onGetMyCalendar!==undefined){
          this.onGetMyCalendar();
        }
      }catch(excp){
        kony.print("excp: "+excp.message);
      }
    },
    getSettings:function(){
      this._selectedFlex.skin="slFbox";
      this.view.flxSetting.skin="sknFlxMenuClick";
      this._selectedFlex=this.view.flxSetting;
      try{
        if(this.onGetSetting!==null&&this.onGetSetting!==undefined){
          this.onGetSetting();
        }
      }catch(excp){
        kony.print("excp: "+excp.message);
      }
    }
  };
});