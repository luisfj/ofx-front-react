import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.info('-----MIDDLEWARE------' + pathname)
    if (pathname !== '/' 
        && !request.cookies.has("next-auth.session-token") 
        && !request.cookies.has("next-auth.session-token.1")
        && !request.cookies.has("Secure-next-auth.session-token.0")
        && !request.cookies.has("Secure-next-auth.session-token.1")
    ) {
        console.warn('-----MIDDLEWARE Block, no authenticate------' + pathname)
        return NextResponse.redirect(new URL('/api/auth/signin', request.url));
    }
    // Clone the request headers and set a new header `x-path`
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-path', pathname);

    // You can also set request headers in NextResponse.next
    const response = NextResponse.next({
        request: {
            // New request headers
            headers: requestHeaders,
        },
    })

    // Set a new response header `x-path`
    response.headers.set('x-path', pathname)
    return response
}

// export const config = { matcher: ["/u(.*)"] }
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|static|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}