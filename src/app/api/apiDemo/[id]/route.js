import { NextResponse } from 'next/server';
export async function PUT(request, { params }) {
    console.log(params, 'params');
    const res = await request.json();
    console.log(res, 'res');
    res.id = +params.id
    return NextResponse.json({
        status: 200,
        data: res,
        msg: '修改成功'
    });
}
export async function DELETE(request, { params }) {
    console.log(params, 'params');
    return NextResponse.json({
        status: 200,
        data: +params.id,
        msg: '删除成功'
    });
}