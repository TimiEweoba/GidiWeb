import { test, expect } from '@playwright/test';

test.describe('Waitlist Flow', () => {
    test('submits valid email and shows success', async ({ page }) => {
        // Navigate to waitlist route or root (where waitlist is mounted)
        await page.goto('/');

        // Ensure page loaded the headline
        await expect(page.locator('text=Get noticed').first()).toBeVisible();

        // Intercept the API call to mock success (so we don't dirty the DB during e2e or hit rate limits)
        await page.route('/api/waitlist', async route => {
            const json = { id: 'test-uuid', email: 'e2e@example.com' };
            await route.fulfill({ json });
        });

        // Fill in the email
        await page.fill('input[type="email"]', 'e2e@example.com');
        // Ensure honeypot is empty (done by default)

        // Click submit
        await page.click('button[type="submit"]');

        // Wait for the success state component to render
        await expect(page.locator('text=You\'re on the list').first()).toBeVisible();
        await expect(page.locator('text=Keep an eye on your inbox').first()).toBeVisible();
    });
});
