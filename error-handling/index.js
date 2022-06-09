module.exports = (app) => {
  app.use((req, res, next) => {
    // this middleware runs whenever requested page is not available
    res.status(404).json({ errorMessage: "This route does not exist" });
  });

  app.use((err, req, res, next) => {
    // whenever you call next(err), this middleware will handle the error
    // always logs the error
    // console.error("ERROR", req.method, req.path, err);

    // only render if the error ocurred before sending the response
    if (!res.headersSent) {
      const errors = [];

      if (!err.errors) {
        err.errors = [err];
      }

      for (let e in err.errors) {
        e = err.errors[e];

        if (e.kind === `ObjectId`) {
          errors.push(`No such character with id: ${req.charId}`);
        } else if (e.kind !== undefined) {
          errors.push(`${e.stringValue} is not a valid ${e.path}`);
        }
      }

      if (errors.length) {
        res.status(400).json({ errors });
      } else {
        res
          .status(500)
          .json({
            errorMessage: "Internal server error. Check the server console",
          });
      }
    }
  });
};
