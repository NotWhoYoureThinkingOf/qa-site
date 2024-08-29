const {By, Builder, WebElementCondition, until, Select} = require('selenium-webdriver')
const assert = require("assert");

async function bookingTest() {
    let driver;

    try {
        driver = await new Builder().forBrowser('MicrosoftEdge').build();
        await driver.get('https://admlucid.com/Golf')

        await driver.manage().setTimeouts({implicit: 500})
        await driver.manage().window().maximize()

        let bookButton = await driver.findElement(By.css('body > div.container > main > table:nth-child(8) > tbody > tr > td:nth-child(4) > form > button'))

        await bookButton.click()

        const selectElement = await driver.findElement(By.id('GolfName'))
        const select = new Select(selectElement)
        await select.selectByVisibleText('Golf Vacations');

        let customerTextbox = await driver.findElement(By.name('Customer'))
        await customerTextbox.sendKeys('ADM Lucid');

        let emailTextBox = await driver.findElement(By.name('Email'))
        await emailTextBox.sendKeys('test2@admlucid.com')

        let phoneBox = await driver.findElement(By.id('Phone'))
        await phoneBox.sendKeys('4032479990')

        let dateBox = driver.findElement(By.id('Date'))
        await dateBox.sendKeys('2023-12-22')

        let startTime = driver.findElement(By.id('StartTime'))
        await startTime.sendKeys('09:30AM')

        let endTime = driver.findElement(By.id('EndTime'))
        await endTime.sendKeys('10:30AM')

        let createButton = driver.findElement(By.css('body > div > main > div.row > div > form > div:nth-child(8) > input'))
        await createButton.click()

        }
            catch (e) {
                console.log(e)
        }   finally {
                await driver.quit();
        }
}

bookingTest();