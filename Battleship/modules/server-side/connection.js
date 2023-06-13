export const REPL_URL = "ws://battleship.ljs360d.repl.co"
//const LOCAL = "ws://127.0.0.1:8080"
export const socket = io(REPL_URL, {
    secure: true,
    transports: ['websocket'],
    origin: "unknown",
    query: {
        username: localStorage.getItem("username") ?? "User"
    }
}) 