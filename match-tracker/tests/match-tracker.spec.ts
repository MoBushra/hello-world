import { test, expect } from '@playwright/test';

test.describe('Match Tracker App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should allow user to add a match and view it in history', async ({ page }) => {
    // Navigate to Add Match page
    await page.getByRole('link', { name: 'Log a Match' }).click();
    await expect(page).toHaveURL(/\/add/);

    // Fill the form
    await page.getByTestId('input-home-team').fill('Real Madrid');
    await page.getByTestId('input-away-team').fill('Barcelona');
    await page.getByTestId('input-score-home').fill('3');
    await page.getByTestId('input-score-away').fill('1');
    
    // Set date (future or past, default is today, let's keep default or set one)
    // await page.getByTestId('input-date').fill('2023-10-28T20:00'); // Optional: Input type datetime-local needs specific format
    
    await page.getByTestId('select-sport').selectOption('Football');
    await page.getByTestId('radio-live').check({ force: true });
    await page.getByTestId('input-notes').fill('El Clásico at Bernabéu');

    // Submit
    await page.getByTestId('submit-match').click();

    // Verify redirection to history
    await expect(page).toHaveURL(/\/matches/);

    // Verify match is in the list
    await expect(page.getByText('Real Madrid')).toBeVisible();
    await expect(page.getByText('Barcelona')).toBeVisible();
    await expect(page.getByText('3 - 1')).toBeVisible();
    await expect(page.getByText('El Clásico at Bernabéu')).toBeVisible();
    await expect(page.getByText('Live')).toBeVisible();
  });

  test('should update stats when a match is added', async ({ page }) => {
    // Add a match first
    await page.getByRole('link', { name: 'Log a Match' }).click();
    await page.getByTestId('input-home-team').fill('Lakers');
    await page.getByTestId('input-away-team').fill('Warriors');
    await page.getByTestId('select-sport').selectOption('Basketball');
    await page.getByTestId('radio-tv').check({ force: true });
    await page.getByTestId('submit-match').click();

    // Go to Stats
    await page.getByRole('link', { name: 'Stats' }).click();
    await expect(page).toHaveURL(/\/stats/);

    // Verify stats
    // We expect at least 1 match total
    await expect(page.getByText('Total Matches')).toBeVisible();
    // Check for "1" in the total matches card (might be tricky to target exact number without testid, but let's try text)
    // The stats page has "1" as text for total matches if this is the only match.
    // However, parallel tests might share state if I don't clear storage?
    // LocalStorage is isolated per context/page in Playwright usually, so it should be clean.
    
    const totalMatches = page.locator('.text-3xl.font-bold.text-blue-600');
    await expect(totalMatches).toHaveText('1');

    const tvMatches = page.locator('.text-3xl.font-bold.text-purple-600');
    await expect(tvMatches).toHaveText('1');

    const liveMatches = page.locator('.text-3xl.font-bold.text-green-600');
    await expect(liveMatches).toHaveText('0');
    
    await expect(page.getByText('Lakers')).toBeVisible();
    await expect(page.getByText('Basketball')).toBeVisible();
  });

  test('should allow deleting a match', async ({ page }) => {
    // Add a match
    await page.getByRole('link', { name: 'Log a Match' }).click();
    await page.getByTestId('input-home-team').fill('Team A');
    await page.getByTestId('input-away-team').fill('Team B');
    await page.getByTestId('submit-match').click();

    // Verify it's there
    await expect(page.getByText('Team A')).toBeVisible();

    // Delete it
    // We need to find the delete button. Since there is only one match, we can find by role button with title or testid.
    // I added data-testid={`delete-match-${match.id}`} but id is random.
    // I can use title="Delete match"
    await page.getByTitle('Delete match').click();

    // Verify it's gone
    await expect(page.getByText('Team A')).not.toBeVisible();
    await expect(page.getByText('No matches tracked yet')).toBeVisible();
  });
});
