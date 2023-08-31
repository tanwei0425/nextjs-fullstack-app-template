"use client"
import { App, Button, Descriptions, Skeleton, Space } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
function ApiDemo() {
    const { message } = App.useApp();
    const [token, setToken] = useState('')
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const getData = async () => {
        setLoading(true)
        const { data } = await axios.get('/api/apiDemo', {
            params: { id: 1 },
        })

        if (data.status === 200) {
            const itemsFormat = data?.data?.map(val => ({ key: val.id, label: val.name, children: val.body }))
            setItems(itemsFormat)
            message.success(data.msg)
            setLoading(false)
        }
    }
    const addData = async () => {
        setLoading(true)
        console.log(items, 'items');
        const { data } = await axios.post('/api/apiDemo', {
            id: items.length,
            name: `谭伟测试name${items.length}`,
            body: `谭伟测试body${items.length}`,
        })
        console.log(data, 'res');
        if (data.status === 200) {
            setItems([...items, { key: data?.data?.id, label: data?.data?.name, children: data?.data?.body }])
            message.success(data.msg)
            setLoading(false)
        }
    }
    const updateData = async () => {
        setLoading(true)
        const { data } = await axios.put(`/api/apiDemo/${items.length - 1}`, {
            name: `update谭伟测试name${items.length - 1}`,
            body: `update谭伟测试body${items.length - 1}`,
        })
        console.log(data, 'res');
        if (data.status === 200) {
            items[data?.data.id] = {
                key: data?.data.id,
                label: data?.data.name,
                children: data?.data.body,
            }
            setItems(items)
            message.success(data.msg)
            setLoading(false)
        }
    }
    const deleteData = async () => {
        setLoading(true)
        const { data } = await axios.delete(`/api/apiDemo/${items.length - 1}`)
        console.log(data, 'res');
        if (data.status === 200) {
            items.length = data?.data
            setItems(items)
            message.success(data.msg)
            setLoading(false)
        }
    }
    const getHeaders = async () => {
        setLoading(true)
        const { data, headers } = await axios.get('/api/apiDemo/headers', {
            headers: {
                'req-token': 'tanwei-token',
            },
        })
        console.log(data, 'data');
        if (data.status === 200) {
            setToken(headers.token)
            message.success(data.msg)
            setLoading(false)
        }
    }
    const redirect = async () => {
        setLoading(true)
        const { data } = await axios.get('/api/apiDemo/redirect')
        console.log(data, 'data');
        if (data.status === 200) {
            const itemsFormat = data?.data?.map(val => ({ key: val.id, label: val.name, children: val.body }))
            setItems(itemsFormat)
            message.success(data.msg)
            setLoading(false)
        }
    }
    return (
        <div>
            <Space>
                <Link href={`/`} >
                    <Button type="primary" >返回首页</Button>
                </Link>
                <Button onClick={getHeaders}>获取token和cookies</Button>
                <Button onClick={redirect}>重定向(api/apiDemo?id=2)</Button>
                <Button onClick={getData}>get获取数据</Button>
                <Button onClick={addData}>post插入数据</Button>
                <Button onClick={updateData}>put修改末端数据</Button>
                <Button onClick={deleteData}>delete删除末端数据</Button>
            </Space>
            <Skeleton loading={loading}>
                <Descriptions bordered title="请求数据" items={items} />
            </Skeleton>
            {token && <><span>获取token：</span>{token}</>}
        </div>
    );
}
export default ApiDemo