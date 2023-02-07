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
  // https://stackoverflow.com/questions/46742842/what-is-the-actual-use-of-tocontain-in-expect

  expect.soft(await response.json()).toHaveProperty('total_hits', 391037);
  expect.soft(await response.json()).toHaveProperty('payload.currentItemCount', 25);
  expect.soft(await response.json()).toHaveProperty('payload.totalItems', 391037);
  expect.soft(await response.json()).toHaveProperty('payload.items.length', 25);

  const respBody = await response.json();
  expect.soft(respBody.payload.items.find((item) => item.createDate === '2020-06-05T23:37:13.127Z')).toBeTruthy();

  expect.soft(['a', 'b', 'c', 'd']).toContain('a');
});

test('AP-3, playbuzz id specific', async ({ request }) => {
  const response = await request.get('http://rest-api-v2.playbuzz.com/v2/Items?id=e2ba2133-70c4-4ea8-8c18-bf6f06c2c15a');
  expect(response.ok()).toBeTruthy();

  expect(response.status()).toEqual(200);
  expect(response.statusText()).toEqual('OK');

  expect.soft(await response.json()).toHaveProperty('total_hits', 1);
  expect.soft(await response.json()).toHaveProperty('payload.currentItemCount', 1);

  const respBody = await response.json();
  expect.soft(respBody.payload.items.find((item) => item.id === 'e2ba2133-70c4-4ea8-8c18-bf6f06c2c15a')).toBeTruthy();

  // const itemsId = respBody.payload.items.map((item) => item.id);
  // console.log(...itemsId);

  expect.soft(respBody.payload.items.map((item) => item.id)).toContain('e2ba2133-70c4-4ea8-8c18-bf6f06c2c15a');
});
