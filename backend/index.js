const express = require('express');
const port = 5000;

const app = express();
const bodyParser = require('body-parser');


require('./db');
require('./models/Admin');
require('./models/AdminProfile');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminProfileRoute')
const requireToken = require('./middleware/AuthTokenRequired');
app.use("/uploads",express.static("uploads"));
app.use(express.urlencoded({limit: '50mb',extended: true}));
app.use(bodyParser.json());
app.use(authRoutes);
app.use(adminRoutes);
const Cors = require('cors');
app.use(Cors({
    origin:'http://localhost:5000'
}));

app.get('/', requireToken, (req, res) => {
    console.log(req.admin);
    res.send(req.admin);
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})