package test.Events.forms;

import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;
import test.Events.EventsWidgetId;

public class frmCreateEvent {


  public frmCreateEvent() throws Exception {
  AppElement lblHeader=new AppElement(EventsWidgetId.getWidgetId("frmCreateEvent_CopybtnProceedToSession0b2f7789aa68447"));
  }
public void btnAddNewSessionDefault() throws Exception{ 
  AppElement btnAddNewSessionDefault=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnAddNewSessionDefault"));
  btnAddNewSessionDefault.click();
  }
public void BtnBrowseBanner() throws Exception{ 
  AppElement BtnBrowseBanner=new AppElement(EventsWidgetId.getWidgetId("${frmname}_BtnBrowseBanner"));
  BtnBrowseBanner.click();
  }
public void btnGalleryBrowse() throws Exception{ 
  AppElement btnGalleryBrowse=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnGalleryBrowse"));
  btnGalleryBrowse.click();
  }
public void btnProceedToSession() throws Exception{ 
  AppElement btnProceedToSession=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnProceedToSession"));
  btnProceedToSession.click();
  }
public void btnPublish() throws Exception{ 
  AppElement btnPublish=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnPublish"));
  btnPublish.click();
  }
public void CopybtnProceedToSession0b2f7789aa68447() throws Exception{ 
  AppElement CopybtnProceedToSession0b2f7789aa68447=new AppElement(EventsWidgetId.getWidgetId("${frmname}_CopybtnProceedToSession0b2f7789aa68447"));
  CopybtnProceedToSession0b2f7789aa68447.click();
  }

public void txtAddressLine1(String text) throws Exception{
  AppElement txtAddressLine1=new AppElement(EventsWidgetId.getWidgetId("${frmname}_txtAddressLine1"));
  txtAddressLine1.type(text);
  }
public void txtAddressLine2(String text) throws Exception{
  AppElement txtAddressLine2=new AppElement(EventsWidgetId.getWidgetId("${frmname}_txtAddressLine2"));
  txtAddressLine2.type(text);
  }
public void txtCity(String text) throws Exception{
  AppElement txtCity=new AppElement(EventsWidgetId.getWidgetId("${frmname}_txtCity"));
  txtCity.type(text);
  }
public void txtEventEndTime(String text) throws Exception{
  AppElement txtEventEndTime=new AppElement(EventsWidgetId.getWidgetId("${frmname}_txtEventEndTime"));
  txtEventEndTime.type(text);
  }
public void txtEventName(String text) throws Exception{
  AppElement txtEventName=new AppElement(EventsWidgetId.getWidgetId("${frmname}_txtEventName"));
  txtEventName.type(text);
  }
public void txtEventStartTime(String text) throws Exception{
  AppElement txtEventStartTime=new AppElement(EventsWidgetId.getWidgetId("${frmname}_txtEventStartTime"));
  txtEventStartTime.type(text);
  }



public void segGallery(String label) throws Exception{
		try {
		AppElement.scrollUntilVisible(label);
		Segment lblStatusKA = new Segment(EventsWidgetId.getWidgetId("${frmname}_segGallery"),EventsWidgetId.getWidgetId("${frmname}_ImgDelBImage1"));
		lblStatusKA.clickSegRowElementbyLabel(label);
		}catch(Exception e){
		
			//Handle Exception Code Here
		}
	} 

}