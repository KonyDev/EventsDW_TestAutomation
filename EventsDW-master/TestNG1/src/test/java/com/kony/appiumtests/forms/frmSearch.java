package com.kony.appiumtests.forms;

import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;
import com.kony.appiumtests.EventsWidgetId;

public class frmSearch {


  public frmSearch() throws Exception {
  AppElement lblHeader=new AppElement(EventsWidgetId.getWidgetId("frmSearch_btnSelectAll"));
  }
public void btnCat1() throws Exception{ 
  AppElement btnCat1=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnCat1"));
  btnCat1.click();
  }
public void btnCat2() throws Exception{ 
  AppElement btnCat2=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnCat2"));
  btnCat2.click();
  }
public void btnCat3() throws Exception{ 
  AppElement btnCat3=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnCat3"));
  btnCat3.click();
  }
public void btnCat4() throws Exception{ 
  AppElement btnCat4=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnCat4"));
  btnCat4.click();
  }
public void btnCat5() throws Exception{ 
  AppElement btnCat5=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnCat5"));
  btnCat5.click();
  }
public void btnCross() throws Exception{ 
  AppElement btnCross=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnCross"));
  btnCross.click();
  }
public void btnSearchIcon() throws Exception{ 
  AppElement btnSearchIcon=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnSearchIcon"));
  btnSearchIcon.click();
  }
public void btnSelectAll() throws Exception{ 
  AppElement btnSelectAll=new AppElement(EventsWidgetId.getWidgetId("${frmname}_btnSelectAll"));
  btnSelectAll.click();
  }

public void txtSearch(String text) throws Exception{
  AppElement txtSearch=new AppElement(EventsWidgetId.getWidgetId("${frmname}_txtSearch"));
  txtSearch.type(text);
  }



public void segSearchResult(String label) throws Exception{
		try {
		AppElement.scrollUntilVisible(label);
		Segment lblStatusKA = new Segment(EventsWidgetId.getWidgetId("${frmname}_segSearchResult"),EventsWidgetId.getWidgetId("${frmname}_flexMainSearchTemp"));
		lblStatusKA.clickSegRowElementbyLabel(label);
		}catch(Exception e){
		
			//Handle Exception Code Here
		}
	} 

}