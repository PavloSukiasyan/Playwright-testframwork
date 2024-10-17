import BasePage from '../../base/basePage';

export default class BlogDetailPage extends BasePage {
  public readonly base = this.page.locator('main');

  publishedDate = this.base.locator('[data-testid="published"]');

  readTime = this.base.locator('[data-testid="published"] + span.undefined.notes-default');

  socialMediaCont = this.base.locator('[class*="ShareOnSocialMedia_container"]');

  facebookBtn = this.socialMediaCont.locator('button[aria-label="facebook"]');

  contentBlock = this.base.locator('[data-testid="content-block"]');

  textParagraph = this.contentBlock.locator('div[class*="body-wide-line"]');

  labelParagraph = this.contentBlock.locator('[class*="margin-b-2"]');

  imgWrapper = this.contentBlock.locator('[class*="PageContentBlock_imageWrapper"]');

  imgParagraph = this.imgWrapper.locator('[data-testid="content-block-image"]');
}
