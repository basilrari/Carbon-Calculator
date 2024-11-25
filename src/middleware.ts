import { NextRequest, NextResponse } from "next/server";

export async function middleware ( request : NextRequest ){

    // const path = request.nextUrl.pathname;
    // const token = request.cookies.get("authToken");

    // if( path.startsWith('/decarb') && !token ){
    //     return NextResponse.redirect( new URL ('/login', request.url ));
    // }

    // if( (path == '/login' || path == '/register') && token ){
    //     return NextResponse.redirect( new URL ('/decarb/dashboard', request.url));
    // }

    // return NextResponse.next();

}

export const config = {
    matcher : ['/decarb/:path*',
               '/login',
               '/register'
            ]
}