import puppeteer from "puppeteer"

 const browser = await puppeteer.launch({
	headless: false
	});
 const page = await browser.newPage();
 await page.goto('https://google.com');
  //screenshot code
//   await page.screenshot({ path: 'screenshot.jpeg', fullPage: true  });

//specified viewport
await page.setViewport({ width: 800, height: 600 });
await page.screenshot({ path: 'viewport.png' });
  //close the browser
await browser.close()
