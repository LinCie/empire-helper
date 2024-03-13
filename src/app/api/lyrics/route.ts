import { NextResponse } from "next/server";
// @ts-ignore
import { getLyrics } from "genius-lyrics-api";

export async function GET(req: Request) {
  try {
    const requestUrl = new URL(req.url);
    const params = requestUrl.searchParams;

    const title = params.get("title");
    const artist = params.get("artist");

    const options = {
      apiKey: process.env.GENIUS_API,
      title: title || " ",
      artist: artist || " ",
      optimizeQuery: true,
    };

    const lyrics: string | any = await getLyrics(options);

    if (typeof lyrics == "string")
      return NextResponse.json({ lyrics }, { status: 200 });

    return NextResponse.json({ message: "No Lyrics Found" }, { status: 404 });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal Server Error", err },
      { status: 400 }
    );
  }
}
