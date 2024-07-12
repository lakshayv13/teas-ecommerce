function setCookie(res, key, value) {
  res.cookie(key, value, {
    httpOnly: true,
    sameSite: "Lax",
  });
}

function deleteCookie(res, key) {
  res.clearCookie(key);
  res.user = "";
}

module.exports = {
  setCookie,
  deleteCookie,
};
