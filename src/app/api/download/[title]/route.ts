import { NextResponse } from "next/server";
import { readFile } from "fs/promises";

interface GetParams {
  params: {
    title: string;
  };
}

export async function GET(req: Request, { params }: GetParams) {
  try {
    const buffer = await readFile(
      `public/audio/${decodeURI(params.title)}.mp3`
    );

    const headers = new Headers();
    headers.append(
      "Content-Disposition",
      `attachment; filename="${decodeURI(params.title)}.mp3"`
    );
    headers.append("Content-Type", "audio/mpeg");

    return new Response(buffer, {
      headers,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error", err },
      { status: 400 }
    );
  }
}
