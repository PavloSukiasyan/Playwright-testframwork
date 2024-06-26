import { Page } from '@playwright/test';

function isErrorResponse(mock: unknown) {
  return typeof mock === 'object' && mock !== null && 'errors' in mock;
}

function isWhoosmappResponse(mock: unknown) {
  return typeof mock === 'object' && mock !== null && 'localities' in mock;
}

export default class RouteHelper {
  constructor(private readonly page: Page) {}

  async mock(url: string, contentToMock: unknown) {
    await this.page.route(`**/${url}`, (route) => {
      const response = isErrorResponse(contentToMock) || isWhoosmappResponse(contentToMock)
        ? contentToMock
        : { data: contentToMock };

      route.fulfill({
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        status: 200,
        contentType: 'json',
        body: JSON.stringify(response),
      });
    });
  }
}
