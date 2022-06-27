const playwright = require("playwright");
const connectDB = require("./utils/dbConnect");
const accountSchema = require("./models/models");
const { errorLog, dataLog } = require("./utils/logger");

require("dotenv").config();

let reFreshInterval = 18000;

connectDB();

console.log("Bot running 🤖");

const scrapData = async () => {
  const date = new Date();
  const currentTime = date.toTimeString();

  try {
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    const result = await page.goto("https://trade.mql5.com/trade?servers=.");
    console.log("Done Loading");

    //wait for page navigation in playwright
    await page.waitForNavigation();
    await page.type("#login", process.env.LOGIN);
    await page.type("#password", process.env.PASSWORD);
    await page.fill("#server", process.env.SERVER);
    await page.click(
      "body > div:nth-child(14) > div > div.b > button:nth-child(18)"
    );

    const data = await page.innerText(
      "tr.total:nth-child(5) > td:nth-child(1) > div:nth-child(1) > span:nth-child(1)"
    );

    dataList = data.split(" ");

    let balance = dataList[1];
    let equity = dataList[3];

    equityCleaned = equity.slice(0, 8);

    const post = {
      balance: balance,
      equity: equityCleaned,
      market_watch_time: currentTime,
    };

    const newTrade = new accountSchema(post);
    await newTrade.save();

    datalog.info("Trade data saved");

    await browser.close();
  } catch (error) {
    errorLog.error(error);
  }
};

scrapData();

setInterval(scrapData, reFreshInterval);
