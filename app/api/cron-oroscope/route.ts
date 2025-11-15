import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const secret = req.headers.get("authorization")?.replace("Bearer ", "");

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }


  const prefetchUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/horoscope/prefetch?secret=${process.env.HORO_PREFETCH_SECRET}`;

  try {
    const res = await fetch(prefetchUrl);
    const json = await res.json();

    return NextResponse.json({
      ok: true,
      cron: "horoscope",
      result: json,
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e.message },
      { status: 500 }
    );
  }
}
