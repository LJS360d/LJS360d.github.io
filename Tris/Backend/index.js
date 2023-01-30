const http = require('http').createServer(); 
const io =  require('socket.io') (http, {cors: {origin: "*"}});
http.listen(8080, () => console.log(`listening on port ${http.address().port}`))
const board = [];
resetBoard()

const users = new Map();
io.on('connection', (socket) =>{

    console.log(`User connected! ID:${socket.id}`)

    socket.on('message',(message,arg1,arg2)=>{
        console.log(users.get(socket.id),':', message,arg1); 
        if (message == 'username') {
            //arg1 -> String username
            users.set(socket.id,arg1)
            if(users.size%2==0)
            socket.emit('symbol','X')
            else socket.emit('symbol','O')
        }
        if(message == 'played'){
            //arg1 -> Number cellID (0-8)
            //arg2 -> String cellValue (X-O)
            board[arg1] = arg2;
            checkWin()
            io.emit('boardupdate',arg1+1,arg2)
            io.emit('turnupdate')
        }
        if(message == 'resetboard'){
            resetBoard()
        }
    })
})
function checkWin(){
    //8 out of (9! = 362.880)
    const winningCombinations = [
        [0, 1, 2],[3, 4, 5],[6, 7, 8],
        [0, 3, 6],[1, 4, 7],[2, 5, 8],
        [0, 4, 8],[2, 4, 6]
      ];
    for (const combination of winningCombinations) {
        if(board[combination[0]]==board[combination[1]] && board[combination[0]]==board[combination[2]] && board[combination[0]]!=null){
            io.emit('winner',board[combination[0]]);
            return true;
        } 
    }
    if(!board.includes(null)){
        io.emit('tie')
    }
}
function resetBoard() {
    for (let i = 0; i < 9; i++) {board[i] = null}
}
