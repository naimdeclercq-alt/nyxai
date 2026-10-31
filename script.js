document.addEventListener('DOMContentLoaded', () => {
  const promptInput = document.getElementById('prompt');
  const sendBtn = document.getElementById('sendBtn');
  const messagesContainer = document.getElementById('messages');
  const welcome = document.getElementById('welcome');
  const modelSelect = document.getElementById('modelSelect');

  async function sendMessage() {
    const text = promptInput.value.trim();
    if (!text) return;

    const selectedMode = modelSelect ? modelSelect.value : 'Nyx General';

    if (welcome) {
      welcome.remove();
    }

    appendMessage('user', text);
    promptInput.value = '';
    promptInput.style.height = 'auto';

    const typingElement = appendMessage('ai', 'Nyx AI réfléchit...');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, mode: selectedMode })
      });

      const data = await response.json();
      
      if (data && data.reply) {
        typingElement.querySelector('.message-body').lastChild.textContent = data.reply;
      } else {
        typingElement.querySelector('.message-body').lastChild.textContent = "Erreur : Réponse vide reçue du serveur.";
      }
    } catch (error) {
      console.error('Erreur de requête API:', error);
      typingElement.querySelector('.message-body').lastChild.textContent = "Erreur de connexion avec le serveur.";
    }
  }

  function appendMessage(sender, text) {
    const row = document.createElement('div');
    row.className = `message ${sender === 'user' ? 'user' : ''}`;

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = sender === 'user' ? '👤' : '✦';

    const body = document.createElement('div');
    body.className = 'message-body';

    const name = document.createElement('strong');
    name.textContent = sender === 'user' ? 'Toi' : 'NyxAI';

    const content = document.createElement('div');
    content.textContent = text;

    body.append(name, content);
    row.append(avatar, body);
    messagesContainer.appendChild(row);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return row;
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
  }

  if (promptInput) {
    promptInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }
});document.addEventListener('DOMContentLoaded', () => {
  const promptInput = document.getElementById('prompt');
  const sendBtn = document.getElementById('sendBtn');
  const messagesContainer = document.getElementById('messages');
  const welcome = document.getElementById('welcome');
  const modelSelect = document.getElementById('modelSelect');

  async function sendMessage() {
    const text = promptInput.value.trim();
    if (!text) return;

    const selectedMode = modelSelect ? modelSelect.value : 'Nyx General';

    if (welcome) {
      welcome.remove();
    }

    appendMessage('user', text);
    promptInput.value = '';
    promptInput.style.height = 'auto';

    const typingElement = appendMessage('ai', 'Nyx AI réfléchit...');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, mode: selectedMode })
      });

      const data = await response.json();
      
      if (data && data.reply) {
        typingElement.querySelector('.message-body').lastChild.textContent = data.reply;
      } else {
        typingElement.querySelector('.message-body').lastChild.textContent = "Erreur : Réponse vide reçue du serveur.";
      }
    } catch (error) {
      console.error('Erreur de requête API:', error);
      typingElement.querySelector('.message-body').lastChild.textContent = "Erreur de connexion avec le serveur.";
    }
  }

  function appendMessage(sender, text) {
    const row = document.createElement('div');
    row.className = `message ${sender === 'user' ? 'user' : ''}`;

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    avatar.textContent = sender === 'user' ? '👤' : '✦';

    const body = document.createElement('div');
    body.className = 'message-body';

    const name = document.createElement('strong');
    name.textContent = sender === 'user' ? 'Toi' : 'NyxAI';

    const content = document.createElement('div');
    content.textContent = text;

    body.append(name, content);
    row.append(avatar, body);
    messagesContainer.appendChild(row);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return row;
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
  }

  if (promptInput) {
    promptInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }
});