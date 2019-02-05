package com.kony.appiumtests.forms;

import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;
import com.kony.appiumtests.EventsWidgetId;

public class frmPresenter {


  public frmPresenter() throws Exception {
  AppElement lblHeader=new AppElement(EventsWidgetId.getWidgetId("frmPresenter_headerButtonLeft"));
  }




public void segSpeaker(String label) throws Exception{
		try {
		AppElement.scrollUntilVisible(label);
		Segment lblStatusKA = new Segment(EventsWidgetId.getWidgetId("${frmname}_segSpeaker"),EventsWidgetId.getWidgetId("${frmname}_flexSegSpeakerRoot"));
		lblStatusKA.clickSegRowElementbyLabel(label);
		}catch(Exception e){
		
			//Handle Exception Code Here
		}
	} 

}