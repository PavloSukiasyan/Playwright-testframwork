import { test, expect } from '@playwright/test';
import CONTENTFUL_URL from '../../../helper/constant';
import { routeHelper } from '../../../helper/routeHelper';
import BlogListPage from '../../../pages/blogs/blogListPage';
import { CommonSteps } from '../../../pages/commonSteps';
import CookiesPolicyComponent from '../../../pages/components/oneTrustCookiePolicy';
import Footer from '../../../pages/footer';
import mockForBlogsListing from './mockBlogsListing';

test.describe('Tests for Filter menu UI on Blogs listing page: ', () => {
  let blogList : BlogListPage;

  test.beforeEach(async ({ page, context }) => {
    const commonSteps = new CommonSteps(page, context);
    const footer = new Footer(page);
    const cookiesPolicy = new CookiesPolicyComponent(page, context);

    blogList = new BlogListPage(page);

    await cookiesPolicy.setPredefinedCookies();
    await commonSteps.goToHomePage();

    // Mock
    await routeHelper(page, CONTENTFUL_URL, mockForBlogsListing());

    await footer.navigationPart.waitFor();
    await footer.getFooterLinkByHref('blogs').click();
  });

  test('BCOM-16, Basic Filter UI', async () => {
    await test.step('Step 1: general filter', async () => {
      await expect.soft(blogList.filterSideMenu).toBeVisible();
      await expect.soft(blogList.activeFilter).toBeHidden();

      await expect.soft(blogList.filterTitle).toBeVisible();
      await expect.soft(blogList.filterTitle).toHaveText('Filters');
      await expect.soft(blogList.filterTitle).toHaveCSS('font-size', '24px');
      await expect.soft(blogList.filterTitle).toHaveCSS('font-weight', '700');
      await expect.soft(blogList.filterTitle).toHaveCSS('font-family', /Helvetica Neue/);
      await expect.soft(blogList.filterTitle).toHaveCSS('text-align', 'left');
      await expect.soft(blogList.filterTitle).toHaveCSS('text-overflow', 'clip');
      await expect.soft(blogList.filterTitle).toHaveCSS('-webkit-line-clamp', 'none');
      await expect.soft(blogList.filterTitle).toHaveCSS('cursor', 'auto');
      await expect.soft(blogList.filterTitle).toHaveCSS('color', 'rgb(24, 45, 61)');
    });

    await test.step('Step 2: Filter groups UI', async () => {
      await expect.soft(blogList.filterGroupLabel).toHaveCount(3);
      const numberOfFilterGroups = await blogList.filterGroups.count();
      const numberOfGroupForLoops = numberOfFilterGroups - 1;

      await expect.soft(blogList.filterGroupLabel.nth(0)).toHaveText('Topic');
      await expect.soft(blogList.filterGroupLabel.nth(1)).toHaveText('Styles');
      await expect.soft(blogList.filterGroupLabel.nth(2)).toHaveText('Date');

      for (let i = 0; i < numberOfGroupForLoops; i += 1) {
        await expect.soft(blogList.filterGroupLabel.nth(i)).toHaveCSS('font-size', '16px');
        await expect.soft(blogList.filterGroupLabel.nth(i)).toHaveCSS('font-weight', '700');
        await expect.soft(blogList.filterGroupLabel.nth(i)).toHaveCSS('font-family', /Helvetica Neue/);
        await expect.soft(blogList.filterGroupLabel.nth(i)).toHaveCSS('text-align', 'left');
        await expect.soft(blogList.filterGroupLabel.nth(i)).toHaveCSS('cursor', 'pointer');
        await expect.soft(blogList.filterGroupLabel.nth(i)).toHaveCSS('color', 'rgb(0, 0, 0)');
        await expect.soft(blogList.filterGroups.nth(i)).toHaveAttribute('class', /^(?!.*is-open).*$/);
      }

      for (let i = 0; i < numberOfGroupForLoops; i += 1) {
        await blogList.filterGroupLabel.nth(i).click();
        await expect.soft(blogList.filterGroups.nth(i)).toHaveAttribute('class', /.*is-open.*/);
      }
    });

    await test.step('Step 3: Show more/less button', async () => {
      await expect.soft(blogList.groupElements(0)).toHaveCount(5);

      await expect.soft(blogList.showBthForGroup(0)).toBeVisible();
      await expect.soft(blogList.showBthLabel(0)).toBeVisible();
      await expect.soft(blogList.showBthLabel(0)).toHaveText('Show all');
      await expect.soft(blogList.showBthLabel(0)).toHaveCSS('font-size', '16px');
      await expect.soft(blogList.showBthLabel(0)).toHaveCSS('font-weight', '400');
      await expect.soft(blogList.showBthLabel(0)).toHaveCSS('font-family', /Helvetica Neue/);
      await expect.soft(blogList.showBthLabel(0)).toHaveCSS('text-align', 'left');
      await expect.soft(blogList.showBthLabel(0)).toHaveCSS('cursor', 'pointer');
      await expect.soft(blogList.showBthLabel(0)).toHaveCSS('color', 'rgb(5, 45, 91)');

      await expect.soft(blogList.showBthChevron(0)).toHaveAttribute('aria-label', 'icon-chevron-down');
      await expect.soft(blogList.filterGroups.nth(0)).toHaveCSS('height', '328px');

      await blogList.showBthForGroup(0).click();

      await expect.soft(blogList.groupElements(0)).toHaveCount(8);

      await expect.soft(blogList.showBthForGroup(0)).toBeVisible();
      await expect.soft(blogList.showBthLabel(0)).toBeVisible();
      await expect.soft(blogList.showBthLabel(0)).toHaveText('Show less');
      await expect.soft(blogList.showBthChevron(0)).toHaveAttribute('aria-label', 'icon-chevron-up');
      await expect.soft(blogList.filterGroups.nth(0)).toHaveCSS('height', /457.*px/);

      await expect.soft(blogList.showBthForGroup(1)).toBeHidden();
      await expect.soft(blogList.showBthForGroup(2)).toBeHidden();
    });

    await test.step('Step 3: Details of filter group', async () => {
      await expect.soft(blogList.groupElements(0)).toHaveCount(8);
      const numberOfVariantsForFirstGr = await blogList.groupElements(0).count();
      const numberOfVariantsForFirstGrForLoops = numberOfVariantsForFirstGr - 1;

      const filterVariants = [
        'Basins',
        'Baths',
        'Lighting',
        'Mirrors & accessories',
        'Showers',
        'Suites & furniture',
        'Tiles_mock',
        'Toilets',
      ];

      for (let i = 0; i < numberOfVariantsForFirstGrForLoops; i += 1) {
        await expect.soft(blogList.getDesiredGroupElement(0, i)).toBeVisible();
        await expect.soft(blogList.getDesiredGroupElement(0, i)).toHaveText(filterVariants[i]);
        await expect.soft(blogList.getDesiredGroupElement(0, i)).toHaveCSS('font-size', '16px');
        await expect.soft(blogList.getDesiredGroupElement(0, i)).toHaveCSS('font-weight', '400');
        await expect.soft(blogList.getDesiredGroupElement(0, i)).toHaveCSS('font-family', /Helvetica Neue/);
        await expect.soft(blogList.getDesiredGroupElement(0, i)).toHaveCSS('text-align', 'start');
        await expect.soft(blogList.getDesiredGroupElement(0, i)).toHaveCSS('color', 'rgb(0, 0, 0)');

        await expect.soft(blogList.getCheckboxForDesiredGroupElements(0, i))
          .toHaveCSS('color', 'rgb(255, 255, 255)');
        await expect.soft(blogList.getCheckboxForDesiredGroupElements(0, i))
          .toHaveCSS('background-color', 'rgb(255, 255, 255)');
        await expect.soft(blogList.getCheckboxForDesiredGroupElements(0, i))
          .toHaveCSS('border-bottom-color', 'rgb(155, 175, 200)');
        await expect.soft(blogList.getCheckboxForDesiredGroupElements(0, i))
          .toBeChecked({ checked: false });
      }
    });
    // Todo step where style of checked combo-cox is verified
  });
});