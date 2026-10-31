document.addEventListener('DOMContentLoaded', () => {
    const sendButton = document.getElementById('send-btn'); // Remplace par l'ID réel de ton bouton
    const userInput = document.getElementById('user-input'); // Remplace par l'ID de ton champ de texte

    if (sendButton) {
        sendButton.addEventListener('click', async () => {
            const text = userInput.value.trim();
            if (!text) return;

            console.log("Envoi du message :", text);

            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: text })
                });

                const data = await response.json();
                console.log("Réponse reçue :", data.reply);
            } catch (error) {
                console.error("Erreur lors de l'envoi :", error);
            }
        });
    }
});