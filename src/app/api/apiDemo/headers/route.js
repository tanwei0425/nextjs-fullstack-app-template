import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';
export async function GET() {
    const cookieStore = cookies();
    const PHPSESSID = cookieStore.get('PHPSESSID');
    const headersList = headers();
    const reqToken = headersList.get('req-token')
    return NextResponse.json({
        status: 200,
        data: [],
        msg: '操作成功'
    }, {
        headers: {
            'token': `token=${PHPSESSID.value + reqToken}`,
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    });
}