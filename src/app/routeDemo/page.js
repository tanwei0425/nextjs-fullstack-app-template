"use client"
import { Button, Space } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
function RouteDemo() {
    const router = useRouter()
    return (
        <main>
            <Space>
                <Link href={`/`} >
                    <Button type="primary" >返回首页</Button>
                </Link>
                <Link href={`/routeDemo/linkRoute/1`} >
                    <Button type="primary" >link跳转传参1</Button>
                </Link>
                <Link href={`/routeDemo/linkRoute?id=1&defaultValue=Pear,Apple`} >
                    <Button type="primary" >link跳转传参2</Button>
                </Link>
                <Button type="primary" onClick={() => router.push(`/routeDemo/useRoute/1`)} >useRouter跳转传参数1</Button>
                <Button type="primary" onClick={() => router.push('/routeDemo/useRoute?id=1&defaultValue=Pear,Apple')} >useRouter跳转传参数2</Button>
                <Button type="primary" onClick={() => router.push('/routeDemo/parallelRoute')} >并行路由</Button>
            </Space>
        </main>
    );
}
export default RouteDemo;
