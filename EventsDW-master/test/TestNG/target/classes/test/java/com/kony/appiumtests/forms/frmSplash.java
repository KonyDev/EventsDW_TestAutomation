package com.kony.appiumtests.forms;

import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;
import com.kony.appiumtests.EventsWidgetId;

public class frmSplash {


  public frmSplash() throws Exception {
  AppElement lblHeader=new AppElement(EventsWidgetId.getWidgetId("frmSplash_segSearchResult"));
  }




public void segSplashEvents(String label) throws Exception{
		try {
		AppElement.scrollUntilVisible(label);
		Segment lblStatusKA = new Segment(EventsWidgetId.getWidgetId("${frmname}_segSplashEvents"),EventsWidgetId.getWidgetId("${frmname}_btnSkip"));
		lblStatusKA.clickSegRowElementbyLabel(label);
		}catch(Exception e){
		
			//Handle Exception Code Here
		}
	} 

}