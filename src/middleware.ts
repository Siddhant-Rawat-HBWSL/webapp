import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest, res: NextResponse) {
    const currentUser = req.cookies.get('user')?.value;
    console.log('CURRENT USER: ',currentUser);
    if (currentUser) {
        const response = await fetch(new URL('/api/auth/validate-session', req.url), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: currentUser,
        });

        const { authenticated } = await response.json();

        if (authenticated) {
            if (req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register')) {
                return NextResponse.redirect(new URL('/', req.url));
            }
        } 
        // else {
        //     if (!(req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register'))) {
        //         return NextResponse.redirect(new URL('/login', req.url));
        //     }
        // }
    } 
    // else {
    //     if (!(req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/register'))) {
    //         return NextResponse.redirect(new URL('/login', req.url));
    //     }
    // }
}

export const config = {
    matcher: ['/', '/login', '/register'],
};
