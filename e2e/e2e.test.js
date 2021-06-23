import puppeteer from 'puppeteer';
import { fork } from 'child_process';
// import { Promise } from 'core-js';
// import { resolve } from 'path';

jest.setTimeout(30000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('Test cursor style changing', async () => {
    await page.goto(baseUrl);

    const boardElem = await page.$('.board');
    const playerChar = await boardElem.$('.character.player');
    const enemyChar = await boardElem.$('.character.enemy');

    await playerChar.click();
    await boardElem.$('.selected-yellow .player');
    await enemyChar.hover();
    const cursorStyle = await page.$eval('.board', (el) => el.style.cursor);
    if (cursorStyle !== 'not-allowed') throw new Error('Wrong cursor style');
    // console.log(cursorStyle)
    // const isCursorNotAllowed = await page.evaluate(() => {
    // await page.evaluate(() => {
    //   return new Promise((resolve) => {
    //     const body = document.querySelector('body');

    //     const cursorStyle = getComputedStyle(body).getPropertyValue('cursor');
    //     console.log(cursorStyle);
    //     if (cursorStyle === 'not-allowedd') {
    //       resolve();
    //     }
    //   })
    //   // return getComputedStyle(body);
    // });
  });

  // test('Should add .invalid class for invalid card number', async () => {
  //   await page.goto(baseUrl);

  //   const form = await page.$('#form');
  //   const input = await form.$('#card-number-input');

  //   await input.type('7715964180');
  //   const submit = await form.$('#submit');
  //   submit.click();
  //   await page.waitForSelector('#card-number-input.invalid');
  // });

  // test('Should add .valid class for valid card number', async () => {
  //   await page.goto(baseUrl);

  //   const form = await page.$('#form');
  //   const input = await form.$('#card-number-input');

  //   await input.type('5551643264270868');
  //   const submit = await form.$('#submit');
  //   submit.click();
  //   await page.waitForSelector('#card-number-input.valid');
  // });
});
