package test.Events.forms;


import test.Events.EventsWidgetId;
import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.SgConfiguration;
import test.common.ListBox;

public class frmAllEvents {
	static public AppElement rate;

	public static String getAllEventsText() throws Exception {
		
			AppElement.waitForEnable(EventsWidgetId.getWidgetId("frmAllEvents_LblTitle"));
			rate = new AppElement(EventsWidgetId.getWidgetId("frmAllEvents_LblTitle"));
		
		return rate.getText();

	}
	
	public static void clickUpcommingEventText() throws Exception {
		
		AppElement.waitForEnable(EventsWidgetId.getWidgetId("frmAllEvents_menuItem_lblManageUser"));
		rate = new AppElement(EventsWidgetId.getWidgetId("frmAllEvents_menuItem_lblManageUser"));
		rate.click();	

	}
	
	public static void clickLoginBtn() throws Exception{
		AppElement.waitForEnable(EventsWidgetId.getWidgetId("frmAllEvents_profileheader_btnUser"));
		rate = new AppElement(EventsWidgetId.getWidgetId("frmAllEvents_profileheader_btnUser"));
		rate.click();
		
	}
	





}