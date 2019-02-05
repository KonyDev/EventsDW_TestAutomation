package com.kony.appiumtests.forms;

import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;
import com.kony.appiumtests.EventsWidgetId;

public class frmProfile {


  public frmProfile() throws Exception {
  AppElement lblHeader=new AppElement(EventsWidgetId.getWidgetId("frmProfile_btnBack"));
  }
public void btnBack() throws Exception{ 
  AppElement btnBack=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnBack"));
  btnBack.click();
  }





}