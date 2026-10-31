let deferredPrompt;
const installBtn = document.getElementById('install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
    // Empêche le navigateur d'afficher sa propre bannière automatique
    e.preventDefault();
    // Stocke l'événement pour l'utiliser au clic
    deferredPrompt = e;
});

if (installBtn) {
    installBtn.addEventListener('click', async () => {
        if (!deferredPrompt) {
            alert("L'installation n'est pas encore disponible ou l'application est déjà installée.");
            return;
        }
        // Affiche la fenêtre native d'installation du navigateur
        deferredPrompt.prompt();
        // Attend le choix de l'utilisateur
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            console.log('Utilisateur a accepté l\'installation');
        }
        deferredPrompt = null;
    });
}