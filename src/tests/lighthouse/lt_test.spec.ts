
import { playAudit } from 'playwright-lighthouse';
import { test, chromium } from '@playwright/test';
import lighthouseDesktopConfig from 'lighthouse/core/config/lr-desktop-config.js';
import { thresholds } from '../../data/thresholdData.ts'
import List from '../../resources/urls.json' assert { type: 'json' };
import path from 'path';
import os from 'os';


List.URLs.forEach((url: string) => {
	test(`Ligthouse performance test for ${url}`, async () => {
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
			headless: false
		});
		const page = await context.newPage();
		//--

		await page.goto(url);
		// Handle cookies
		await page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll').click();
		await playAudit({
			page: page,
			config: lighthouseDesktopConfig,
			thresholds: thresholds,
			port: 9222,
			opts: {
				logLevel: "info",
			},
			reports: {
				formats: {
					html: true, //defaults to false
				},
				name: `ligthouse-${new Date().toISOString()}`, //defaults to `lighthouse-${new Date().getTime()}`
				directory: `${process.cwd()}/lighthouse-report`, //defaults to `${process.cwd()}/lighthouse`
			},
		});
		await context.close();
		// await browser.close();
	})
});