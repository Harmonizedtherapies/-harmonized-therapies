import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const isPortal = req.nextUrl.pathname.startsWith('/portal')
  const isLogin = req.nextUrl.pathname === '/portal'
  const isAuth = req.cookies.get('portal_auth')?.value === 'true'

  if (isPortal && !isLogin && !isAuth) {
    return NextResponse.redirect(new URL('/portal', req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/portal/:path+'],
}
