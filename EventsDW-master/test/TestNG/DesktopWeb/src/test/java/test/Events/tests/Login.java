package test.Events.tests;


import org.testng.annotations.Test;
import org.testng.asserts.SoftAssert;

import test.Events.EventsBaseTest;
import test.Events.EventsWidgetId;
import test.Events.forms.frmAllEvents;
import test.Events.forms.frmLogin;
import test.Events.forms.frmManageUser;
import test.common.AppElement;

public class Login extends EventsBaseTest{
	 @Test
	 	public void validateLogin() throws Exception{
		 	SoftAssert sa = new SoftAssert();
			sa.assertTrue(AppElement.waitForEnable(EventsWidgetId.getWidgetId("frmAllEvents_profileheader_btnUser")),
					"MenuItem is not available");
			frmAllEvents.clickLoginBtn();	
			sa.assertTrue(AppElement.waitForEnable(EventsWidgetId.getWidgetId("frmLogin_txtUser")),
					"Login screen is not available");
			frmLogin.txtUser("admin@kony.com");
			frmLogin.txtPassWord("Kony@123");
			frmLogin.btnSubmit();
			sa.assertTrue(AppElement.waitForEnable(EventsWidgetId.getWidgetId("frmAllEvents_LblTitle")),
					"All Events Label is not available");
			sa.assertEquals(frmAllEvents.getAllEventsText(), "All Events");
			sa.assertAll();
		 
	 		}
	 @Test
	 	public void validateManageUserTitle() throws Exception{
		 SoftAssert sa = new SoftAssert();
			sa.assertTrue(AppElement.waitForEnable(EventsWidgetId.getWidgetId("frmAllEvents_menuItem_lblManageUser")),
					"MenuItem is not available");
			//Thread.sleep(2000);
			frmLogin.clickMangeUserMenu();
			sa.assertTrue(AppElement.waitForEnable(EventsWidgetId.getWidgetId("frmManageUser_flexHeader")),
					"Manage Users Label is not available");
			sa.assertEquals(frmManageUser.getManageUsrText(), "Manage Users");
			sa.assertAll();
	 }
}
