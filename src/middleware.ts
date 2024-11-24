import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ['/dashboard/:path*'];
const authRoutes = ['/login','/register'];

export async function middleware ( request : NextRequest ){

    const path = request.nextUrl.pathname;
    const token = request.cookies.get("authToken");

    if( protectedRoutes.includes(path) && !token ){
        NextResponse.redirect( new URL ('/login', request.url ));
    }

    if( authRoutes && token ){
        NextResponse.redirect( new URL ('/dashboard', request.url));
    }

    return NextResponse.next();

}

export const config = {
    matcher : [protectedRoutes,...authRoutes]
}