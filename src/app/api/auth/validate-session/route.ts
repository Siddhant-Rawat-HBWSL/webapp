import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/utils/prisma/prisma';

export async function POST(req: NextRequest, res : NextResponse) {
    try {
        // Parse JSON body
        const body = await req.json();
        const user = body.user;
        const token = body.token;

        if (!user || !token) {
            return NextResponse.json({ authenticated: false }, { status: 400 });
        }

        const session = await prisma.session.findFirst({
            where: {
                AND: [
                    { user: user },
                    { token: token }
                ]
            }
        });
        return NextResponse.json({ authenticated: !!session });

    } catch (error) {
        console.error("Error in validate session:", error);
        return NextResponse.json({ authenticated: false }, { status: 500 });
    }
}
