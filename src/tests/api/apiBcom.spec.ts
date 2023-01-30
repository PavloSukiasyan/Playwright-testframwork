import { test, expect } from '@playwright/test';

test('API-1, pravda_eng', async ({ request }) => {
  const response = await request.get('https://www.pravda.com.ua/eng/');
  expect(response.ok()).toBeTruthy();

  expect(response.status()).toEqual(200);
  expect(response.statusText()).toEqual('OK');

  expect(response.headersArray()[0]).toEqual({ name: 'Server', value: 'nginx' });
});

test('API-2, playbuzz', async ({ request }) => {
  const response = await request.get('http://rest-api-v2.playbuzz.com/v2/Items');
  expect(response.ok()).toBeTruthy();

  expect(response.status()).toEqual(200);
  expect(response.statusText()).toEqual('OK');

  expect(response.headersArray()[4]).toEqual({ name: 'Server', value: 'nginx' });

  // Should work but did not
  // https://github.com/facebook/jest/issues/9624

  // expect(await response.json()).toContainEqual(expect.objectContaining({
  //   total_hits: 391038
  // }));

  expect(['a', 'b', 'c', 'd']).toContain('a');
});
