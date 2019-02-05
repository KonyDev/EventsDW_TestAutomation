package com.kony.appiumtests;

import java.io.IOException;

import test.common.SgConfiguration;
import test.common.WidgetID;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

public class EventsWidgetId {
	static WidgetID widgetIds;
	FileInputStream widconfig;
    private static EventsWidgetId widconf;
    
	protected EventsWidgetId()
	{
		try {
			widconfig = new FileInputStream("mobilewidgetid.properties");
			Properties props = new Properties();
			props.load(widconfig);
		} catch (FileNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}		
	}
	
	public static EventsWidgetId getInstance(){
		if (widconf != null)
			return widconf;
		widconf = new EventsWidgetId();
		return widconf;
	}
	
	public static String getWidgetId(String key) throws Exception,IOException{
		if(widgetIds==null){
			if(SgConfiguration.getInstance().getKeyValue("Device").equalsIgnoreCase("Tablet"))
				widgetIds = new WidgetID("src/"+"mobilewidgetid.properties");
			else
				widgetIds = new WidgetID("src/"+"mobilewidgetid.properties");
		}
			
		return widgetIds.getWidgetId(key);
	}

}