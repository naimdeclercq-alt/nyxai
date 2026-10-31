let deferredPrompt;
const installBtn = document.getElementById('install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    console.log("Événement beforeinstallprompt capturé avec succès !");
});

if (installBtn) {
    installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) {
            // Solution de contournement si l'événement natif n'est pas prêt
            alert("L'installation automatique n'est pas encore déclenchée par le navigateur. Sur mobile, utilise le menu de ton navigateur (les 3 points) et sélectionne 'Ajouter à l'écran d'accueil'.");
            return;
        }
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('Application installée');
        }
        deferredPrompt = null;
    });
}