import { Page } from '@playwright/test';

export default class BlogListPage {
  constructor(private readonly page:Page) {}

  filtersSideMenu = this.page.locator('[class*="Blogs_sideMenu"]');

  articlesBlock = this.page.locator('[class*="row Blogs_articlesContainer"]');

  mainArticle = this.articlesBlock.locator('[data-testid="main-article-block"]');

  titleMainArticle = this.mainArticle.locator('h1');
}
