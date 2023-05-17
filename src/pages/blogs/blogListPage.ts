import { Page } from '@playwright/test';

export default class BlogListPage {
  constructor(private readonly page:Page) {}

  articlesBlock = this.page.locator('[class*="row Blogs_articlesContainer"]');

  mainArticle = this.articlesBlock.locator('[data-testid="main-article-block"]');

  titleMainArticle = this.mainArticle.locator('h1');

  descriptionMainArticle = this.mainArticle.locator('[class*="body-wide-line"]');

  btnMainArticle = this.mainArticle.locator('button[class*="Button_primary"]');

  articleInfoMain = this.mainArticle.locator('[class*="ArticleInfo_info"]');

  dateOfMainArticle = this.articleInfoMain.locator('span[class*="notes-default margin"]');

  readingOfMainArticle = this.articleInfoMain.locator('span.undefined.notes-default');

  imgOfMainArticle = this.mainArticle.locator('[data-testid="image-container"]');

  // --
  regularArticles = this.articlesBlock.locator('[data-testid="regular-article-block"]');

  getRegArticleByIndex = (i: number) => this.regularArticles.nth(i);

  titlesRegArticles = this.regularArticles.locator('p[class*="RegularArticleBlock_highlightText"]');

  getRegTitleByIndex = (i: number) => this.getRegArticleByIndex(i).locator('p[class*="RegularArticleBlock_highlightText"]');

  btnRegArticles = this.regularArticles.locator('button[class*="Button_primary"]');

  // --

  loadMoreBtn = this.page.locator('button[data-testid="load-more-btn"]');

  // --

  filterSideMenu = this.page.locator('[data-testid="filters-side-menu"]');

  filterTitle = this.filterSideMenu.locator('[class*="FiltersSideMenu_titleWrapper"] h2');

  filterGroups = this.filterSideMenu.locator('[data-testid="collapse"]');

  filterGroupLabel = this.filterGroups.locator('h6');

  groupElements = (gIndex: number) => this.filterGroups.nth(gIndex).locator('[data-testid="checkbox"]');

  getDesiredGroupElement = (gIndex: number, i:number) => this.groupElements(gIndex).nth(i);

  getCheckboxForDesiredGroupElements = (gIndex: number, i:number) => this.getDesiredGroupElement(gIndex, i).locator('i');

  showBthForGroup = (gIndex: number) => this.filterGroups.nth(gIndex).locator('button');

  showBthChevron = (gIndex: number) => this.showBthForGroup(gIndex).locator('i');

  showBthLabel = (gIndex: number) => this.showBthForGroup(gIndex).locator('span');

  activeFilter = this.filterSideMenu.locator('[data-testid="active-filter"]');

  blogsWaitForTitles = async () => {
    await this.titleMainArticle.waitFor();
    await this.titlesRegArticles.nth(0).waitFor();
  };
}
