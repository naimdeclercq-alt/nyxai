document.addEventListener('DOMContentLoaded', () => {
    const sendBtn = document.getElementById('send-btn');
    const promptInput = document.getElementById('prompt');
    const messagesContainer = document.getElementById('messages');
    const micBtn = document.getElementById('mic-btn');

    if (sendBtn && promptInput) {
        sendBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêche de refocus le champ de texte au clic
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

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });

            const data = await response.json();
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

    // Gestion de la dictée vocale
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'fr-FR';
        recognition.interimResults = false;

        if (micBtn) {
            micBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                recognition.start();
            });
        }

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            promptInput.value = transcript;
        };

        recognition.onerror = (event) => {
            console.error("Erreur de reconnaissance vocale :", event.error);
        };
    }
});