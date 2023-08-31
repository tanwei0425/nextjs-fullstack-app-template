"use client"
import { App, Button, Spin } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
function SystemInfo() {
    const { message } = App.useApp();
    const [loading, setLoading] = useState(false)
    const [info, setInfo] = useState({})
    const getSystemInfo = async () => {
        setLoading(true)
        const { data } = await axios.get('/api/systemInfo')
        if (data.status === 200) {
            setInfo(data?.data)
            message.success(data.msg)
            setLoading(false)
        }
    }
    useEffect(() => {
        getSystemInfo()
    }, [])
    return (
        <main>
            <h1>SystemInfo</h1>
            <Link href={`/`} >
                <Button type="primary" >返回首页</Button>
            </Link>
            <Spin spinning={loading}>
                <p>主机名：{info?.hostname}</p>
                <p>操作系统平台：{info?.platform}</p>
                <p>操作系统发行版本：{info?.release}</p>
                <p>你的CPU：{info?.cpu}</p>
                <p>操作系统架构：{info?.arch}</p>
                <p>你的总运行内存/M：{info?.totalmem} M</p>
                <p>你的剩余运行内存/M：{info?.freemem} M</p>
            </Spin>
        </main>
    );
}
export default SystemInfo;
