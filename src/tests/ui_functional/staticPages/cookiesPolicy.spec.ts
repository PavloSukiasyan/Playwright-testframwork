import { test, expect } from '../../../main.fixture';
import CONTENTFUL_URL from '../../../helper/constant';
import { mockForCookiesPolicy } from './mockCookiesPolicy';

test.describe('Tests for Static - Cookies policy page:', () => {
  test.beforeEach(async ({ footer, commonSteps, routeHelper }) => {
    await commonSteps.goToHomePage();

    // Mock
    await routeHelper.mock(CONTENTFUL_URL, mockForCookiesPolicy);

    // click footer link
    await footer.navigationPart.waitFor();
    await footer.getFooterLinkByHref('cookies-policy').click();
  });

  test('General: PT-1, PT-2, PT-3', async ({ breadcrumbs, staticPage, page }) => {
    await test.step('PT-1, open page and breadcrumbs', async () => {
      await expect.soft(page).toHaveURL(
        '/legal-policies/cookies-policy',
      );

      await expect.soft(page).toHaveTitle(
        'Cookies Policy | The Bathroom Showroom',
      );

      await expect.soft(breadcrumbs.bigTitle).toHaveText('Cookies Policy Mock');
      await expect.soft(breadcrumbs.bigTitle).toHaveCSS('font-size', '36px');
      await expect.soft(breadcrumbs.bigTitle).toHaveCSS('color', 'rgb(0, 0, 0)');

      const brItems = await breadcrumbs.brLinks.count();

      for (let i = 0; i < brItems; i += 1) {
        await expect.soft(breadcrumbs.brLinks.nth(i)).toHaveCSS('font-size', '12px');
        await expect.soft(breadcrumbs.brLinks.nth(i)).toHaveCSS('font-weight', '400');
        await expect.soft(breadcrumbs.brLinks.nth(i)).toHaveCSS('text-align', 'left');
        await expect.soft(breadcrumbs.brLinks.nth(i)).toHaveCSS('text-overflow', 'ellipsis');
        await expect.soft(breadcrumbs.brLinks.nth(i)).toHaveCSS('-webkit-line-clamp', '2');
      }

      for (let i = 0; i < 1; i += 1) {
        await expect.soft(breadcrumbs.brLinks.nth(i)).toHaveCSS('color', 'rgb(5, 45, 91)');
        await expect.soft(breadcrumbs.brLinks.nth(i)).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
        await expect.soft(breadcrumbs.brLinks.nth(i)).toHaveCSS('cursor', 'pointer');
      }

      await expect.soft(breadcrumbs.brLinks.nth(2)).toHaveCSS('color', 'rgb(96, 111, 128)');
      await expect.soft(breadcrumbs.brLinks.nth(2)).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
      await expect.soft(breadcrumbs.brLinks.nth(2)).toHaveCSS('cursor', 'default');

      const brLabels = ['Homepage', 'Legal policies', 'Cookies Policy Mock'];

      // loop possibility one
      for (let i = 0; i < brLabels.length; i += 1) {
        await expect.soft(breadcrumbs.brLinks.nth(i)).toHaveText(brLabels[i]);
      }

      /**
       * !loop possibility two, but Eslint says It's too heavyweight
       *
       */

      // for (const label of brLabels) {
      //   await expect.soft(breadcrumbs.brLinks.nth(brLabels.indexOf(label))).toHaveText(label);
      // }

      brLabels.forEach(async (label) => {
        await expect.soft(breadcrumbs.brLinks.nth(brLabels.indexOf(label))).toHaveText(label);
      });
    });

    await test.step('PT-2, page content and style', async () => {
      await expect.soft(staticPage.titleOfTextBlock).toHaveText('Cookies Policy Mock2');
      await expect.soft(staticPage.titleOfTextBlock).toHaveCSS('font-size', '24px');
      await expect.soft(staticPage.titleOfTextBlock).toHaveCSS('font-family', /Helvetica Neue/);
      await expect.soft(staticPage.titleOfTextBlock).toHaveCSS('font-weight', '700');
      await expect.soft(staticPage.titleOfTextBlock).toHaveCSS('text-align', 'left');
      await expect.soft(staticPage.titleOfTextBlock).toHaveCSS('text-overflow', 'clip');
      await expect.soft(staticPage.titleOfTextBlock).toHaveCSS('-webkit-line-clamp', 'none');
      await expect.soft(staticPage.titleOfTextBlock).toHaveCSS('color', 'rgb(0, 0, 0)');

      await expect.soft(staticPage.titlesOfParagraphText).toHaveCount(5);

      const mediumTitles = await staticPage.titlesOfParagraphText.count();

      for (let i = 0; i < mediumTitles; i += 1) {
        const textTitle = staticPage.titlesOfParagraphText.nth(i);
        await textTitle.scrollIntoViewIfNeeded();
        await expect.soft(textTitle).toHaveCSS('font-size', '20px');
        await expect.soft(textTitle).toHaveCSS('font-family', /Helvetica Neue/);
        await expect.soft(textTitle).toHaveCSS('font-weight', '700');
        await expect.soft(textTitle).toHaveCSS('text-align', 'left');
        await expect.soft(textTitle).toHaveCSS('text-overflow', 'clip');
        await expect.soft(textTitle).toHaveCSS('-webkit-line-clamp', 'none');
        await expect.soft(textTitle).toHaveCSS('color', 'rgb(0, 0, 0)');
      }

      const parTitles = [
        'What are cookies?',
        'Types of cookie',
        'How can you prevent or remove cookies',
        'What happens if I disable cookies?',
        'Details of the cookies we use',
      ];

      parTitles.forEach(async (title) => {
        // !It seems, that .scrollIntoViewIfNeeded() - is not working in this kind of loop.
        // await staticPage.titlesOfParagraphText.nth(parTitles.indexOf(title))
        //  .scrollIntoViewIfNeeded();
        await expect.soft(staticPage.titlesOfParagraphText.nth(parTitles.indexOf(title)))
          .toHaveText(title);
      });

      await expect.soft(staticPage.ordinaryText).toHaveCount(36);

      await staticPage.titlesOfParagraphText.nth(0).scrollIntoViewIfNeeded();

      const firstNormalText = staticPage.ordinaryText.nth(0);
      await expect.soft(firstNormalText).toHaveText(`www.bathrooms.com is a website operated by by the Highbourne Group of companies, 
        which City Plumbing Supplies Holdings Limited (trading as City Plumbing, The Bathroom Showroom and PTS) ("we" or “us”), 
        registered in England & Wales under company number 824821 and Our registered office is located at Highbourne House,
        Eldon Way, Crick Industrial Estate, Crick, Northampton, United Kingdom, NN6 7SL. Our VAT number is 408556737.`);
      await expect.soft(firstNormalText).toHaveCSS('font-size', '16px');
      await expect.soft(firstNormalText).toHaveCSS('font-family', /Helvetica Neue/);
      await expect.soft(firstNormalText).toHaveCSS('font-weight', '400');
      await expect.soft(firstNormalText).toHaveCSS('text-align', 'left');
      await expect.soft(firstNormalText).toHaveCSS('text-overflow', 'clip');
      await expect.soft(firstNormalText).toHaveCSS('-webkit-line-clamp', 'none');
      await expect.soft(firstNormalText).toHaveCSS('color', 'rgb(0, 0, 0)');
    });

    await test.step('PT-3, page navigation menu and style', async () => {
      await expect.soft(staticPage.navMenuLink).toHaveCount(9);

      const linksNumber = await staticPage.navMenuLink.count();

      for (let i = 0; i < linksNumber; i += 1) {
        await expect.soft(staticPage.navMenuLink.nth(i)).toHaveCSS('font-size', '16px');
        await expect.soft(staticPage.navMenuLink.nth(i)).toHaveCSS('font-family', /Helvetica Neue/);
        await expect.soft(staticPage.navMenuLink.nth(i)).toHaveCSS('font-weight', '700');
        await expect.soft(staticPage.navMenuLink.nth(i)).toHaveCSS('text-align', 'left');
        await expect.soft(staticPage.navMenuLink.nth(i)).toHaveCSS('text-overflow', 'clip');
        await expect.soft(staticPage.navMenuLink.nth(i)).toHaveCSS('-webkit-line-clamp', 'none');
        await expect.soft(staticPage.navMenuLink.nth(i)).toHaveCSS('color', 'rgb(0, 0, 0)');
      }

      const linksLabels = [
        'Conditions of Sale_X',
        'Cookies Policy',
        'Privacy Policy',
        'Modern Slavery Act',
        'Environmental Policy',
        'Supplier Commitments',
        'Accessibility Policy',
        'Conditions of Website Use',
        'Promotional Terms & Conditions',
      ];

      /* eslint no-restricted-syntax: ["error", "BinaryExpression[operator='in']"] */
      for (const label of linksLabels) {
        await staticPage.navMenuLink.nth(linksLabels.indexOf(label)).scrollIntoViewIfNeeded();
        await expect.soft(staticPage.navMenuLink.nth(linksLabels.indexOf(label))).toHaveText(label);
      }
    });
  });
});
