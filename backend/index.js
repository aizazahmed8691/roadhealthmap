const express = require('express');
const port = 5000;

const app = express();
const bodyParser = require('body-parser');


require('./db');
require('./models/Admin');
require('./models/AdminProfile');

const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminProfileRoute')
const feedBackRoutes = require('./routes/feedBackRoutes')
const requireToken = require('./middleware/AuthTokenRequired');
app.use("/uploads",express.static("uploads"));
app.use(express.urlencoded({limit: '50mb',extended: true}));
app.use(bodyParser.json());
app.use(authRoutes);
app.use(adminRoutes);
app.use(feedBackRoutes);
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000/settings',
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.get('/', requireToken, (req, res) => {
    console.log(req.admin);
    res.send(req.admin);
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/login');
      }
    });
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})