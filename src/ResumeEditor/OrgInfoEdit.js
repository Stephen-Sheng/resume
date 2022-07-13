import EditBackBar from "./EditBackBar";
import {Form, Input, DatePicker} from 'antd';
import React, {useState} from 'react';
import './BasicInfoEdit.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const {RangePicker} = DatePicker;
const monthFormat = 'YYYY/MM';


export default function OrgInfoEdit(props) {

    const [value, setValue] = useState('');
    const {orgInfo, setOrgInfo, setEditStatus, orgIndex} = props

    const [form] = Form.useForm();
    const [formLayout] = useState('vertical');


    const onFinish = (values) => {
        console.log(values)
        if (orgInfo.length === 0) {
            const newProjectInfo = orgInfo
            newProjectInfo.push(values)
            setOrgInfo(newProjectInfo)
        } else {
            if (orgIndex !== null){
                let newProjectInfo = orgInfo
                newProjectInfo[orgIndex] = values
                setOrgInfo(newProjectInfo);
            }else{
                const newProjectInfo = orgInfo
                newProjectInfo.push(values)
                setOrgInfo(newProjectInfo)
            }
        }
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
                initialValues={orgIndex !== null? orgInfo[orgIndex]:{orgName:"", role:"", department:"", city:"", time:null,description:""}}
                onFinish={onFinish}
                style={{marginLeft: "28px", marginRight: "28px", marginTop: "0px"}}
            >
                <EditBackBar text={"Organization"} setEditStatus={setEditStatus}/>
                <Form.Item label="Organization name" name={"orgName"} style={{marginTop: "20px"}} required
                           rules={[{required: true, message: "Organization name is required!"}]}>
                    <Input className={"my-input"} placeholder="Example: Volunteer Association"/>
                </Form.Item>
                <Form.Item label="Role" name={"role"} required
                    // tooltip="It's very important, don't make a mistake!"
                           rules={[{required: true, message: `Role is required!`}]}>
                    <Input className={"my-input"} placeholder="Example: Front end engineer"/>
                </Form.Item>
                <Form.Item label="Department" name={"department"} required
                    // tooltip="Please fill in the email address you use most often"
                           rules={[{required: true, message: "Department is required!"}]}>
                    <Input className={"my-input"} placeholder="Example: BUPT"/>
                </Form.Item>
                <Form.Item label="City" name={"city"} required
                           rules={[{required: true, message: "City name is required!"}]}>
                    <Input className={"my-input"} placeholder="Example: Beijing"/>
                </Form.Item>
                <Form.Item label="Duration" name={"time"} required
                           rules={[{required: true, message: "Time is required!"}]}>
                    <RangePicker className={"my-input"} picker="month" format={monthFormat}/>
                </Form.Item>
                <Form.Item label={"Description"} name={"description"}>
                    <ReactQuill theme="snow" value={value} onChange={setValue} style={{maxHeight:'100%', overflow:'auto'}}/>
                </Form.Item>
            </Form>
        </>
    )
}