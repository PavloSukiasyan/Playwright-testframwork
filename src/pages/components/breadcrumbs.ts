import { Page } from '@playwright/test';

export default class BreadCrumbsComponent {
  constructor(private readonly page:Page) {}

  brMainBlock = this.page.locator('[data-testid="breadcrumbs"]');

  brLinks = this.brMainBlock.locator('[data-testid="breadcrumbs-item"] a');

  bigTitle = this.page.locator('div.row div[class*="text-center"] h1');
}
