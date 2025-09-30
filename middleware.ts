import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
export async function middleware(req: NextRequest) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("adminToken")?.value;
  if (!token) {
    return NextResponse.json({ message: "Token not provided" }, { status: 401 });
  }
  try {
    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (e: any) {

    return new NextResponse(
      JSON.stringify({ msg: "token not provided probably" }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    );
  }
}
export const config = {
  matcher: [
    "/api/blog/create",
    "/api/blog/delete-blog",
    "/api/blog/edit-blog",
    "/admin/dashboard",
    "/admin/edit-blog"
  ],
};