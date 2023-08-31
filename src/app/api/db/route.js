import prisma from '@/libs/prismadb';
import { NextResponse, } from 'next/server';

export async function GET() {
    const res = await prisma.User.findMany({
        orderBy: {
            createdAt: 'asc',
        },
        where: {
            isDelete: 0,
        },
    });
    return NextResponse.json({
        status: 200,
        data: res,
        msg: '操作成功'
    });
}

export async function POST(request) {
    const data = await request.json();
    const user = await prisma.User.create({
        data,
    })
    console.log(user, 'user');
    return NextResponse.json({
        status: 200,
        data: user.id,
        msg: '添加成功'
    });
}