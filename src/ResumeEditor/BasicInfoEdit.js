import EditBackBar from "./EditBackBar";
import {Button, Form, Input, Radio} from 'antd';
import React, {useState} from 'react';
import "./BasicInfoEdit.css"

export default function BasicInfoEdit(props) {
    const setEditStatus = props.setEditStatus
    const setUserName = props.setUserName
    const setEmail = props.setEmail
    const setPhoneNum = props.setPhoneNum
    const setWorkLocation = props.setWorkLocation
    const [form] = Form.useForm();
    const [formLayout] = useState('vertical');

    const onValuesChange = (changedValues) => {
        if ("userName" in changedValues) {
            setUserName(changedValues.userName)
        }
        if ("phoneNum" in changedValues) {
            setPhoneNum(changedValues.phoneNum)
        }
        if ("email" in changedValues) {
            setEmail(changedValues.email)
        }
        if ("workLocation" in changedValues) {
            setWorkLocation(changedValues.workLocation)
        }

    };

    const onFinish = (values) => {
        console.log(values)
        let {userName, phoneNum, email, workLocation} = values
        setUserName(userName)
        setPhoneNum(phoneNum)
        setWorkLocation(workLocation)
        setEmail(email)
        setEditStatus(false)
    }

    const formItemLayout =
        formLayout === 'vertical'
            ? {
                labelCol: {
                    span: 14,
                },
                wrapperCol: {
                    span: 24,
                },
            }
            : null;

    return (
        <>
            <Form
                {...formItemLayout}
                layout={"vertical"}
                form={form}
                initialValues={{userName: props.userName, phoneNum: props.phoneNum, workLocation: props.workLocation, email: props.email}}
                onValuesChange={(changedValues) => onValuesChange(changedValues)}
                onFinish={onFinish}
                style={{marginLeft: "28px", marginRight: "28px", marginTop: "0px"}}
            >
                <EditBackBar text={"Basic information"} setEditStatus={setEditStatus}/>
                <Form.Item label="Name" name={"userName"} style={{marginTop: "20px"}} required
                           rules={[{required: true, message: "Name is required!"}]}>
                    <Input className={"my-input"} placeholder="Example: Yuanyuan Chen"/>
                </Form.Item>
                <Form.Item label="Mobile number" name={"phoneNum"} required
                           tooltip="It's very important, don't make a mistake!"
                           rules={[{required: true, message: `Mobile number is required!`}]}>
                    <Input className={"my-input"} placeholder="Example: 188-1000-5383"/>
                </Form.Item>
                <Form.Item label="Email Address" name={"email"} required
                           tooltip="Please fill in the email address you use most often"
                           rules={[{required: true, message: "Email is required!"}]}>
                    <Input className={"my-input"} placeholder="Example: ys23n21@soton.ac.uk"/>
                </Form.Item>
                <Form.Item label="Work Location" name={"workLocation"} required
                           rules={[{required: true, message: "Work Location is required!"}]}>
                    <Input className={"my-input"} placeholder="Example: Beijing"/>
                </Form.Item>
            </Form>
        </>
    )
}