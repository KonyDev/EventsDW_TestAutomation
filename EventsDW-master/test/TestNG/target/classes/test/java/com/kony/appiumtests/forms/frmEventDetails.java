package com.kony.appiumtests.forms;

import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;
import com.kony.appiumtests.EventsWidgetId;

public class frmEventDetails {


  public frmEventDetails() throws Exception {
  AppElement lblHeader=new AppElement(EventsWidgetId.getWidgetId("frmEventDetails_btnVerticalStripSS"));
  }
public void btnRegister() throws Exception{ 
  AppElement btnRegister=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnRegister"));
  btnRegister.click();
  }
public void btnVerticalStripSS() throws Exception{ 
  AppElement btnVerticalStripSS=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnVerticalStripSS"));
  btnVerticalStripSS.click();
  }


public void rchTextDateSS(String text) throws Exception{
  AppElement rchTextDateSS=new AppElement(EventsWidgetId.getWidgetId("${frmname}_rchTextDateSS"));
  rchTextDateSS.type(text);
  }
public void rchtxtMonthSS(String text) throws Exception{
  AppElement rchtxtMonthSS=new AppElement(EventsWidgetId.getWidgetId("${frmname}_rchtxtMonthSS"));
  rchtxtMonthSS.type(text);
  }



}