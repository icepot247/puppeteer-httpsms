import express  from "express";
import puppeteer from "puppeteer";

const app = express();
const port = 3000;

app.get('/sms', async (req, res) => {

  const mobile =  req.query.mobile;
  const content =  req.query.content;

  if(mobile ==null && content == null){
    res.json({'status':false, 'msg':'Invalid mobile or content'});
    return;
  }

  const browser = await puppeteer.launch({
    "headless": "new",
    "args": ["--fast-start", "--disable-extensions", "--no-sandbox"],
    "ignoreHTTPSErrors": true
  });

/*  const browser = await puppeteer.launch({
    "headless": false
  });*/

  const page = await browser.newPage();
  await page.goto('https://sandbox.httpsms.com/');
  await page.waitForSelector('.mdi-plus.mdi.v-icon.notranslate.v-theme--dark.v-icon--size-default');
  await page.click('.mdi-plus.mdi.v-icon.notranslate.v-theme--dark.v-icon--size-default');



  await page.click("input[type=\"tel\"]")
  await page.keyboard.type('+88'+mobile);
  await page.keyboard.press('Tab');

  await page.keyboard.type(content);
  await page.keyboard.press('Enter');
  await page.keyboard.type('-- presented by introbe');

  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');

  await Promise.all([
    page.waitForNavigation(),
    page.waitForSelector('.v-snackbar__content')
  ]);
  await browser.close();

  res.json({'status':true, 'msg':'SMS has been send.'});

});

app.get('/', async (req, res) => {
  res.json({'status':true, 'msg':'Welcome'});
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


