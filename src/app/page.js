import { Button } from 'antd';
import Link from 'next/link';

/**
 * 配置路由片段
 */
export const dynamic = 'auto';
export const dynamicParams = true;
export const revalidate = false;


function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      首页
      <Link href={`/routeDemo`}  >
        <Button type="primary" className='m-3' >跳转routeDemo</Button>
      </Link>
      <Link href={`/apiDemo`}  >
        <Button type="primary" className='m-3' >跳转apiDemo</Button>
      </Link>
      <Link href={`/systemInfo`}  >
        <Button type="primary" className='m-3' >跳转systemInfo （node原生能力）</Button>
      </Link>
      <Link href={`/db`}  >
        <Button type="primary" className='m-3' >跳转db</Button>
      </Link>
    </main>
  );
}
export default Home;
