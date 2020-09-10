const express = require('express')
const multer = require('multer')
const cors = require('cors')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    var fileFormat = (file.originalname).split(".");
    var ext = fileFormat[fileFormat.length - 1];
    console.log(fileFormat, ext);
    cb(null, file.fieldname + '-' + uniqueSuffix + "." + ext); 
  }
})
const upload = multer({ storage: storage }).array('file', 5)

const app = express()
app.use(express.static('assets'));
app.use(cors());

app.post('/upload', (req, res) => {
  upload(req, res, err => {
    if (err) {
      console.error(err)
      return res.json({ success: false })
    }
    console.log('File uploaded', req.files)
    res.json({ success: true, files: req.files })
  })
})
app.get('/', (req, res) => {
  res.sendFile( __dirname + '/index.html');
});

const server = app.listen(3030, () => {
  console.log('Listening on port %d', server.address().port)
})
