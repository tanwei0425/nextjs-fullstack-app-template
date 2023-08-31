import { NextResponse, } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    console.log(id, 'id');
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
    const data = await res.json();
    return NextResponse.json({
        status: 200,
        data,
        msg: '操作成功'
    });
}
export async function POST(request) {
    const res = await request.json();
    console.log(res, 'res');
    return NextResponse.json({
        status: 200,
        data: res,
        msg: '添加成功'
    });
}
