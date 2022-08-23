module.exports = function (req, res, next) {
  const consumerKey = req.header("consumerKey");

  try {
    req.header = consumerKey;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Consumer Key ." + ex);
  }
};
