require('chromedriver');
var chrome = require('selenium-webdriver/chrome');
const webdriver = require("selenium-webdriver");
const {until, By} = require("selenium-webdriver");
const process = require('process');
const {getElementByClass, getElementById, getElementByXpath, getElementByName, login, clickByXpath, fillTextBox, returnElementText} = require("./utilities");
const data = require('./data/data.json');      // Constant data for testing


let options = new chrome.Options();
options.excludeSwitches("enable-logging");           // To disable the warning: [11180:13864:0514/153032.681:ERROR:device_event_log_impl.cc(214)] [15:30:32.681] USB: usb_device_handle_win.cc:1049 Failed to read descriptor from node connection: A device attached to the system is not functioning. (0x1F)

describe("Testing authorization of user roles and groups", function(){
    let driver;
    beforeEach(async function () {
        driver = await new webdriver.Builder()
                    .setChromeOptions(options)
                    .forBrowser('chrome').build();
        await driver.manage().setTimeouts( { implicit: 30000 } );
        await driver.get('https://www.perxtech.io/dashboard');
        console.info("after opening the site");
        await login(driver, data.rewardAuthorizedUser, data.rewardAuthorizedPass);
    }, 100000);

    test('User Authorized for rewards can view Rewards', async function() {
        await driver.get('https://dashboard.perxtech.io/dashboard/p/rewards/list');
        expect(await returnElementText(driver, "//section[@class='ant-layout']//strong")).toEqual("Rewards");
    }, 20000);
    test('User Authorized for rewards cannot view Reports ', async function() {
        await driver.get('https://dashboard.perxtech.io/dashboard/p/reports/downloads');
        expect(await returnElementText(driver, "//a[@class='btn btn-primary']")).toEqual("You dont have permission to view this resource. Please contact an administrator.");
    });
    
    test('User Authorized for rewards cannot view inventories', async function () {
        await driver.get('https://dashboard.perxtech.io/dashboard/p/inventories/list');
        expect(await returnElementText(driver, "//a[@class='btn btn-primary']")).toEqual("You dont have permission to view this resource. Please contact an administrator.");
    });

    test('User Authorized for rewards cannot view catalogues ', async function () {
        await driver.get('https://dashboard.perxtech.io/dashboard/p/catalogues/list');
        expect(await returnElementText(driver, "//a[@class='btn btn-primary']")).toEqual("You dont have permission to view this resource. Please contact an administrator.");
    });

    test('User Authorized for rewards cannot view Campaigns', async function() {
        await driver.get('https://dashboard.perxtech.io/dashboard/p/campaigns/list');
        expect(await returnElementText(driver, "//a[@class='btn btn-primary']")).toEqual("You dont have permission to view this resource. Please contact an administrator.");
    });

    test('User Authorized for rewards cannot view Badges', async function() {
        await driver.get('https://dashboard.perxtech.io/dashboard/p/badges/list');
        expect(await returnElementText(driver, "//a[@class='btn btn-primary']")).toEqual("You dont have permission to view this resource. Please contact an administrator.");
    });

    test('User Authorized for rewards cannot view Leaderboards', async function() {
        await driver.get('https://dashboard.perxtech.io/dashboard/p/leaderboards/list');
        expect(await returnElementText(driver, "//a[@class='btn btn-primary']")).toEqual("You dont have permission to view this resource. Please contact an administrator.");
    });

    test('User Authorized for rewards cannot view Loyalty', async function() {
        await driver.get('https://dashboard.perxtech.io/dashboard/p/loyalty/show/42');
        expect(await returnElementText(driver, "//a[@class='btn btn-primary']")).toEqual("You dont have permission to view this resource. Please contact an administrator.");
    });

    test('User Authorized for rewards cannot view Rules', async function() {
        await driver.get('https://dashboard.perxtech.io/dashboard/p/rules/list');
        expect(await returnElementText(driver, "//a[@class='btn btn-primary']")).toEqual("You dont have permission to view this resource. Please contact an administrator.");
    });

    test('User Authorized for rewards cannot view Merchants', async function() {
        await driver.get('https://dashboard.perxtech.io/dashboard/p/merchants/list');
        expect(await returnElementText(driver, "//a[@class='btn btn-primary']")).toEqual("You dont have permission to view this resource. Please contact an administrator.");
    });

    test('User Authorized for rewards cannot view Customers', async function() {
        await driver.get('https://dashboard.perxtech.io/dashboard/p/customers/list');
        expect(await returnElementText(driver, "//a[@class='btn btn-primary']")).toEqual("You dont have permission to view this resource. Please contact an administrator.");
    });

    test('User Authorized for rewards cannot view Bulk Actions', async function() {
        await driver.get('https://dashboard.perxtech.io/dashboard/p/bulk_actions');
        expect(await returnElementText(driver, "//a[@class='btn btn-primary']")).toEqual("You dont have permission to view this resource. Please contact an administrator.");
    });

    test('User Authorized for rewards cannot view Settings', async function() {
        await driver.get('https://dashboard.perxtech.io/dashboard/p/settings/general/media/list');
        expect(await returnElementText(driver, "//a[@class='btn btn-primary']")).toEqual("You dont have permission to view this resource. Please contact an administrator.");
    });

    afterEach(async function () {
        await driver.quit();
    }, 10000);
});


describe('Creating a reward with unauthorized user', function () {
    let driver;
    beforeEach(async function () {
        driver = await new webdriver.Builder()
                    .setChromeOptions(options)
                    .forBrowser('chrome')
                    .build();
        await driver.manage().setTimeouts({implicit: 30000});
        await driver.get('https://www.perxtech.io/dashboard');
        console.info("after opening the site");
        login(driver, data.adminUser, data.adminPass);
    }, 10000);

    test('Viewing rewards with unauthorized user', async function () {
        await driver.get('https://dashboard.perxtech.io/dashboard/p/rewards/list');
        expect(await returnElementText(driver, "//a[@class='btn btn-primary']")).toEqual("You dont have permission to view this resource. Please contact an administrator.");
    });

    afterEach(async function () {
        await driver.quit();
    }, 10000);
});


describe('Creating a reward with authorized user', function () {
    let driver;
    beforeEach(async function () {
        driver = await new webdriver.Builder()
                    .setChromeOptions(options)
                    .forBrowser('chrome')
                    .build();
        await driver.manage().setTimeouts( { implicit: 30000 } );
        await driver.get('https://www.perxtech.io/dashboard');
        login(driver, data.rewardAuthorizedUser, data.rewardAuthorizedPass);
    }, 10000);

    test('Viewing rewards with authorized user', async function () {
        await driver.get('https://dashboard.perxtech.io/dashboard/p/rewards/list');
        expect(await returnElementText(driver, "//strong[contains(text(),'Rewards')]")).toEqual("Rewards");
    });

    test('Clicking Create New button', async function () {
        await driver.get('https://dashboard.perxtech.io/dashboard/p/rewards/list');
        await clickByXpath(driver, "//li[@data-key='rewards']");
        await clickByXpath(driver, "//span[contains(text(),'Create New')]/parent::button");
        expect(await returnElementText(driver, "//strong[contains(text(),'Reward Info')]")).toEqual('Reward Info');
    });

    test('Check validity has start and end date', async function() {
        
    });

    test('Successful submission happens only with all mandatory information - missing name', async function() {
        await driver.get('https://dashboard.perxtech.io/dashboard/p/rewards/list');
        await clickByXpath(driver, "//li[@data-key='rewards']");
        await clickByXpath(driver, "//span[contains(text(),'Create New')]/parent::button");
        expect(await returnElementText(driver, "//strong[contains(text(),'Reward Info')]")).toEqual('Reward Info');
        await clickByXpath(driver, "//span[contains(text(),'Next')]/parent::button");
        expect(await returnElementText(driver, "//div[contains(text(),'Rewards must have a name')]")).toEqual('Rewards must have a name.');
    });

    test('Successful submission happens only with all mandatory information - missing End date', async () => {
        await driver.get('https://dashboard.perxtech.io/dashboard/p/rewards/list');
        await clickByXpath(driver, "//li[@data-key='rewards']");
        await clickByXpath(driver, "//span[contains(text(),'Create New')]/parent::button");
        expect(await returnElementText(driver, "//strong[contains(text(),'Reward Info')]")).toEqual('Reward Info');
        await fillTextBox(driver, 'name', 'name_en', 'Test Reward');
        await clickByXpath(driver, "//span[contains(text(),'Next')]/parent::button");
        await clickByXpath(driver, "//span[contains(text(),'Next')]/parent::button");
        expect(await returnElementText(driver, "//label[normalize-space()='Start date & end date required']")).toEqual('Reward Info');
    });

    test('Successful submission happens only with all mandatory information', async () => {
        await driver.get('https://dashboard.perxtech.io/dashboard/p/rewards/list');
        await clickByXpath(driver, "//li[@data-key='rewards']");
        await clickByXpath(driver, "//span[contains(text(),'Create New')]/parent::button");
        expect(await returnElementText(driver, "//strong[contains(text(),'Reward Info')]")).toEqual('Reward Info');
        await fillTextBox(driver, 'name', 'name_en', data.rewardName);
        await clickByXpath(driver, "//span[contains(text(),'Next')]/parent::button");
        await fillTextBox(driver, 'css', "input[placeholder='Select date'][value='']", data.rewardValidityEnd);
        await clickByXpath(driver, "//span[text()='Save']/parent::button");
        expect(await returnElementText(driver, "//strong[text()='"+data.rewardName+"']")).toEqual(data.rewardName);
    });

    test('Private type reward with no brands', async () => {
        await clickByXpath(driver, "//li[@data-key='rewards']")
        await clickByXpath(driver, "//span[contains(text(),'Create New')]/parent::button");
        await clickByXpath(driver, "//span[contains(text(),'Private')]");
        expect(await driver.findElement(By.xpath("//label[@title='Brands']")).isDisplayed()).toEqual(false);
    });

    test('Private type reward with no tags', async () => {
        await clickByXpath(driver, "//li[@data-key='rewards']")
        await clickByXpath(driver, "//span[contains(text(),'Create New')]/parent::button");
        await clickByXpath(driver, "//span[contains(text(),'Private')]");
        expect(await driver.findElement(By.xpath("//label[@title='Tags']")).isDisplayed()).toEqual(false);
    });

    test('Private type reward with no Categories', async () => {
        await clickByXpath(driver, "//li[@data-key='rewards']")
        await clickByXpath(driver, "//span[contains(text(),'Create New')]/parent::button");
        await clickByXpath(driver, "//span[contains(text(),'Private')]");
        expect(await driver.findElement(By.xpath("//label[@title='Categories']")).isDisplayed()).toEqual(false);
    });

    test('Private type reward with no Labels', async () => {
        await clickByXpath(driver, "//li[@data-key='rewards']")
        await clickByXpath(driver, "//span[contains(text(),'Create New')]/parent::button");
        await clickByXpath(driver, "//span[contains(text(),'Private')]");
        expect(await driver.findElement(By.xpath("//label[@title='Labels']")).isDisplayed()).toEqual(false);
    });

    test('Private type reward with no Catalogues', async () => {
        await clickByXpath(driver, "//li[@data-key='rewards']");
        await clickByXpath(driver, "//span[contains(text(),'Create New')]/parent::button");
        await clickByXpath(driver, "//span[contains(text(),'Private')]");
        expect(await driver.findElement(By.xpath("//label[@title='Catalogues']")).isDisplayed()).toEqual(false);
    });

    afterEach(async function () {
        await driver.quit();
    }, 10000);
});

describe("Upload a file in bulk list", function () {
    let driver;
    beforeEach(async function () {
        driver = await new webdriver.Builder()
                    .setChromeOptions(options)
                    .forBrowser('chrome')
                    .build();
        await driver.manage().setTimeouts( { implicit: 30000 } );
        await driver.get('https://www.perxtech.io/dashboard');
        login(driver, data.adminUser, data.adminPass);
    }, 10000);

    test('User with sufficient permission should see Bulk Actions page', async function() {
        await clickByXpath(driver, "//li[@data-key='bulk_actions']");
        expect(await driver.findElement(By.xpath("//strong[contains(text(),'Bulk Actions')]")).isDisplayed()).toEqual(true);
    });

    test('User with sufficient permission should be able to upload files in Bulk Actions page - text file', async function() {
        await clickByXpath(driver, "//li[@data-key='bulk_actions']");
        expect(await driver.findElement(By.xpath("//strong[contains(text(),'Bulk Actions')]")).isDisplayed()).toEqual(true);
        await clickByXpath(driver, "//div[@data-testid='page-header']//button");
        await fillTextBox(driver, 'xpath', "//input[@type='file']", process.cwd() + '/uploads/' + data.textFileUpload);
        await getElementByXpath(driver, "//span[contains(text(),'"+data.textFileUpload+"')]", 10000);
        await clickByXpath(driver, "//div[@class='ant-modal-content']//span[text()='Upload']/parent::button");
        expect(await returnElementText(driver, "//div[@class='ant-message']//span[text()='Upload Success']")).toEqual('Upload Success');
    });

    test('User with sufficient permission should be able to upload files in Bulk Actions page - excel file', async function() {
        await clickByXpath(driver, "//li[@data-key='bulk_actions']");
        expect(await driver.findElement(By.xpath("//strong[contains(text(),'Bulk Actions')]")).isDisplayed()).toEqual(true);
        await clickByXpath(driver, "//div[@data-testid='page-header']//button");
        await fillTextBox(driver, 'xpath', "//input[@type='file']", process.cwd() + '/uploads/' + data.excelFileUpload);
        await getElementByXpath(driver, "//span[contains(text(),'"+data.excelFileUpload+"')]", 10000);
        await clickByXpath(driver, "//div[@class='ant-modal-content']//span[text()='Upload']/parent::button");
        expect(await returnElementText(driver, "//div[@class='ant-message']//span[text()='Upload Success']")).toEqual('Upload Success');
    });

    test('User with sufficient permission should be able to upload files in Bulk Actions page - csv file', async function() {
        await clickByXpath(driver, "//li[@data-key='bulk_actions']");
        expect(await driver.findElement(By.xpath("//strong[contains(text(),'Bulk Actions')]")).isDisplayed()).toEqual(true);
        await clickByXpath(driver, "//div[@data-testid='page-header']//button");
        await fillTextBox(driver, 'xpath', "//input[@type='file']", process.cwd() + '/uploads/' + data.csvFileUpload);
        await getElementByXpath(driver, "//span[contains(text(),'"+data.csvFileUpload+"')]", 10000);
        await clickByXpath(driver, "//div[@class='ant-modal-content']//span[text()='Upload']/parent::button");
        expect(await returnElementText(driver, "//div[@class='ant-message']//span[text()='Upload Success']")).toEqual('Upload Success');
    });

    test('Only one action tied to each file after a successful upload - text file', async function() {
        await clickByXpath(driver, "//li[@data-key='bulk_actions']");
        expect(await driver.findElement(By.xpath("//strong[contains(text(),'Bulk Actions')]")).isDisplayed()).toEqual(true);
        let uploaded = await getElementByXpath(driver, "//td[contains(text(),'"+data.textFileUpload+"')]//parent::tr");
        let actions = await uploaded.findElement(By.xpath("./td/div"));
        expect(await actions.getText()).toEqual("Upload tries/stamps");
    });

    test('Only one action tied to each file after a successful upload - csv file', async function() {
        await clickByXpath(driver, "//li[@data-key='bulk_actions']");
        expect(await driver.findElement(By.xpath("//strong[contains(text(),'Bulk Actions')]")).isDisplayed()).toEqual(true);
        let uploaded = await getElementByXpath(driver, "//td[contains(text(),'"+data.csvFileUpload+"')]//parent::tr");
        let actions = await uploaded.findElement(By.xpath("./td/div"));
        expect(await actions.getText()).toEqual("Upload tries/stamps");
    });

    test('Only one action tied to each file after a successful upload - excel file', async function() {
        await clickByXpath(driver, "//li[@data-key='bulk_actions']");
        expect(await driver.findElement(By.xpath("//strong[contains(text(),'Bulk Actions')]")).isDisplayed()).toEqual(true);
        let uploaded = await getElementByXpath(driver, "//td[contains(text(),'"+data.excelFileUpload+"')]//parent::tr");
        let actions = await uploaded.findElement(By.xpath("./td/div"));
        expect(await actions.getText()).toEqual("Upload tries/stamps");
    });

    afterEach(async function () {
        await driver.quit();
    }, 10000);

});

