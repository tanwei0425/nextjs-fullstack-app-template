"use client"
import { Button, Checkbox } from 'antd';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
function LinkRoute() {
    const router = useRouter()
    const params = useParams()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const options = [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange' },
    ];
    console.log(router, 'router');
    console.log(params, 'params');
    console.log(pathname, 'pathname');
    const id = searchParams.get('id');
    const defaultValue = searchParams.get('defaultValue')
    console.log(id, 'id');
    console.log(defaultValue, 'defaultValue');
    return (
        <main>
            <h1>获取参数{id}</h1>
            <h1>获取参数{defaultValue}</h1>
            <Button type="primary" onClick={() => router.back()} >返回routeDemo</Button>
            <Checkbox.Group options={options} defaultValue={defaultValue} />
        </main>
    );
}
export default LinkRoute;
