const jwt = require("jsonwebtoken");

function getAuthPayload(token) {
  const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
  return tokenPayload;
}

module.exports = {
  getAuthPayload,
};
