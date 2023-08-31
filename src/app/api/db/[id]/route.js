import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';
export async function GET(request, { params }) {
    console.log(params, 'params');
    const res = await prisma.User.findUnique({
        where: {
            isDelete: 0,
            id: params.id
        },
    });
    return NextResponse.json({
        status: 200,
        data: res,
        msg: '操作成功'
    });
}
export async function PUT(request, { params }) {
    console.log(params, 'params');
    const data = await request.json();
    console.log(data, 'data');
    const updateUser = await prisma.User.update({
        where: {
            id: params.id,
        },
        data: data,
    })
    console.log(updateUser, 'updateUser');
    return NextResponse.json({
        status: 200,
        data: updateUser.id,
        msg: '编辑成功'
    });
}
export async function DELETE(request, { params }) {
    console.log(params, 'params');
    const deleteUser = await prisma.user.delete({
        where: {
            id: params.id,
        },
    })
    console.log(deleteUser, 'deleteUser');
    return NextResponse.json({
        status: 200,
        data: deleteUser.id,
        msg: '删除成功'
    });
}