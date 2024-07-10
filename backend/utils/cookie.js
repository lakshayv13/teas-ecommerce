function setCookie(res, key, value) {
  res.cookie(key, value, {
    httpOnly: true,
    sameSite: "Lax",
  });
}

function deleteCookie(res, key) {
  res.clearCookie(key);
}

module.exports = {
  setCookie,
  deleteCookie,
};
