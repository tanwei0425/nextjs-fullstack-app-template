"use client"
import { Button } from 'antd';
import { useParams, usePathname, useRouter } from 'next/navigation';
function UseRouteDetails() {
    const router = useRouter()
    const params = useParams()
    const pathname = usePathname()
    console.log(router, 'router');
    console.log(params, 'params');
    console.log(pathname, 'pathname');
    return (
        <main>
            <h1>获取参数{params?.id}</h1>
            <Button type="primary" onClick={() => router.back()} >返回routeDemo</Button>
        </main>
    );
}
export default UseRouteDetails;
