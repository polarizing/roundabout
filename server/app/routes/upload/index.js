var router = require('express').Router();
module.exports = router;

var multer = require('multer');
var path = require('path');
var fs = require('fs')

var uploading = multer({
  dest: path.resolve(__dirname, '../../../public/uploads')
})


router.post('/upload', uploading.single('image'), function(req, res) {
  console.log(__dirname, req.file)
  var currentPath = req.file.path;
  var ext = req.file.originalname.split(".").pop();
  var newPath = currentPath + '.' + ext;

  //fs.renameSync(currentPath, newPath);

  res.send(newPath)
})
