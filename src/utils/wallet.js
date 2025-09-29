"use server";

export function getWalletFromCookie(req) {
  const cookie = req.cookies.get("wallet")?.value;
  return cookie || null;
}