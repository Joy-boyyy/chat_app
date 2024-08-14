const ErrorMiddle = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const messages = err.message || "Internal Server Error";
  console.error("Error stack:", err.stack);

  return res.status(statusCode).json(messages);
};

module.exports = ErrorMiddle;
