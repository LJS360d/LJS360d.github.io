import {
  lockChatInput,
  receiveChatMessage,
  unlockChatInput,
} from './chat.js';
import { socket } from './connection.js';
import {
  disableOpponentSearch,
  enableOpponentSearch,
} from './opponent-search.js';

export const disconnect = socket.on('disconnect', function (reason) {
    console.log("Disconnected:",reason);
    receiveChatMessage("System", "You have been disconnected from the server: " + reason)
    sessionStorage.removeItem('match')
    lockChatInput()
    disableOpponentSearch()
})

export const connect = socket.on('connect', function () {
    console.log("Connected");
    sessionStorage.setItem("id",socket.id)
    unlockChatInput()
    enableOpponentSearch()
})

export const reconnect = socket.on('reconnect', function () {
    console.log("Reconnected");
    receiveChatMessage("System", "You have been reconnected")
    unlockChatInput()
    enableOpponentSearch()
});

export const reconnecting = socket.on('reconnecting', function () { 
    console.log("Reconnecting...");
})

export const reconnect_error = socket.on('reconnect_error', function () { 
    console.log("Reconnect error");
})

socket.on('unrecognised-message' , function(message){
    console.log("Unrecognised message: " + message);
})