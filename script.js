const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('Quel est votre nom ?')
appendMessage('Vous avez rejoind le chat')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(`${data.name} : ${data.message}`)//affichage du message dans la div 
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} s'est déconnecter`)//deconnecter l'utilisateur du chat
})

socket.on('user-connected', name => {
    appendMessage(`${name} est connecter`)//connection d'utilisateur dans la div
})

messageForm.addEventListener('submit', e => {
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`Vous : ${message}`)
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageContainer.append(messageElement)
}