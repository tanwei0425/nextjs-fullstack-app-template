import prisma from '@/libs/prismadb';
import { headers } from 'next/headers';
import { NextResponse, } from 'next/server';
export async function GET(request) {
    const headersList = headers();
    const { searchParams } = new URL(request.url);
    const current = searchParams.get('current') || 1;
    const pageSize = searchParams.get('pageSize') || 10;
    // 测试中间件req
    const reqMiddleware = headersList.get('x-hello-from-middleware-req')
    console.log(reqMiddleware, 'reqMiddleware');
    const users = await prisma.User.findMany({
        skip: (current - 1) * pageSize,
        take: +pageSize,
        orderBy: { updatedAt: 'desc', },
        where: { isDelete: 0, },
    });
    const allUsers = await prisma.user.findMany({ where: { isDelete: 0, } })
    return NextResponse.json({
        status: 200,
        data: {
            list: users,
            total: allUsers.length,
        },
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