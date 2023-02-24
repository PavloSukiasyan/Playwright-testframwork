import { Page } from '@playwright/test';

export default class BlogDetailPage {
  constructor(private readonly page:Page) {}

  publishedDate = this.page.locator('[data-testid="published"]');
}
