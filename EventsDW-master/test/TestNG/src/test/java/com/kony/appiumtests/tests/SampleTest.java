package com.kony.appiumtests.tests;

import org.testng.asserts.SoftAssert;
import org.testng.annotations.Test;
import test.common.AppCalendar;
import test.common.AppElement;
import test.common.Segment;
import test.common.ListBox;
import com.kony.appiumtests.EventsBaseTest;
import com.kony.appiumtests.EventsWidgetId;

public class SampleTest extends EventsBaseTest{
 
 @Test
	public void test1() throws Exception{
		SoftAssert sa = new SoftAssert();
		sa.assertEquals("Sample Test","Sample Test");
		sa.assertAll();
		}
 
}