import { configDefaults, defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
    exclude: [...configDefaults.exclude, 'e2e/**'],
    coverage: {
      provider: 'v8',
      reportOnFailure: true,
      reporter: ['text', 'html', 'json-summary', 'cobertura'],
      include: ['src/**/*.{ts,tsx}'],
      thresholds: { lines: 70, branches: 75 },
      // Las reglas y preparación de datos viven en módulos; React coordina su presentación.
      exclude: [
        'src/**/*.d.ts', 'src/**/*.test.{ts,tsx}', 'src/types/**',
        'src/main.tsx', 'src/App.tsx', 'src/components/**', 'src/pages/**'
      ]
    }
  }
});
