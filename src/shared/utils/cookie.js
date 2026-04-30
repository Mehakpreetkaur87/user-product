// sets cookie
export const setTokenCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
  });
};

