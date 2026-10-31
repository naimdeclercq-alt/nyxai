self.addEventListener('fetch', (event) => {
  // Laisse passer les requêtes normalement
});
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
        for(let registration of registrations) {
            registration.update();
        }
    });
}