import EditBackBar from "./EditBackBar";
import {Form, Input, DatePicker} from 'antd';
import React, {useState} from 'react';
import './BasicInfoEdit.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const {RangePicker} = DatePicker;
const monthFormat = 'YYYY/MM';


export default function ProjectInfoEdit(props) {

    const [value, setValue] = useState('');
    const {projectInfo, setProjectInfo, setEditStatus, projectIndex} = props

    const [form] = Form.useForm();
    const [formLayout] = useState('vertical');


    const onFinish = (values) => {
        console.log(values)
        if (projectInfo.length === 0) {
            const newProjectInfo = projectInfo
            newProjectInfo.push(values)
            setProjectInfo(newProjectInfo)
        } else {
            if (projectIndex !== null){
                let newProjectInfo = projectInfo
                newProjectInfo[projectIndex] = values
                setProjectInfo(newProjectInfo);
            }else{
                const newProjectInfo = projectInfo
                newProjectInfo.push(values)
                setProjectInfo(newProjectInfo)
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
                initialValues={projectIndex !== null? projectInfo[projectIndex]:{projectName:"", role:"", department:"", city:"", time:null,description:""}}
                onFinish={onFinish}
                style={{marginLeft: "28px", marginRight: "28px", marginTop: "0px"}}
            >
                <EditBackBar text={"Project"} setEditStatus={setEditStatus}/>
                <Form.Item label="Project name" name={"projectName"} style={{marginTop: "20px"}} required
                           rules={[{required: true, message: "Project name is required!"}]}>
                    <Input className={"my-input"} placeholder="Example: Sunshine web app based on React"/>
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
                <Form.Item label="Duration of project" name={"time"} required
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