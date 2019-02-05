package test.Events.tests;

import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

import test.Events.EventsBaseTest;
import test.Events.EventsWidgetId;
import test.Events.forms.frmAllEvents;
import test.Events.forms.frmLogin;
import test.common.AppElement;

public class AllEvents extends EventsBaseTest{
 
 @Test
	public void validateLandingScreenTitle() throws Exception{
		SoftAssert sa = new SoftAssert();
		sa.assertTrue(AppElement.waitForEnable(EventsWidgetId.getWidgetId("frmAllEvents_LblTitle")),
				"All Events Label is not available");
		sa.assertEquals(frmAllEvents.getAllEventsText(), "All Events");		
		sa.assertAll();
		}
 @Test
	public void validateUpcommingEventTitle() throws Exception{
		SoftAssert sa = new SoftAssert();
		Thread.sleep(2000);
		sa.assertTrue(AppElement.waitForEnable(EventsWidgetId.getWidgetId("frmAllEvents_menuItem_lblManageUser")),
				"MenuItem is not available");		
		frmAllEvents.clickUpcommingEventText();	
		sa.assertTrue(AppElement.waitForEnable(EventsWidgetId.getWidgetId("frmAllEvents_LblTitle")),
				"All Events LAbel is not available");
		sa.assertEquals(frmAllEvents.getAllEventsText(), "Upcoming Events");
		sa.assertAll();
		}

 
}