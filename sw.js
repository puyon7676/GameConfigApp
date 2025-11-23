self.addEventListener('install', event => {
  console.log('Service Worker installed');
});

self.addEventListener('fetch', event => {
  // 通常のネットワーク処理（キャッシュなし）
});