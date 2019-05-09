const app = require('express')();
const mongoose = require('mongoose');
const user = require('./models/user');
const bodyParser = require("body-parser");
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 3333;
const db = mongoose.connection;

mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected with Database');
});

user.deleteMany({}, function(err){
  if (err) throw err;
  console.log("Datenbank sauber Captain!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const routeRegistration = require("./routes/registration");
const routeLogin = require("./routes/login");
app.use(routeRegistration);
app.use(routeLogin);

app.get('/', function(req, res) {
  res.render('login.ejs');
});

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on("disconnect", function(){
      console.log("a user disconnected");
  });
  
});

http.listen(port, function() {
  console.log('listening on *:3333');
});
