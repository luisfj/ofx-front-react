import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export function middleware(request: NextRequest) {
    console.warn('-----MIDDLEWARE------',request.url, request.cookies)
    if (!request.cookies.has("next-auth.session-token") && !request.cookies.has('next-auth.session-token.1')) {
        console.warn('-----MIDDLEWARE Block, no authenticate------'+request.url)
        return NextResponse.redirect(new URL('/api/auth/signin', request.url));
    }
}

export const config = { matcher: ["/u(.*)"] }