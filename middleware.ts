import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    console.log(`[Middleware LOG] ${request.method} ${request.nextUrl.pathname}`);
    return NextResponse.next();
}
