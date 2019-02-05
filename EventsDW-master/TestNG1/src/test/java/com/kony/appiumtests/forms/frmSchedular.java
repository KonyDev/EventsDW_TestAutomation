package com.kony.appiumtests.forms;

import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;
import com.kony.appiumtests.EventsWidgetId;

public class frmSchedular {


  public frmSchedular() throws Exception {
  AppElement lblHeader=new AppElement(EventsWidgetId.getWidgetId("frmSchedular_btnSearchIcon"));
  }
public void btnSearchIcon() throws Exception{ 
  AppElement btnSearchIcon=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnSearchIcon"));
  btnSearchIcon.click();
  }





}