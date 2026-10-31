// --- Gestionnaire d'envoi de message vers l'API ---
document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('send-btn');
    const promptInput = document.getElementById('prompt');
    const messagesContainer = document.getElementById('messages');

    if (sendBtn && promptInput) {
        // Envoi au clic sur le bouton
        sendBtn.addEventListener('click', sendMessage);

        // Envoi avec la touche Entrée (sans Shift)
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

        // 1. Afficher le message de l'utilisateur
        appendMessage(text, 'user-message');
        promptInput.value = '';

        try {
            // 2. Envoyer la requête au backend Node.js
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });

            const data = await response.json();
            
            // 3. Afficher la réponse de l'IA
            appendMessage(data.reply || "Pas de réponse reçue.", 'ai-message');
        } catch (error) {
            console.error("Erreur :", error);
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