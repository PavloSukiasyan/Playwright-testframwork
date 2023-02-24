import { Page } from '@playwright/test';

export default class BlogDetailPage {
  constructor(private readonly page:Page) {}

  publishedDate = this.page.locator('[data-testid="published"]');

  readTime = this.page.locator('[data-testid="published"] + span.undefined.notes-default');

  socialMediaCont = this.page.locator('[class*="ShareOnSocialMedia_container"]');

  facebookBtn = this.socialMediaCont.locator('button[aria-label="facebook"]');

  contentBlock = this.page.locator('[data-testid="content-block"]');

  textParagraph = this.contentBlock.locator('div[class*="body-wide-line"]');

  labelParagraph = this.contentBlock.locator('[class*="margin-b-2"]');

  imgWrapper = this.contentBlock.locator('[class*="PageContentBlock_imageWrapper"]');

  imgParagraph = this.imgWrapper.locator('[data-testid="content-block-image"]');
}
