package test.Events.forms;

import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;
import test.Events.EventsWidgetId;

public class frmManageUser {


  public frmManageUser() throws Exception {
  AppElement lblHeader=new AppElement(EventsWidgetId.getWidgetId("frmManageUser_btnProceed"));
  }
public void btnProceed() throws Exception{ 
  AppElement btnProceed=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnProceed"));
  btnProceed.click();
  }




public void segUserList(String label) throws Exception{
		try {
		AppElement.scrollUntilVisible(label);
		Segment lblStatusKA = new Segment(EventsWidgetId.getWidgetId("${frmname}_segUserList"),EventsWidgetId.getWidgetId("${frmname}_btnDone"));
		lblStatusKA.clickSegRowElementbyLabel(label);
		}catch(Exception e){
		
			//Handle Exception Code Here
		}
	} 
public static String getManageUsrText() throws Exception {
	
	AppElement.waitForEnable(EventsWidgetId.getWidgetId("frmManageUser_flexHeader"));
	AppElement mngUsrHdr = new AppElement(EventsWidgetId.getWidgetId("frmManageUser_flexHeader"));

return mngUsrHdr.getText();

}

}