const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const db = require('./db.js');
const next = require('next');
const multer = require('multer');
const path = require('path');
const app = express();
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ userId }, 'your-secret-key', { expiresIn: '1h' });
};


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession({ secret: 'mySecretKey', resave: false, saveUninitialized: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(cookieParser('mySecretKey'));
app.use(passport.initialize());
app.use(passport.session());
require("./passportconfig.js")(passport);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/pdf'); // Updated destination directory
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Handle preflight requests
app.options('/login', cors());

app.get('/', (req, res) => {
    res.send('server Live');
});

app.post('/login', cors({
    origin: 'http://localhost:3000',
    credentials: true
}), (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { throw err; }
        if (!user) { res.send('No user exists'); }
        if (user) {
            req.login(user, (err) => {
                if (err) { throw err; }
                res.send("user logged in");
                console.log(user);
            });
        }
    })(req, res, next);
});

app.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    const { filename, path: absolutePath } = req.file;
    const customFileName = req.body.customFileName;

    // Extract the relative path from the absolute path
    const relativePath = path.relative('./public/pdf', absolutePath);

    const sql = 'INSERT INTO qb_pdf_storage (file_name, path) VALUES (?, ?)';
    const [result] = await db.execute(sql, [customFileName || filename, relativePath]);

    console.log('File information inserted into database:', result);
    res.json({ success: true, message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error in /upload route:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

app.post('/upload2', upload.single('pdf'), async (req, res) => {
  try {
    const { filename, path: absolutePath } = req.file;
    const customFileName = req.body.customFileName;

    // Extract the relative path from the absolute path
    const relativePath = path.relative('./public/pdf', absolutePath);

    const sql = 'INSERT INTO ed_pdf_storage (file_name, path) VALUES (?, ?)';
    const [result] = await db.execute(sql, [customFileName || filename, relativePath]);

    console.log('File information inserted into database:', result);
    res.json({ success: true, message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error in /upload2 route:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});




// Fetch files from database
app.get('/getFiles', (req, res) => {
  const sql = 'SELECT * FROM qb_pdf_storage';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching files from database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result);
    }
  });
});

app.get('/getFiles2', (req, res) => {
  const sql = 'SELECT * FROM ed_pdf_storage';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching files from database:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(result);
    }
  });
});



app.get('/api/user', cors(), (req, res) => {
  res.send(req.user);
});

app.get('/getUser', cors(), (req, res) => {
    res.send(req.user);
});

app.listen(3001, () => {
    console.log("server started");
});
