import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    const { cid } = await req.json();

    const res = await fetch(`https://api.pinata.cloud/pinning/unpin/${cid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to unpin");
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
