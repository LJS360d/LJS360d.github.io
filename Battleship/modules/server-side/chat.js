import { username } from '../auth.js';
import { socket } from './connection.js';

const chatContainer = document.getElementById('chat');
const chat = document.getElementById('chat-messages')
const chatInput = document.getElementById('chat-msg-input');
const toggleChatButton = document.getElementById('toggle-chat-button');
chatInput.addEventListener('keydown', (event) => {
    const msg = chatInput.value
    if (event.key === 'Enter' && !event.shiftKey && msg.length > 0 && !msg.startsWith('/')) {
        sendChatMessage(msg);
        chatInput.value = '';
    }

    if (event.key === 'Enter' && !event.shiftKey && msg.startsWith('/')) {
        socket.send('command', msg);
        chatInput.value = '';
    }
});
toggleChatButton.addEventListener('click', function () {
    chatContainer.classList.toggle('hidden');
    this.textContent = this.textContent === 'Hide Chat' ? 'Show Chat' : 'Hide Chat';
})

socket.on('chat-message', receiveChatMessage);

export function receiveChatMessage(sender, message) {
    const msg = document.createElement('message');

    let previousMsg = chat.lastChild;
    while (previousMsg && !hasSender(previousMsg)) {
        previousMsg = previousMsg.previousSibling;
    }

    if (previousMsg && hasSender(previousMsg)) {
        const previousSender = getSender(previousMsg);
        const shouldAppendSenderSpan = previousSender !== sender;
        if (shouldAppendSenderSpan) {
            const senderSpan = document.createElement('span');
            senderSpan.textContent = sender;
            senderSpan.classList.add('sender');
            msg.appendChild(senderSpan);
        }
    } else {
        const senderSpan = document.createElement('span');
        senderSpan.textContent = sender;
        senderSpan.classList.add('sender');
        msg.appendChild(senderSpan);
    }

    const messageTextNode = document.createElement('span');
    messageTextNode.classList.add('message');
    messageTextNode.textContent = message;
    msg.appendChild(messageTextNode);
    scrollChatToBottom()
    chat.appendChild(msg);
    function hasSender(message) {
        const childNodes = Array.from(message.childNodes);
        return childNodes.some(node => node.classList.contains('sender'));
    }

    function getSender(message) {
        const childNodes = Array.from(message.childNodes);
        const senderNode = childNodes.find(node => node.classList.contains('sender'));
        return senderNode ? senderNode.textContent : '';
    }

}

function scrollChatToBottom() {
    const chatContainer = document.getElementById('chat')
    const isScrolledToBottom = chatContainer.scrollTop + chatContainer.clientHeight <= chatContainer.scrollHeight;

    // Only scroll to the bottom if not already scrolled up
    if (isScrolledToBottom) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

export function sendChatMessage(message) {
    if (!socket.connected || !sessionStorage.getItem('match')) {
        receiveChatMessage(`${username} (to themselves)`, message);
        return;
    }
    if (sessionStorage.getItem('match'))
        socket.send('chat-message', message);
}
export function hideChat() {
    chat.classList.add('hidden');
}

export function clearChat() {
    chat.innerHTML = '';
}

export function lockChatInput() {
    chatInput.disabled = true;
    chatInput.value = '';
    chatInput.classList.add('disabled')
}
export function unlockChatInput() {
    chatInput.disabled = false;
    chatInput.classList.remove('disabled')
}