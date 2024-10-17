import { type Page } from '@playwright/test';

export default abstract class BasePage {
  constructor(protected readonly page: Page) {}
}
