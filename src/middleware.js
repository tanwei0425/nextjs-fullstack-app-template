import { NextResponse } from 'next/server';

export function middleware(request) {
    // Clone the request headers and set a new header `x-hello-from-middleware-req`
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-hello-from-middleware-req', 'hello');

    // You can also set request headers in NextResponse.rewrite
    const response = NextResponse.next({
        request: {
            // New request headers
            headers: requestHeaders,
        },
    });

    // Set a new response header `x-hello-from-middleware-res`
    response.headers.set('x-hello-from-middleware-res', 'hello');
    return response;
}
