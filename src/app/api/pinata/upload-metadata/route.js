import { NextResponse } from "next/server";
import axios from "axios";
import FormData from "form-data";

export async function POST(req) {
  try {
    const body = await req.json();
    const { address, title, description, github, liveDemo, skills } = body;

    const metadata = {
      name: title,
      description,
      image: "ipfs://bafkreifvvhwxhwqhztgoddffktbhxi5etyxdpz37gga6gzvhktc4e75zxa",
      attributes: [
        { trait_type: "GitHub Repository", value: github },
        { trait_type: "Live Demo / Portfolio Link", value: liveDemo },
        { trait_type: "Skills & Technologies", value: skills.join(", ") },
      ],
    };

    const blob = Buffer.from(JSON.stringify(metadata));
    const formData = new FormData();
    formData.append("file", blob, { filepath: `${address+"+"+title}.json` });

    // 👇 attach Pinata options (includes groupId)
    formData.append(
      "pinataOptions",
      JSON.stringify({
        groupId: process.env.PINATA_GROUP_ID,
      })
    );

    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        headers: {
          Authorization: `Bearer ${process.env.PINATA_JWT}`,
          ...formData.getHeaders(),
        },
      }
    );

    return NextResponse.json({
      success: true,
      ipfsHash: res.data.IpfsHash,
      url: `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`,
    });
  } catch (err) {
    console.error("Error uploading:", err.response?.data || err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
