document.addEventListener('DOMContentLoaded', function() {
  const chatToggle = document.querySelector('.chat-toggle');
  const chatWidget = document.querySelector('.chat-widget');
  const chatForm = document.getElementById('chatForm');
  const chatMessage = document.getElementById('chatMessage');
  const chatMessages = document.getElementById('chatMessages');
  const closeChat = document.querySelector('.close-chat');
  const chatLabel = document.querySelector('.chat-label');

  // Check if required elements exist
  if (!chatToggle || !chatWidget || !chatForm || !chatMessage || !chatMessages || !closeChat) {
    console.error('Missing required chat elements');
    return;
  }

  // Initialize translations
  const translations = {
    chatLabel: 'Live Chat',
    chatInitial: 'Hi there! I\'m here to help with any questions about MyTransport services. How can I assist you today?',
    chatLogistics: 'Our logistics service offers seamless support for your business needs. Would you like to know more?',
    chatDriver: 'You can view your driver dashboard after logging in.',
    chatDefault: 'I apologize, but I didn\'t understand that. Could you please rephrase or ask a different question?'
  };

  // Add translations
  if (chatLabel) {
    chatLabel.textContent = translations.chatLabel;
  }

  // Add initial welcome message
  const initialMessage = document.createElement('div');
  initialMessage.className = 'chat-message bot';
  initialMessage.textContent = translations.chatInitial;
  chatMessages.appendChild(initialMessage);

  // Open chat
  chatToggle.addEventListener('click', () => {
    chatWidget.classList.toggle('active');
    if (chatWidget.classList.contains('active')) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  });

  // Close chat
  closeChat.addEventListener('click', () => {
    chatWidget.classList.remove('active');
  });

  // Chat submit
  chatForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const userText = chatMessage.value.trim();
    if (!userText) return;

    // Add user message
    const userDiv = document.createElement('div');
    userDiv.className = 'chat-message user';
    userDiv.textContent = userText;
    chatMessages.appendChild(userDiv);

    // Clear input
    chatMessage.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Typing animation
    const typing = document.createElement('div');
    typing.className = 'typing-indicator';
    typing.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
    chatMessages.appendChild(typing);

    // Process message
    const lowerText = userText.toLowerCase();
    setTimeout(() => {
      typing.remove();
      const reply = document.createElement('div');
      reply.className = 'chat-message bot';

      if (lowerText.includes('hello') || lowerText.includes('hi')) {
        reply.textContent = translations.chatInitial;
      } else if (lowerText.includes('logistics')) {
        reply.textContent = translations.chatLogistics;
      } else if (lowerText.includes('driver')) {
        reply.textContent = translations.chatDriver;
      } else {
        reply.textContent = translations.chatDefault;
      }

      chatMessages.appendChild(reply);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);

    // Prevent spam
    chatMessage.disabled = true;
    setTimeout(() => {
      chatMessage.disabled = false;
    }, 1500);
  });

  // Handle Enter key
  chatMessage.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      chatForm.dispatchEvent(new Event('submit'));
    }
  });
});