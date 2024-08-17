class CustomError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}
const ErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internel Server Error";
  res.status(statusCode).json({ success: false, message });
};

export { CustomError, ErrorHandler };
