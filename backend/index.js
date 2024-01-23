const express = require('express');
const routes = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
// const paletteRoutes = require('./routes/palette.route');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);
// routes.use('/', paletteRoutes);
// routes.use('/', authRoutes);
// routes.use('/', newsRoutes);
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Server is running...');
});

app.listen(process.env.PORT || PORT, (err) => {
    if (!err) {
        // eslint-disable-next-line no-console
        console.log('server started!');
    }
});