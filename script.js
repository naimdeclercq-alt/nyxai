document.addEventListener('DOMContentLoaded', () => {
    // Recherche flexible pour trouver tes éléments même si les ID diffèrent
    const promptInput = document.getElementById('prompt') || document.querySelector('textarea');
    const sendBtn = document.getElementById('send-btn') || document.querySelector('button');
    const messagesContainer = document.getElementById('messages') || document.querySelector('.chat-messages');

    // Diagnostic dans la console du navigateur (Appuie sur F12 pour voir)
    console.log("Champ texte détecté :", promptInput);
    console.log("Bouton d'envoi détecté :", sendBtn);
    console.log("Conteneur messages détecté :", messagesContainer);

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
    } else {
        console.error("ATTENTION : Le bouton d'envoi ou le champ de texte est introuvable par le script !");
    }

    async function sendMessage() {
        const text = promptInput.value.trim();
        if (!text) return;

        appendMessage(text, 'user-message');
        promptInput.value = '';

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
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