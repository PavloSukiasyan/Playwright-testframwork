import BasePageComponent from '../../base/baseComponents';

export default class BreadCrumbsComponent extends BasePageComponent {
  base = this.page.locator('[data-testid="breadcrumbs"]');

  brLinks = this.base.locator('[data-testid="breadcrumbs-item"] a');

  bigTitle = this.page.locator('div.row div[class*="text-center"] h1');
}
