export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "projects.json");
    let projects = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      projects = JSON.parse(fileData);
    }
    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const data = await req.json();
    const filePath = path.join(process.cwd(), "data", "projects.json");
    let projects = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      projects = JSON.parse(fileData);
    }
    projects.unshift(data);
    fs.writeFileSync(filePath, JSON.stringify(projects, null, 2));
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 });
  }
}
