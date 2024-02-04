require('dotenv').config();
const express = require('express');
var path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const getDatatFromOpenAI = require('./utils/getDataFromOpenAI');
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const PORT = 3000;
app.use( express.static( "public" ) );
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

io.on('connection', (socket) => {
    const roomId = uuidv4();
    
    // eslint-disable-next-line no-console
    console.log('socket-id || room-id :: ', socket.id,"||", roomId);
    
    socket.emit('joinRoom', roomId); 

    socket.on('user message', async (msg) => {
        socket.join(roomId); 
        let chatbotReply = await getDatatFromOpenAI(msg);
        io.to(roomId).emit('user message', chatbotReply);
    });

    socket.on('disconnect', () => {
        console.log("Closed roomId", roomId);
        socket.leave(roomId);
    });
    
});

app.get('/', (req, res) => {
    res.render('index.ejs');
});

server.listen(process.env.PORT || PORT, (err) => {
    if (!err) {
        // eslint-disable-next-line no-console
        console.log('server started!');
    }
});