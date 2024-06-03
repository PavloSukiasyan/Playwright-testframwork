import CONTENTFUL_URL from '../../../helper/constant';
import mockForBlogsListing, { mockForFilteredBlogListing } from './mockBlogsListing';
import { test, expect } from '../../../main.fixture';

test.describe('Tests for Blogs listing actions page:', () => {
  test.beforeEach(async ({ commonSteps }) => {
    await commonSteps.goToHomePage();
  });

  test('BCOM-8, only seven blogs - so no "Load more" button', async ({
    footer, blogList, routeHelper, page,
  }) => {
    await routeHelper.mock(CONTENTFUL_URL, mockForBlogsListing(0, 7, 7, true));

    await footer.navigationPart.waitFor();
    await footer.getFooterLinkByHref('blogs').click();
    await page.waitForLoadState();
    await blogList.blogsWaitForTitles();

    await expect.soft(blogList.mainArticle).toHaveCount(1);
    await expect.soft(blogList.regularArticles).toHaveCount(6);

    await expect.soft(blogList.loadMoreBtn).toBeHidden();
  });

  test('BCOM-9, "Load more" button loads six more, and button then hides', async ({ footer, blogList, routeHelper }) => {
    await routeHelper.mock(CONTENTFUL_URL, mockForBlogsListing(0, 7, 13, true));

    await footer.navigationPart.waitFor();
    await footer.getFooterLinkByHref('blogs').click();
    await blogList.blogsWaitForTitles();

    await expect.soft(blogList.mainArticle).toHaveCount(1);
    await expect.soft(blogList.regularArticles).toHaveCount(6);

    await expect.soft(blogList.loadMoreBtn).toBeVisible();

    await routeHelper.mock(CONTENTFUL_URL, mockForBlogsListing(0, 13, 13, true));
    await blogList.loadMoreBtn.click();

    await expect.soft(blogList.mainArticle).toHaveCount(1);
    await expect.soft(blogList.regularArticles).toHaveCount(12);

    await expect.soft(blogList.loadMoreBtn).toBeHidden();
  });

  test('BCOM-10, "Load more" button loads six more, and button then still visible', async ({ routeHelper, footer, blogList }) => {
    await routeHelper.mock(CONTENTFUL_URL, mockForBlogsListing(0, 7, 15, true));

    await footer.navigationPart.waitFor();
    await footer.getFooterLinkByHref('blogs').click();
    await blogList.blogsWaitForTitles();

    await expect.soft(blogList.mainArticle).toHaveCount(1);
    await expect.soft(blogList.regularArticles).toHaveCount(6);

    await expect.soft(blogList.loadMoreBtn).toBeVisible();

    await routeHelper.mock(CONTENTFUL_URL, mockForBlogsListing(0, 13, 15, true));
    await blogList.loadMoreBtn.click();

    await expect.soft(blogList.mainArticle).toHaveCount(1);
    await expect.soft(blogList.regularArticles).toHaveCount(12);

    await expect.soft(blogList.loadMoreBtn).toBeVisible();
  });

  test('BCOM-15, Basic filtering', async ({ routeHelper, footer, blogList }) => {
    await routeHelper.mock(CONTENTFUL_URL, mockForBlogsListing());

    await footer.navigationPart.waitFor();
    await footer.getFooterLinkByHref('blogs').click();
    await blogList.blogsWaitForTitles();

    await expect.soft(blogList.regularArticles).toHaveCount(6);
    await expect.soft(blogList.mainArticle).toHaveCount(1);
    await expect.soft(blogList.titleMainArticle).toBeVisible();
    await expect.soft(blogList.titleMainArticle)
      .toHaveText('Mock Add Soft Curves With Circular Bathroom Mirrors');
    await expect.soft(blogList.getRegTitleByIndex(0))
      .toHaveText('What Showers Are Best for Small Bathrooms?');
    await expect.soft(blogList.getRegTitleByIndex(1))
      .toHaveText('Get Creative with Your Bathroom Lighting');

    await expect.soft(blogList.filterSideMenu).toBeVisible();
    await expect.soft(blogList.activeFilter).toBeHidden();
    await expect.soft(blogList.filterTitle).toBeVisible();
    await expect.soft(blogList.filterTitle).toHaveText('Filters');
    await expect.soft(blogList.filterGroups).toHaveCount(3);
    await expect.soft(blogList.filterGroupLabel.nth(0)).toHaveText('Topic');

    await expect.soft(blogList.filterGroups.nth(0)).toHaveAttribute('class', /^(?!.*is-open).*$/);

    await blogList.filterGroups.nth(0).click();
    await expect.soft(blogList.filterGroups.nth(0)).toHaveAttribute('class', /.*is-open.*/);

    await expect.soft(blogList.getDesiredGroupElement(0, 1)).toHaveText('Baths');
    await expect.soft(blogList.getCheckboxForDesiredGroupElements(0, 1))
      .toHaveAttribute('class', /^(?!.*Checkbox_active).*$/);

    // Mock for first filtering
    await routeHelper.mock(CONTENTFUL_URL, mockForFilteredBlogListing(10, 13, 3));
    await blogList.getDesiredGroupElement(0, 1).click();
    await expect.soft(blogList.getCheckboxForDesiredGroupElements(0, 1))
      .toHaveAttribute('class', /.*Checkbox_active.*/);

    await expect.soft(blogList.activeFilter).toBeVisible();
    await expect.soft(blogList.activeFilter).toHaveText('Baths');

    await expect.soft(blogList.regularArticles).toHaveCount(2);
    await expect.soft(blogList.mainArticle).toHaveCount(1);
    await expect.soft(blogList.titleMainArticle).toBeVisible();
    await expect.soft(blogList.titleMainArticle)
      .toHaveText('Stylish Ways to Use Marble in Your Bathroom Design');
    await expect.soft(blogList.getRegTitleByIndex(0))
      .toHaveText('Design a Charming Jack and Jill Bathroom Design');
    await expect.soft(blogList.getRegTitleByIndex(1))
      .toHaveText('Stylish Bathroom Worktops for Neat Design Finishes');

    // Mock for undoing filtering  (back to default)
    await routeHelper.mock(CONTENTFUL_URL, mockForBlogsListing());
    await blogList.getDesiredGroupElement(0, 1).click();

    await expect.soft(blogList.regularArticles).toHaveCount(6);
    await expect.soft(blogList.mainArticle).toHaveCount(1);
    await expect.soft(blogList.titleMainArticle).toBeVisible();
    await expect.soft(blogList.titleMainArticle)
      .toHaveText('Mock Add Soft Curves With Circular Bathroom Mirrors');
    await expect.soft(blogList.getRegTitleByIndex(0))
      .toHaveText('What Showers Are Best for Small Bathrooms?');
    await expect.soft(blogList.getRegTitleByIndex(1))
      .toHaveText('Get Creative with Your Bathroom Lighting');

    await expect.soft(blogList.getCheckboxForDesiredGroupElements(0, 1))
      .toHaveAttribute('class', /^(?!.*Checkbox_active).*$/);
    await expect.soft(blogList.activeFilter).toBeHidden();
  });
});
