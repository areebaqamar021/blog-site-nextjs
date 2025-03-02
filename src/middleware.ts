import { NextResponse } from 'next/server'
import { auth } from './lib'

export const middleware = auth((request) => {
    const isAuthenticated = !!request.auth?.user?.email
    const pathname = request.nextUrl.pathname

    if (isAuthenticated && pathname === "/auth") {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
    } else if (!isAuthenticated && pathname.includes("dashboard")){
        return NextResponse.redirect(new URL("/auth", request.nextUrl))
    }
    return NextResponse.next()
})

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}