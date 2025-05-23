import CONTENTFUL_URL from '../../../helper/constant';
import { test, expect } from '../../../main.fixture';
import mockForBlogsListing, { mockForFilteredBlogListing } from './mockBlogsListing';
import { getCssPropertyValue } from '../../../helper/uiHelpers';

test.describe('Tests for Filter menu UI on Blogs listing page:', () => {
  test.beforeEach(async ({
    page, footer, routeHelper, commonSteps,
  }) => {
    await commonSteps.goToHomePage();
    // Mock
    await routeHelper.mock(CONTENTFUL_URL, mockForBlogsListing());

    await footer.navigationPart.waitFor();
    await footer.getFooterLinkByHref('blogs').click();

    await page.waitForLoadState();
  });

  test('BCOM-16, Basic Filter UI', async ({ blogList, routeHelper }) => {
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

      const heightBeforeExp = await getCssPropertyValue(blogList.filterGroups.nth(0), 'height');
      // this above is obsolete and can be replaced with assert below 
      await expect.soft(blogList.filterGroups.nth(0)).toHaveCSS('height', '332px')

      await blogList.showBthForGroup(0).click();

      await expect.soft(blogList.groupElements(0)).toHaveCount(8);

      await expect.soft(blogList.showBthForGroup(0)).toBeVisible();
      await expect.soft(blogList.showBthLabel(0)).toBeVisible();
      await expect.soft(blogList.showBthLabel(0)).toHaveText('Show less');
      await expect.soft(blogList.showBthChevron(0)).toHaveAttribute('aria-label', 'icon-chevron-up');

      const heightAfterExp = await getCssPropertyValue(blogList.filterGroups.nth(0), 'height');

      expect.soft(parseInt(heightAfterExp, 10)).toBeGreaterThan(parseInt(heightBeforeExp, 10));
      expect.soft((parseInt(heightAfterExp, 10)) - (parseInt(heightBeforeExp, 10)))
        .toBeGreaterThanOrEqual(120);

      await expect.soft(blogList.showBthForGroup(1)).toBeHidden();
      await expect.soft(blogList.showBthForGroup(2)).toBeHidden();
    });

    await test.step('Step 4: Details of filter group', async () => {
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

    await test.step('Step 5: checkbox ui, when filtered/un filtered', async () => {
      await routeHelper.mock(CONTENTFUL_URL, mockForFilteredBlogListing(9, 11, 2));
      await blogList.getDesiredGroupElement(0, 1).click();

      await expect.soft(blogList.getCheckboxForDesiredGroupElements(0, 1)).toBeChecked();

      await expect.soft(blogList.getCheckboxForDesiredGroupElements(0, 1))
        .toHaveCSS('color', 'rgb(255, 255, 255)');
      await expect.soft(blogList.getCheckboxForDesiredGroupElements(0, 1))
        .toHaveCSS('background-color', 'rgb(60, 113, 188)');
      await expect.soft(blogList.getCheckboxForDesiredGroupElements(0, 1))
        .toHaveCSS('border-bottom-color', 'rgba(0, 0, 0, 0)');

      await expect.soft(blogList.activeFilter).toBeVisible();
      await expect.soft(blogList.activeFilter).toHaveText('Baths');

      // Mock for undoing filtering  (back to default)
      await routeHelper.mock(CONTENTFUL_URL, mockForBlogsListing());
      await blogList.getDesiredGroupElement(0, 1).click();

      await expect.soft(blogList.getCheckboxForDesiredGroupElements(0, 1))
        .toHaveCSS('color', 'rgb(255, 255, 255)');
      await expect.soft(blogList.getCheckboxForDesiredGroupElements(0, 1))
        .toHaveCSS('background-color', 'rgb(255, 255, 255)');
      await expect.soft(blogList.getCheckboxForDesiredGroupElements(0, 1))
        .toHaveCSS('border-bottom-color', 'rgb(155, 175, 200)');
      await expect.soft(blogList.getCheckboxForDesiredGroupElements(0, 1))
        .toBeChecked({ checked: false });

      await expect.soft(blogList.activeFilter).toBeHidden();
    });
  });
});
