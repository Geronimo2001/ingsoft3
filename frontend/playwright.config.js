import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  // QA puede estar dormido al ejecutar las pruebas manualmente.
  timeout: 120_000,
  expect: { timeout: 15_000 },
  workers: 1,
  forbidOnly: Boolean(process.env.CI),
  retries: 1,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    // La integración usa API_BASE_URL; esta dirección es para el navegador.
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:3000',
    browserName: 'chromium',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure'
  }
});
