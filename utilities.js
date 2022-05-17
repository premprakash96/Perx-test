const {until, By} = require("selenium-webdriver");

// Function to find and return the element through ID
const getElementById = async (driver, id, timeout = 5000) => {
    const el = await driver.wait(until.elementLocated(By.id(id)), timeout);
    await driver.sleep(5000);
    return await driver.wait(until.elementIsVisible(el), timeout);
};

// Function to find and return the element through class
const getElementByClass = async (driver, classValue, timeout = 5000) => {
    const el = await driver.wait(until.elementLocated(By.className(classValue)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
};

// Function to find and return the element through xpath
const getElementByXpath = async (driver, xpath, timeout = 5000) => {
    const el = await driver.wait(until.elementLocated(By.xpath(xpath)), timeout);
    await driver.sleep(5000);
    return await driver.wait(until.elementIsVisible(el), timeout);
};

// Function to find and return the element through name
const getElementByName = async (driver, name, timeout = 5000) => {
    const el = await driver.wait(until.elementLocated(By.name(name)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
};

// Function to find and return the element through CSS selector
const getElementByCss = async (driver, css, timeout = 5000) => {
    const el = await driver.wait(until.elementLocated(By.css(css)), timeout);
    return await driver.wait(until.elementIsVisible(el), timeout);
};

// Function to click an element by xpath
const clickByXpath = async function (driver, xpath) {
    let el = await getElementByXpath(driver, xpath);
    await el.click();
}

//Function to fill the text box using any locator
const fillTextBox = async function (driver, locator, locatorValue, textValue) {
    let el;
    if(locator === 'name'){
        el = await getElementByName(driver, locatorValue);
    }else if(locator === 'class'){
        el = await getElementByClass(driver, locatorValue);
    }else if (locator === 'id') {
        el = await getElementById(driver, locatorValue);
    }else if (locator === 'xpath') {
        el = getElementByXpath(driver, locatorValue);
    }else if (locator === 'css') {
        el = getElementByCss(driver, locatorValue);
    }
    await el.clear();
    await el.sendKeys(textValue);
};

//Function to log into the site by filling username, password and clicking button
const login = async function (driver, usernameValue, passwordValue) {
    await fillTextBox(driver, 'id', 'email', usernameValue);
    await fillTextBox(driver, 'id', 'password', passwordValue);
    await clickByXpath(driver, "//button[@type='submit']");
    await getElementByXpath(driver, "//div[contains(text(),'dashboard_dev')]", 10000);
}

// const unauthorized = async function (driver) {
//     let unauthorisedElement = await getElementByXpath(driver, "//a[@class='btn btn-primary']", 10000);
//     return await unauthorisedElement.getText();
// }


//Function to return the link text or element text
const returnElementText = async function (driver, locatorValue) {
    let el = await getElementByXpath(driver, locatorValue, 10000);
    return await el.getText();
}

module.exports = {getElementById, getElementByClass, getElementByXpath, login, clickByXpath, fillTextBox, getElementByName, returnElementText};