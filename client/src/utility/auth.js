const auth = () => {
  /* Implementation */
  let _token =
    JSON.parse(localStorage.getItem("REACT_TOKEN_AUTH") || "") || null;

  return {
    getToken,
    setToken,
    isLoggedIn,
  };
};

export default auth();
