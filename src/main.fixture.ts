import { test as base } from '@playwright/test';
import BlogDetailPage from './pages/blogs/blogDetailPage';
import BlogListPage from './pages/blogs/blogListPage';
import RouteHelper from './helper/routeHelper';
import Footer from './pages/footer';
import CommonSteps from './pages/commonSteps';
import BreadCrumbsComponent from './pages/components/breadcrumbs';
import StaticPage from './pages/staticPages/staticPage';

type BcomFixtures = {
  blogDetail : BlogDetailPage;
  blogList : BlogListPage;
  breadcrumbs : BreadCrumbsComponent;
  commonSteps :CommonSteps ;
  footer : Footer;
  routeHelper: RouteHelper;
  staticPage: StaticPage;
}

export const test = base.extend <BcomFixtures>({
  breadcrumbs: async ({ page }, use) => {
    await use(new BreadCrumbsComponent(page));
  },
  routeHelper: async ({ page }, use) => {
    await use(new RouteHelper(page));
  },
  blogDetail: async ({ page }, use) => {
    await use(new BlogDetailPage(page));
  },
  blogList: async ({ page }, use) => {
    await use(new BlogListPage(page));
  },
  commonSteps: async ({ page, context }, use) => {
    await use(new CommonSteps(page, context));
  },

  footer: async ({ page }, use) => {
    await use(new Footer(page));
  },
  staticPage: async ({ page }, use) => {
    await use(new StaticPage(page));
  },
});

export { expect } from '@playwright/test';
export default test;
