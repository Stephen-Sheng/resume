import EditBackBar from "./EditBackBar";
import {Form} from 'antd';
import React, {useState} from 'react';
import './BasicInfoEdit.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ProfInfoEdit(props) {

    const [value, setValue] = useState('');
    const {profInfo, setProfInfo, setEditStatus} = props

    const [form] = Form.useForm();
    const [formLayout] = useState('vertical');


    const onFinish = (values) => {
        console.log(values)
        setProfInfo(values.description)
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
                initialValues={profInfo.length === 0? {description:""}: {description: profInfo}}
                onFinish={onFinish}
                style={{marginLeft: "28px", marginRight: "28px", marginTop: "0px"}}
            >
                <EditBackBar text={"Skills"} setEditStatus={setEditStatus}/>

                <Form.Item label={"Description"} name={"description"}>
                    <ReactQuill theme="snow" value={value} onChange={setValue} style={{maxHeight:'100%', overflow:'auto'}}/>
                </Form.Item>
            </Form>
        </>
    )
}