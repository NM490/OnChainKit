import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { cid } = await req.json();

    const res = await fetch(`https://api.pinata.cloud/data/pinList?hashContains=${cid}`, {
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
    });

    const data = await res.json();

    const isPinned = data.count > 0 && data.rows.some((row) => row.ipfs_pin_hash === cid);

    return NextResponse.json({ success: isPinned });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message });
  }
}