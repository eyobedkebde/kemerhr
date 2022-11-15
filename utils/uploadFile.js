const multer = require("multer");

// File Checker
const checkFileType = require("./fileFilters");

// Upload
const upload = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 1024 * 1024 }, // File size limit: 2MB
  fileFilter: function (req, file, callBack) {
    checkFileType(req, file, callBack);
  },
});

// Export
module.exports = upload;