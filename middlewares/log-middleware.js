const logMiddleware = (request, res, next) => {
  console.log(
    `${new Date().toString()} - ${request.method} - ${request.url}  `,
    request.body
  );
  next();
};

module.exports = logMiddleware;
