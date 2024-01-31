require('dotenv').config();
const express = require('express');
var path = require('path');
const cors = require('cors');
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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

io.on('connection', (socket) => {
    // eslint-disable-next-line no-console
    console.log('User :: ', socket.id);
    socket.on('user message', async (msg) => {
        // eslint-disable-next-line no-console
        console.log('message: ' + msg);
        let chatbotReply = await getDatatFromOpenAI(msg);
        io.emit('user message', chatbotReply);
    })
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