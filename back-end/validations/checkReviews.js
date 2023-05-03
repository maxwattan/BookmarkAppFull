// Middleware
const checkRequest = (req, res, next) => {
    bookmarks_id, reviewer, title, content, rating
    if (req.body && req.body.bookmark_id && req.body.reviewer && req.body.title && req.body.content && req.body.rating) {
        return next();
    } else {
        res.status(400).json({ error: "Body is missing information or body is not present at all"})
    }
};

const checkId = (req, res, next) => {
    if (req.params.id) {
        next();
    } else {
        res.status(400).json({ error: "Body is missing information or body is not present at all"});
    };
};

const validateURL = (req, res, next) => {
    if (
      req.body.url.substring(0, 7) === "http://" ||
      req.body.url.substring(0, 8) === "https://"
    ) {
      return next();
    } else {
      res
        .status(400)
        .json({ error: `You forgot to start your url with http:// or https://` });
    };
  };

module.exports = {
    checkRequest,
    checkId,
    validateURL
}