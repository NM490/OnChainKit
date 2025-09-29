import bs58 from "bs58";

export function addressToSlug(address) {
  return bs58.encode(Buffer.from(address.slice(2), "hex"));
}

export function slugToAddress(slug) {
  return "0x" + Buffer.from(bs58.decode(slug)).toString("hex");
}
