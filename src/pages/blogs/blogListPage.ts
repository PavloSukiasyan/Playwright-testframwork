import { Page } from '@playwright/test';

export default class BlogListPage {
  constructor(private readonly page:Page) {}

  filtersSideMenu = this.page.locator('[class*="Blogs_sideMenu"]');

  articlesBlock = this.page.locator('[class*="row Blogs_articlesContainer"]');

  mainArticle = this.articlesBlock.locator('[data-testid="main-article-block"]');

  titleMainArticle = this.mainArticle.locator('h1');

  descriptionMainArticle = this.mainArticle.locator('[class*="body-wide-line"]');

  btnMainArticle = this.mainArticle.locator('button[class*="Button_primary"] ');

  articleInfoMain = this.mainArticle.locator('[class*="ArticleInfo_info"]');

  dateOfMainArticle = this.articleInfoMain.locator('span[class*="notes-default margin"]');

  readingOfMainArticle = this.articleInfoMain.locator('span.undefined.notes-default');

  imgOfMainArticle = this.mainArticle.locator('[data-testid="image-container"]');

  // --
  regularArticles = this.articlesBlock.locator('[data-testid="regular-article-block"]');

  getRegArticleByIndex = (i: number) => this.regularArticles.nth(i);

  titlesRegArticles = this.regularArticles.locator('p[class*="RegularArticleBlock_highlightText"]');

  getRegTitleByIndex = (i: number) => this.getRegArticleByIndex(i).locator('p[class*="RegularArticleBlock_highlightText"]');

  // --

  loadMoreBtn = this.page.locator('button[data-testid="load-more-btn"]');
}
