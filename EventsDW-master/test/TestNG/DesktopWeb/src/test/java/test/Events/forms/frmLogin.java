package test.Events.forms;

import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;
import test.Events.EventsWidgetId;

public class frmLogin {


  public frmLogin() throws Exception {
  AppElement lblHeader=new AppElement(EventsWidgetId.getWidgetId("frmLogin_btnSubmit"));
  }
public void btnCancel() throws Exception{ 
  AppElement btnCancel=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnCancel"));
  btnCancel.click();
  }
public void btnLinkedInLogin() throws Exception{ 
  AppElement btnLinkedInLogin=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnLinkedInLogin"));
  btnLinkedInLogin.click();
  }
public static void btnSubmit() throws Exception{ 
  AppElement btnSubmit=new AppElement(EventsWidgetId.getWidgetId("frmLogin_btnSubmit"));
  btnSubmit.click();
  }

public static void txtPassWord(String text) throws Exception{
  AppElement txtPassWord=new AppElement(EventsWidgetId.getWidgetId("frmLogin_txtPassWord"));
  txtPassWord.type(text);
  }
public void txtPasswordShow(String text) throws Exception{
  AppElement txtPasswordShow=new AppElement(EventsWidgetId.getWidgetId("${frmname}_txtPasswordShow"));
  txtPasswordShow.type(text);
  }
public static void txtUser(String text) throws Exception{
  AppElement txtUser=new AppElement(EventsWidgetId.getWidgetId("frmLogin_txtUser"));
  txtUser.type(text);
  }
public static void clickMangeUserMenu() throws Exception{ 
	  AppElement mangeUserMenu=new AppElement(EventsWidgetId.getWidgetId("frmAllEvents_menuItem_lblManageUser"));
	  mangeUserMenu.click();
	  }





}