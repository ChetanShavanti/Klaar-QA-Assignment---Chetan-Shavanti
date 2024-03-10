import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Wait;

public class Klaar_Main_D1 {

    public static void main(String[] args) throws InterruptedException {
        // Set the path to chromedriver executable
        System.setProperty("webdriver.chrome.driver", "E:\\JAVA\\JavaSoft\\ChromeDriverFolder\\chromedriver.exe");

        
        
        
        // Initialize ChromeDriver
        WebDriver driver = new ChromeDriver();

        //Login  
        driver.get("https://dev.klaarhq.com/auth/sign_in");
        driver.findElement(By.xpath(" //*[@id=\"main-app\"]/app-root/app-sign-in/nz-spin/div/div[1]/div[2]/div/div/div[3]/div/div/div[2]/p")).click();
        driver.findElement(By.id("email-field")).click();
        driver.findElement(By.id("email-field")).clear();
        driver.findElement(By.id("email-field")).sendKeys("chetanshavanti27@gmail.com");
        driver.findElement(By.xpath("//div[@id='main-app']/app-root/app-sign-in/nz-spin/div/div/div[2]/div/nz-spin/div/form/nz-form-item[2]/nz-form-label")).click();
        driver.findElement(By.id("password-field")).click();
        driver.findElement(By.id("password-field")).clear();
        driver.findElement(By.id("password-field")).sendKeys("Klaar@0909");
        driver.findElement(By.id("login-btn")).click();
      Thread.sleep(10000);
        
        //Quick Test of Settings
//        Thread.sleep(3000);
//		driver.findElement(By.id("site-page-header")).click();
//        driver.findElement(By.xpath("//nz-page-header[@id='site-page-header']/div/div/nz-page-header-title/span")).click();        Thread.sleep(3000);
//        driver.findElement(By.xpath("//nz-page-header[@id='site-page-header']/div/div/nz-page-header-title/span")).click();      Thread.sleep(3000);      
//        driver.get("	https://dev.klaarhq.com/settings/workspace/details	");     Thread.sleep(3000);
//        driver.get("	https://dev.klaarhq.com/settings/workspace/customize-modules	");     Thread.sleep(3000);
//        driver.get("	https://dev.klaarhq.com/settings/workspace/User-List	");     Thread.sleep(3000);
//        driver.get("	https://dev.klaarhq.com/settings/workspace/Integrations	");     Thread.sleep(3000);
//        driver.get("	https://dev.klaarhq.com/settings/workspace/display-settings	");     Thread.sleep(3000);
//        driver.get("	https://dev.klaarhq.com/settings/groups	");     Thread.sleep(3000);
//        driver.get("	https://dev.klaarhq.com/settings/link-accounts	");     Thread.sleep(3000);
//        driver.get("	https://dev.klaarhq.com/settings/mentoring	");     Thread.sleep(3000);
//        driver.get("	https://dev.klaarhq.com/settings/edit-basic-info	");     Thread.sleep(3000);
//        driver.get("	https://dev.klaarhq.com/settings/reports	");     Thread.sleep(3000);
//       
//       
//        //Upload Photo
//        driver.get("	https://dev.klaarhq.com/settings/workspace/details	");
//        Thread.sleep(30000);
//
//
//        WebElement fileInput1 = driver.findElement(By.xpath("//input[@type='file']"));
//        // Provide the file path to upload
//        String filePath = "E:/JAVA/WorkSpace2/Klaar_QA_Main/src/TestImage.png";
//        fileInput1.sendKeys(filePath);
//
//        Thread.sleep(5000);
//        //Save
//        driver.findElements(By.xpath(" //*[contains(text(),'Save')]")).get(2).click();
//
//        Thread.sleep(5000);
//        
       WebElement deleteButton = (WebElement) driver.findElements(By.xpath(" //*[@id=\"main-app\"]/app-root/app-layout/nz-layout/nz-layout/nz-content/div/app-settings/nz-spin/div/div/nz-card[3]/div/div/nz-spin/div/nz-upload/div/div/div/button[1]/i/svg/g "));
//
//        if (deleteButton.isDisplayed()) {
//            System.out.println("Delete button is visible.");
//        } else {
//            System.out.println("Delete button is not visible.");
//        }
//        
//        
//        Thread.sleep(5000);
//
//        //Delete Photo
//        driver.findElement(By.xpath("//*[@data-cy=\"settings-workspace-logo-delete-button\"]")).click();
//        Thread.sleep(5000);
//
//        driver.findElement(By.xpath("//*[@data-cy=\"settings-workspace-logo-confirm-delete-button\"]")).click();
//
//      
//        Thread.sleep(5000);
//        WebElement UploadImage = driver.findElement(By.xpath("//*[@class=\"ant-upload-drag-container\"]"));
//        if (UploadImage.isDisplayed()) {
//            System.out.println("Upload button is visible.");
//        } else {
//            System.out.println("Upload button is not visible.");
//        }
//        
//        
//        
        
        
        //Scenario QA TEST 2
       Thread.sleep(10000);
        driver.get("https://dev.klaarhq.com/settings/workspace/User-List");
        //Custom Fields
        driver.findElement(By.cssSelector(" div#main-app nz-tabs-nav > div > div > div:nth-child(3) > div")).click();
        //Add Field
        driver.findElement(By.cssSelector("  div#main-app button.ant-btn.tw-mr-4.ant-btn-primary ")).click();
        WebElement frame = driver.findElement(By.cssSelector("iframe.ng-star-inserted"));
        driver.switchTo().frame(frame);
        String Test_Name_Date = "Test_Name_Date";
        driver.findElement(By.xpath("//*[@formcontrolname=\"fieldName\"]")).sendKeys(Test_Name_Date);        
        //Click And Open Dropdown Of Field Type
        driver.findElement(By.xpath(" //*[@class=\"anticon anticon-down ng-star-inserted\"]")).click();   
        //Select Date
        driver.findElement(By.xpath(" /html/body/div[5]/div[3]/div/nz-option-container/div/cdk-virtual-scroll-viewport/div[1]/nz-option-item[6]/div	")).click();
        //Submit
        driver.findElement(By.xpath("  //*[@data-cy=\"modal-submit-button\"]")).click();
       
        
        //---------------------------------
        
        String Test_Name_List = "Test_Name_List";
        driver.findElement(By.xpath("//*[@formcontrolname=\"fieldName\"]")).sendKeys(Test_Name_List);
        driver.findElement(By.xpath(" //*[@class=\"anticon anticon-down ng-star-inserted\"]")).click();
        //Select List
        driver.findElement(By.xpath(" //*[@id=\"cdk-overlay-12\"]/nz-option-container/div/cdk-virtual-scroll-viewport/div[1]/nz-option-item[4]/div	")).click();
        //Add 2 More Lists
        driver.findElement(By.xpath("//*[@id=\"cdk-overlay-13\"]/nz-modal-container/div/div/div/app-modal/div/div[2]/app-add-field-modal/div/nz-spin/div/div[2]/div[1]/div/div[2]/button/span")).click();
        driver.findElement(By.xpath("//*[@id=\"cdk-overlay-13\"]/nz-modal-container/div/div/div/app-modal/div/div[2]/app-add-field-modal/div/nz-spin/div/div[2]/div[1]/div/div[2]/button/span")).click();
        driver.findElement(By.cssSelector(" div#cdk-drop-list-3 div:nth-child(1) > div > input")).sendKeys("1"); 
        driver.findElement(By.cssSelector(" div#cdk-drop-list-3 div:nth-child(1) > div > input")).sendKeys("2"); 
        driver.findElement(By.cssSelector(" div#cdk-drop-list-3 div:nth-child(1) > div > input")).sendKeys("3"); 
        //Submit
        driver.findElement(By.xpath("  //*[@data-cy=\"modal-submit-button\"]")).click();

        
        
        
        //Scenario QA TEST 3 : Check Custom Fields In company Details
        
        //All Users
        driver.findElement(By.cssSelector("   div#main-app nz-tabs-nav > div > div > div:nth-child(1) > div ")).click();   
        //Search Active USer
        driver.findElement(By.cssSelector("  div#main-app nz-input-group > input ")).sendKeys("1234");
        //Select Record
        driver.findElement(By.cssSelector("  div#main-app tr:nth-child(1) > td:nth-child(2) > div > span ")).click();  
        //click on Company       
        driver.findElement(By.cssSelector("  	 div#main-app nz-tabs-nav > div > div > div:nth-child(2) > div	 ")).click();
                
        WebElement Test_Name_Date_Check = driver.findElement(By.xpath("  	//*[contains(text(),'Test_Name_Date')]	"));
        if (deleteButton.isDisplayed()) {
            System.out.println("Custom Field Date button is visible.");
        } else {
            System.out.println("ustom Field Date button is not visible.");
        }              
        WebElement Test_Name_List_Check = driver.findElement(By.xpath("  	//*[contains(text(),'Test_Name_List')]	"));
        if (deleteButton.isDisplayed()) {
            System.out.println("Custom Field List button is visible.");
        } else {
            System.out.println("ustom Field List button is not visible.");
        }
        //Fill Test Date 
        driver.findElement(By.cssSelector("  div#main-app nz-input-group > nz-date-picker > div > input ")).sendKeys("2024-06-27");

        
        
        
        
        
        //Scenario QA TEST 4 : Disable Button and Check Functionality
        String CurrentURL =  driver.getCurrentUrl();
        System.out.println(CurrentURL);                    
        driver.get("	https://dev.klaarhq.com/settings/workspace/User-List	");
        //Custom Fields
        driver.findElement(By.cssSelector(" div#main-app nz-tabs-nav > div > div > div:nth-child(3) > div")).click();
        
      
        
        //BUtton 1
        driver.findElements(By.className("ant-switch ant-switch-checked")).get(0).click();
        //BUtton 2
        driver.findElements(By.className("ant-switch ant-switch-checked")).get(1).click();

        
        driver.get(CurrentURL);
        //click on Company       
        driver.findElement(By.cssSelector("  	 div#main-app nz-tabs-nav > div > div > div:nth-child(2) > div	 ")).click();
        if (Test_Name_Date_Check.isDisplayed() && Test_Name_List_Check.isDisplayed() ) {
            System.out.println("Unable to close the button to hide Custom Fields Under Company");
        } else {
            System.out.println("Able to close the button to hide Custom Fields Under Company");
        }

        

        
        //Scenario QA TEST 5 : Delete Custom Field
        

        
        driver.get("	https://dev.klaarhq.com/settings/workspace/User-List	");
        //Custom Fields
        driver.findElement(By.cssSelector(" div#main-app nz-tabs-nav > div > div > div:nth-child(3) > div")).click();

        
        //BUtton 1 Delete
        driver.findElements(By.xpath("//*[@nztype=\"delete\"]")).get(0).click();
        //BUtton 2 Delete
        driver.findElements(By.xpath("//*[@nztype=\"delete\"]")).get(1).click();


        if (Test_Name_Date_Check.isDisplayed() && Test_Name_List_Check.isDisplayed() ) {
            System.out.println("Unable to Delete  the Custom Fields ");
        } else {
            System.out.println("Able to Delete  the Custom Fields");
        }


        
        
        
        
        
        

       
        
        
        
    }

}