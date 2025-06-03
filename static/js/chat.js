window.onload = function () {
  const chat = document.getElementById("chatMessages");
  const welcome = "Hola, soy un chatbot experto en cáncer de pulmón. Hazme cualquier pregunta y haré lo posible por ayudarte.";
  chat.innerHTML += renderBotMessage(welcome);
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  if (!message) return;

  const chat = document.getElementById("chatMessages");
  chat.innerHTML += `<div class="message user"><span>${message}</span></div>`;
  input.value = '';

  fetch('http://0.0.0.0:8000/chatbot/response', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_input: message })
  })
  .then(response => response.json())
  .then(data => {
    chat.innerHTML += renderBotMessage(data.response);
    chat.scrollTop = chat.scrollHeight;
  })
  .catch(error => console.error('Error:', error));
}

function renderBotMessage(text) {
  return `
    <div class="message bot">
      <img src="/static/img/doctor_icon.png" alt="Doctor Icon">
      <span>${text}</span>
    </div>
  `;
}
