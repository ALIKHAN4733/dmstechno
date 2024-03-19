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
app.use(expressSession({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));


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
  passport.authenticate('local', async (err, user, info) => {
    if (err) { 
      return res.status(500).json({ error: 'An error occurred during authentication' }); 
    }
    if (!user) { 
      return res.status(401).json({ error: 'No user exists' });
    }
    req.login(user, async (err) => {
      if (err) { 
        return res.status(500).json({ error: 'An error occurred during login' }); 
      }

      // Extract user data and store it in MySQL database after login
      const { id, username, position, name, department } = user;
      const userData = { id, username, position, name, department };
      
      try {
        // Save userData to your database
        const sql = 'INSERT INTO users (id, username, position, name, department) VALUES (?, ?, ?, ?, ?)';
        await db.execute(sql, [id, username, position, name, department]);

        // Store user data in session storage
        req.session.userData = userData;
        console.log('User data stored in session storage:', req.session.userData);

        // Send back the user data to the client
        res.status(200).json({ message: "user logged in", userData: userData });
      } catch (error) {
        console.error('Error storing user data in database:', error);
        res.status(500).json({ error: 'Error storing user data in database' });
      }
    });
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



app.post('/api/meetings', async (req, res) => {
  try {
    console.log('Received request for /api/meetings with body:', req.body); // Log the request body to debug

    const { name, dateTime, actionPoints } = req.body;
    const [date, time] = dateTime.split('T');
    const actionPointsJson = JSON.stringify(actionPoints);

    const sql = 'INSERT INTO userdata.meetings (name, date, time, action_points) VALUES (?, ?, ?, ?)';
    await db.execute(sql, [name, date, time, actionPointsJson]);

    console.log('Meeting created successfully');
    res.status(200).json({ message: 'Meeting created successfully' });
  } catch (error) {
    console.error('Error creating meeting:', error);
    res.status(500).json({ error: 'Internal Server Error', detail: error.message });
  }
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

// This example assumes that you are using Express and have a connection to a database set up

app.get('/api/1meetings/:name', async (req, res) => {
    const sql = `select * from userdata.meetings where name = 'Meeting'`;
    const result = db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching files from database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(result);
        console.log(result);
      }
    });
  });


  app.get('/api/ppmmeetings/:name', async (req, res) => {
    const sql = `select * from userdata.meetings`;
    const result = db.query(sql, (err, result) => {
      if (err) {
        console.error('Error fetching files from database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.json(result);
        console.log(result);
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
