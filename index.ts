import puppeteer from 'puppeteer'
import "dotenv/config"
const USERNAME_SELECTOR = '#session_key';
const PASSWORD_SELECTOR = '#session_password';
const SUBMIT_BUTTON_SELECTOR = '.sign-in-form__submit-button';

const startBrowser = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    return { browser, page };
}

const closeBrowser = (browser: any) => {
    return browser.close();
}

async function startAction(url: string) {
    const { browser, page } = await startBrowser();
    page.setViewport({ width: 1366, height: 768 });
    await page.goto(url);
    await page.click(USERNAME_SELECTOR);
    await page.keyboard.type(process.env.EMAIL as string);
    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(process.env.PASSWORD as string);
    await page.click(SUBMIT_BUTTON_SELECTOR);
    await page.waitForNavigation();
    closeBrowser(browser)
}

(async () => {
    await startAction("https://www.linkedin.com/");
    process.exit(1);
})();