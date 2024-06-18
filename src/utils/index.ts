import {jwtDecode}from "jwt-decode";

interface DecodedToken {
  exp: number;
}

export const isTokenExpired = (token: string | null) => {
  if (!token) return true;
  const decoded: DecodedToken = jwtDecode(token);
  const now = Date.now() / 1000;
  return decoded.exp < now;
};
