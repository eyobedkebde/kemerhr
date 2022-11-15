const AppError = require('./ErrorHandler');

module.exports = (...fileTypes) => {
    return (req, res, next) => {
      if (fileTypes.length === 0) {
        return  next(new AppError("Please add allowed file types",400));
      }

      req.fileTypes = fileTypes;
      next();
    };
  };
  