module.exports = (req, res, next) => {
  console.log(typeof req.user !== "undefined", req.user);
  if (typeof req.user === "undefined") {
    return res.status(401).send({ error: "You must log in!" });
  }
  next();
};
