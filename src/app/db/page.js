"use client"
import styles from '@/styles/db.module.scss';
import { App, Button, Col, Form, Input, Modal, Radio, Row, Space, Spin, Table } from 'antd';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } };
function DB() {
    const { message } = App.useApp();
    const [form] = Form.useForm();
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalLoading, setModalLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [typeModal, setTypeModal] = useState(null);
    const [titleModal, setTitleModal] = useState('操作');
    const [tableRecord, setTableRecord] = useState({});

    useEffect(() => {
        getDbUserTable()
    }, [])

    const showModal = (type, title, record) => {
        if (type === 'edit') {
            console.log('获取接口');
            getDbUserDetails(record.id)
        }
        console.log(record, 'record');
        setTypeModal(type)
        setTitleModal(title)
        setIsModalOpen(true);
        setTableRecord(record)
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setModalLoading(false)
        if (typeModal === 'add' || typeModal === 'edit') {
            form.resetFields()
        }
    };
    const handleOk = async () => {
        if (typeModal === 'add' || typeModal === 'edit') {
            const values = await form.validateFields().catch((errorInfo) => {
                console.log(errorInfo, 'errorInfo');
            })
            console.log(values, 'values');
            if (values) {
                if (typeModal === 'add') {
                    addDbUser(values)
                } else if (typeModal === 'edit') {
                    editDbUser(values)
                }

            }
        } else {
            deleteDbUser()
        }
    };

    const getDbUserTable = async () => {
        setLoading(true)
        const { data } = await axios.get('/api/db')
        if (data.status === 200) {
            setDataSource(data?.data)
        }
        setLoading(false)
    }

    const addDbUser = async (values) => {
        setModalLoading(true)
        const { data } = await axios.post('/api/db', values)
        if (data.status === 200) {
            message.success(data.msg)
            handleCancel()
            getDbUserTable()
        }
        setModalLoading(false)
    }
    const editDbUser = async (values) => {
        setModalLoading(true)
        const { data } = await axios.put(`/api/db/${tableRecord.id}`, values)
        if (data.status === 200) {
            message.success(data.msg)
            handleCancel()
            getDbUserTable()
        }
        setModalLoading(false)
    }
    const deleteDbUser = async () => {
        setModalLoading(true)
        const { data } = await axios.delete(`/api/db/${tableRecord.id}`)
        if (data.status === 200) {
            message.success(data.msg)
            handleCancel()
            getDbUserTable()
        }
        setModalLoading(false)
    }

    const getDbUserDetails = async (id) => {
        setModalLoading(true)
        const { data } = await axios.get(`/api/db/${id}`)
        if (data.status === 200) {
            form.setFieldsValue(data?.data)
            setModalLoading(false)
        }
    }


    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '描述',
            dataIndex: 'description',
        },
        {
            title: '状态',
            dataIndex: 'status',
            render(text) {
                return text === 1 ? '启用' : '禁用'
            }
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
        },
        {
            title: '修改时间',
            dataIndex: 'updatedAt',
        },
        {
            title: '操作',
            render: (record) => {
                return <>
                    <Button type='link' style={{ paddingLeft: 0 }} onClick={() => showModal('edit', '编辑用户', record)}>编辑</Button>
                    <Button type='link' style={{ paddingLeft: 0 }} onClick={() => showModal('delete', '删除用户', record)}>删除</Button>
                </>
            }
        },
    ];
    return (
        <main>
            <Table
                rowKey={'id'}
                className={styles['db-table']}
                style={{ margin: 25 }}
                dataSource={dataSource || []}
                columns={columns}
                loading={loading}
                pagination={false}
                title={() => <Row justify="space-between" align="middle">
                    <Col>
                        DB
                    </Col>
                    <Col>
                        <Space>
                            <Button type="primary" onClick={() => showModal('add', '添加用户')} >添加用户</Button>
                            <Link href={`/`} >
                                <Button >返回首页</Button>
                            </Link>
                        </Space>
                    </Col>
                </Row>
                }
            />;
            <Modal
                wrapClassName={styles['db-modal']}
                width={640}
                title={titleModal}
                open={isModalOpen}
                onOk={handleOk}
                centered
                confirmLoading={modalLoading}
                onCancel={handleCancel}
            >
                <Spin spinning={modalLoading}>
                    {typeModal === 'delete' && <span>是否要删除用户名称为：<span style={{ marginLeft: 8, marginRight: 8, color: 'red' }}>{tableRecord.name}</span>的用户？</span>}
                    {(typeModal === 'add' || typeModal === 'edit') && <Form
                        name="addUser"
                        form={form}
                        {...formItemLayout}
                        initialValues={{
                            status: 1
                        }}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="用户名称"
                            name="name"
                            rules={[
                                { required: true, whitespace: true, message: '请输入用户名称', },
                            ]}
                        >
                            <Input placeholder='请输入用户名称' />
                        </Form.Item>
                        <Form.Item
                            label="用户描述"
                            name="description"
                            rules={[
                                { required: true, whitespace: true, message: '请输入用户描述', },
                            ]}
                        >
                            <Input placeholder='请输入用户描述' />
                        </Form.Item>
                        <Form.Item
                            label="用户状态"
                            name="status"
                            rules={[
                                { required: true, message: '请选择用户状态', },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={1}>启动</Radio>
                                <Radio value={2}>禁用</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>}
                </Spin>
            </Modal>
        </main>
    );
}
export default DB;
