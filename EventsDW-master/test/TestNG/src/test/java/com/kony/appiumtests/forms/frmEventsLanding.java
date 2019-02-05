package com.kony.appiumtests.forms;

import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;
import com.kony.appiumtests.EventsWidgetId;

public class frmEventsLanding {


  public frmEventsLanding() throws Exception {
  AppElement lblHeader=new AppElement(EventsWidgetId.getWidgetId("frmEventsLanding_btnVerticalStripSS"));
  }
public void btnExpMore() throws Exception{ 
  AppElement btnExpMore=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnExpMore"));
  btnExpMore.click();
  }
public void btnHamburger() throws Exception{ 
  AppElement btnHamburger=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnHamburger"));
  btnHamburger.click();
  }
public void btnSearchIcon() throws Exception{ 
  AppElement btnSearchIcon=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnSearchIcon"));
  btnSearchIcon.click();
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


public void segEventList(String label) throws Exception{
		try {
		AppElement.scrollUntilVisible(label);
		Segment lblStatusKA = new Segment(EventsWidgetId.getWidgetId("${frmname}_segEventList"),EventsWidgetId.getWidgetId("${frmname}_btnShare"));
		lblStatusKA.clickSegRowElementbyLabel(label);
		}catch(Exception e){
		
			//Handle Exception Code Here
		}
	} 

}