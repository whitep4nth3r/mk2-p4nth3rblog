function initSentry(buildVersion) {
  window.sentryOnLoad = function () {
    Sentry.init({
      dsn: "https://929e6ff57c7961dfe12ee694f8a40dd6@o4506044970565632.ingest.sentry.io/4506593553088512",
      release: `mk2-p4nth3rblog@${buildVersion}`,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
      ],

      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,

      // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: [
        "localhost",
        /^https:\/\/whitep4nth3r\.com\/api/,
      ],

      // Capture Replay for 10% of all sessions,
      // plus for 100% of sessions with an error
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  };
}
