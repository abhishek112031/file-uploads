const path = require('path');
const express = require('express');
const multer = require('multer');

const app = express();
const port = 3000;

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const uploads = multer({ storage: storage });

app.use(express.static(__dirname));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload', uploads.fields([
  { name: 'profilePic', maxCount: 1 },
  { name: 'idProof', maxCount: 1 },
  { name: 'cv', maxCount: 1 }
]), (req, res) => {
  const formData = req.body;
  const uploadedFiles = req.files;

  // Process form data and uploaded files
  // You can save the filenames in a database, process the data, etc.

  res.send('Files uploaded successfully');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
