import { Locator } from '@playwright/test';

export async function getCssPropertyValue(
  locator:Locator,
  cssProperty: string,
): Promise<string> {
  const element = await locator.first();
  const value = await element.evaluate(
    (el: HTMLElement, property: string) => window.getComputedStyle(el).getPropertyValue(property),
    cssProperty,
  );
  return value;
}

export default getCssPropertyValue;
