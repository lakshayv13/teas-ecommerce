function getAuthPayload(tokenHeader) {
  const token = tokenHeader.split(" ")[1];
  const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
  return tokenPayload;
}

module.exports = {
  getAuthPayload,
};
