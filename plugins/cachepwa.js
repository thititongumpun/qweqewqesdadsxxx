workbox.routing.registerRoute(
  ({url}) => url.origin === 'https://api.thiti.live' &&
    url.pathname.startsWith('/api/v1/accounts/category'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'category-api-response',
    plugins: [
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.ExpirationPlugin({maxEntries: 1}),
    ]
  })
);