import * as Sentry from '@sentry/react';

Sentry.init({
  // El DSN del navegador es publico: permite enviar eventos, no leer el proyecto.
  dsn: 'https://09acef2130337d8900aa0ed59f545ba4@o4512296027488256.ingest.us.sentry.io/4512296042496000',
  enabled: window.location.hostname === 'ingsoft3-front-prod-553q.onrender.com',
  environment: window.location.hostname,
  integrations: [Sentry.browserTracingIntegration()],
  tracePropagationTargets: [/^\/api\//],
  tracesSampleRate: 1.0,
  dataCollection: {
    userInfo: false,
    cookies: false,
    httpHeaders: false,
    httpBodies: [],
    urlQueryParams: false
  }
});
