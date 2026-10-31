document.addEventListener('DOMContentLoaded', () => {
    const promptInput = document.getElementById('prompt') || document.querySelector('textarea');
    const sendBtn = document.getElementById('send-btn') || document.querySelector('button');
    const messagesContainer = document.getElementById('messages') || document.querySelector('.chat-messages');

    if (sendBtn && promptInput) {
        sendBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sendMessage();
        });

        promptInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    async function sendMessage() {
        const text = promptInput.value.trim();
        if (!text) return;

        appendMessage(text, 'user-message');
        promptInput.value = '';

        // Récupère la langue du PC/Navigateur (ex: "fr-FR" ou "en-US")
        const userLanguage = navigator.language || navigator.userLanguage || 'fr-FR';

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                // On envoie le message ET la langue détectée du PC
                body: JSON.stringify({ 
                    message: text, 
                    language: userLanguage 
                })
            });

            const data = await response.json();
            appendMessage(data.reply || "Pas de réponse reçue.", 'ai-message');
        } catch (error) {
            console.error("Erreur serveur :", error);
            appendMessage("Erreur de communication avec le serveur.", 'ai-message');
        }
    }

    function appendMessage(text, className) {
        if (!messagesContainer) return;
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${className}`;
        msgDiv.textContent = text;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
});
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
let deferredPrompt;
const installBtn = document.getElementById('install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
    // Empêche Chrome d'afficher sa bannière automatique
    e.preventDefault();
    // Stocke l'événement pour l'utiliser plus tard
    deferredPrompt = e;
    // Affiche ton bouton personnalisé
    if (installBtn) {
        installBtn.style.display = 'block';

        installBtn.addEventListener('click', async () => {
            // Cache le bouton
            installBtn.style.display = 'none';
            // Affiche la invite d'installation native
            deferredPrompt.prompt();
            // Attend de voir si l'utilisateur a accepté ou refusé
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('Utilisateur a accepté l\'installation PWA');
            }
            deferredPrompt = null;
        });
    }
});