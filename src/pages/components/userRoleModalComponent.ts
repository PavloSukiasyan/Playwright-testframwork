import BasePageComponent from '../../base/baseComponents';

export default class UserRoleModalComponent extends BasePageComponent {
  public base = this.page.locator('dialog[class*="UserRoleModal"]');

  optionHomeowner = this.base.locator('input#user-homeowner');

  optionTraderOwner = this.base.locator('input#user-trader');

  btnConfirm = this.base.locator('button[class*="Button_primary"]');

  clickOnHomeowner = async () => { await this.optionHomeowner.click(); };

  clickOnTradeOwner = async () => { await this.optionTraderOwner.click(); };

  clickOnConfirmBtn = async () => { await this.btnConfirm.click(); };

  setHomeowner = async () => {
    await this.optionHomeowner.waitFor({ state: 'visible' });
    this.clickOnHomeowner();
    this.clickOnConfirmBtn();
    await this.optionHomeowner.waitFor({ state: 'hidden' });
  };
}
