/* eslint-disable playwright/expect-expect */
import { playAudit } from 'playwright-lighthouse';
import { test, chromium } from '@playwright/test';
import lighthouseDesktopConfig from 'lighthouse/core/config/lr-desktop-config.js';
import path from 'path';
import os from 'os';
import { thresholds } from '../../data/thresholdData';
import List from '../../resources/urls.json' assert { type: 'json' };
import urlToSafeString from '../../helper/stringHelper';

List.URLs.forEach((url: string) => {
  test(`Lighthouse performance test for ${url}`, async () => {
    // const browser = await chromium.launch({
    //     args: ['--remote-debugging-port=9222'],
    //     headless: false
    // });
    // const page = await browser.newPage();

    //--
    // Handle cookies
    const userDataDir = path.join(os.tmpdir(), 'pw', String(Math.random()));
    const context = await chromium.launchPersistentContext(userDataDir, {
      args: ['--remote-debugging-port=9222'],
      headless: false,
    });
    const page = await context.newPage();
    //--

    await page.goto(url);
    // Handle cookies
    await page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();
    await playAudit({
      page,
      config: lighthouseDesktopConfig,
      thresholds,
      port: 9222,
      opts: {
        logLevel: 'info',
      },
      reports: {
        formats: {
          html: true, // defaults to false
        },
        name: `LH-${urlToSafeString(url)}-${new Date().toISOString()}`,
        directory: `${process.cwd()}/lighthouse-report`,
      },
    });
    await context.close();
  });
});

List.URLsWithoutCookies.forEach((url: string) => {
  test(`Lighthouse performance test (no cookies) for ${url}`, async () => {
    const browser = await chromium.launch({
      args: ['--remote-debugging-port=9222'],
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto(url);

    await playAudit({
      page,
      config: lighthouseDesktopConfig,
      thresholds,
      port: 9222,
      opts: {
        logLevel: 'info',
      },
      reports: {
        formats: {
          html: true, // defaults to false
        },
        name: `LH-${urlToSafeString(url)}-${new Date().toISOString()}`,
        directory: `${process.cwd()}/lighthouse-report`,
      },
    });
    await browser.close();
  });
});

List.Getinge.forEach((url: string) => {
  test(`Lighthouse 2 performance test for ${url}`, async () => {
    const userDataDir = path.join(os.tmpdir(), 'pw', String(Math.random()));
    const context = await chromium.launchPersistentContext(userDataDir, {
      args: ['--remote-debugging-port=9222'],
      headless: false,
    });
    const page = await context.newPage();
    //--

    await page.goto(url);
    // Handle cookies
    await page.locator('#onetrust-accept-btn-handler').click();
    await playAudit({
      page,
      config: lighthouseDesktopConfig,
      thresholds,
      port: 9222,
      opts: {
        logLevel: 'info',
      },
      reports: {
        formats: {
          html: true, // defaults to false
        },
        name: `LH-${urlToSafeString(url)}-${new Date().toISOString()}`,
        directory: `${process.cwd()}/lighthouse-report`,
      },
    });
    await context.close();
  });
});
