"use client"
import ParallRouteComp from '@/app/routeDemo/parallelRoute/components/parallRouteComp';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
function ParallelRoute(props) {
    console.log(props, 'props');
    const router = useRouter()
    return (
        <main>
            <Button type="primary" onClick={() => router.back()} >返回routeDemo</Button>
            <h1>引入公共组件：</h1>
            <ParallRouteComp id='1' />
        </main>
    );
}
export default ParallelRoute;
