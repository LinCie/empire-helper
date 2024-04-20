import { NextResponse } from "next/server";
import { headers } from "next/headers";
import ytdl from "ytdl-core";
import fs from "fs";

interface PostRequestBody {
  url: string | null;
  title: string | null;
}

export async function POST(req: Request) {
  try {
    const { url, title }: PostRequestBody = await req.json();

    const heads = headers();

    const host = heads.get("x-forwarded-host");

    if (!url || !title)
      return NextResponse.json(
        { message: "Please provide url and/or title" },
        { status: 401 }
      );

    ytdl(url, { quality: "highestaudio" }).pipe(
      fs.createWriteStream(`public/audio/${title}.mp3`)
    );

    console.log(`${title}.mp3 has been created`)

    const deleteFile = () => {
      setTimeout(() => {
        fs.unlinkSync(`public/audio/${title}.mp3`);
      }, 5 * 60 * 1000);
      console.log(`${title}.mp3 has been deleted`)
    };

    deleteFile();

    return NextResponse.json(
      { url: `${host}/api/download/${encodeURI(title)}` },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error", err },
      { status: 400 }
    );
  }
}
