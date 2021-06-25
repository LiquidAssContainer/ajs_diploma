import puppeteer from 'puppeteer';
import { fork } from 'child_process';

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
    // тест сделан не до конца
    await page.goto(baseUrl);

    const boardElem = await page.$('.board');
    const playerChar = await boardElem.$('.character.player');
    const enemyChar = await boardElem.$('.character.enemy');

    await playerChar.click();
    await boardElem.$('.selected-yellow .player');
    await enemyChar.hover();
    const cursorStyle = await page.$eval('.board', (el) => el.style.cursor);
    if (cursorStyle !== 'not-allowed') throw new Error('Wrong cursor style');
  });
});
