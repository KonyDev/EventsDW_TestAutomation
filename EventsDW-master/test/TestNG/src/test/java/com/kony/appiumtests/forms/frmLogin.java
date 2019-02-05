package com.kony.appiumtests.forms;

import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;
import com.kony.appiumtests.EventsWidgetId;

public class frmLogin {


  public frmLogin() throws Exception {
  AppElement lblHeader=new AppElement(EventsWidgetId.getWidgetId("frmLogin_headerButtonLeft"));
  }
public void btnLinkedIn() throws Exception{ 
  AppElement btnLinkedIn=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnLinkedIn"));
  btnLinkedIn.click();
  }
public void btnOffice365() throws Exception{ 
  AppElement btnOffice365=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnOffice365"));
  btnOffice365.click();
  }
public void btnPleaseWait() throws Exception{ 
  AppElement btnPleaseWait=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnPleaseWait"));
  btnPleaseWait.click();
  }
public void headerButtonLeft() throws Exception{ 
  AppElement headerButtonLeft=new AppElement(EventsWidgetId.getWidgetId("${frmname}_headerButtonLeft"));
  headerButtonLeft.click();
  }





}