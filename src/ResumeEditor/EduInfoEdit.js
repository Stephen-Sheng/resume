import EditBackBar from "./EditBackBar";
import {Button, Form, Input, DatePicker, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import './BasicInfoEdit.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import moment from "moment";

const {RangePicker} = DatePicker;
const {Option} = Select;
const options = ["Senior High School", "High School", "Diploma", "Bachelor", "Master", "Doctor", "MBA"]
const monthFormat = 'YYYY/MM';


export default function EduInfoEdit(props) {

    const [value, setValue] = useState('');
    const {eduInfo, setEduInfo, setEditStatus, eduIndex} = props

    const [form] = Form.useForm();
    const [formLayout] = useState('vertical');


    const onFinish = (values) => {
        console.log(values)
        if (eduInfo.length === 0) {
            const newEduInfo = eduInfo
            newEduInfo.push(values)
            setEduInfo(newEduInfo)
        } else {
            if (eduIndex !== null){
               let newEduInfo = eduInfo
                newEduInfo[eduIndex] = values
                setEduInfo(newEduInfo);
            }else{
                const newEduInfo = eduInfo
                newEduInfo.push(values)
                setEduInfo(newEduInfo)
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
                initialValues={eduIndex !== null? eduInfo[eduIndex]:{univName:"", programName:"", degree:"", cityName:"", time:null,description:""}}
                onFinish={onFinish}
                style={{marginLeft: "28px", marginRight: "28px", marginTop: "0px"}}
            >
                <EditBackBar text={"Education"} setEditStatus={setEditStatus}/>
                <Form.Item label="University" name={"univName"} style={{marginTop: "20px"}} required
                           rules={[{required: true, message: "University is required!"}]}>
                    <Input className={"my-input"} placeholder="Example: Peking University"/>
                </Form.Item>
                <Form.Item label="Program" name={"programName"} required
                    // tooltip="It's very important, don't make a mistake!"
                           rules={[{required: true, message: `Program name is required!`}]}>
                    <Input className={"my-input"} placeholder="Example: Computer Science"/>
                </Form.Item>
                <Form.Item label="Degree" name={"degree"} required
                    // tooltip="Please fill in the email address you use most often"
                           rules={[{required: true, message: "Degree is required!"}]}>
                    <Select className={"my-input"} placeholder="Please choose your degree">
                        {options.map((value, index) => {
                            return (
                                <Option value={value}>{value}</Option>
                            )
                        })}
                    </Select>
                </Form.Item>
                <Form.Item label="City" name={"cityName"} required
                           rules={[{required: true, message: "City name is required!"}]}>
                    <Input className={"my-input"} placeholder="Example: Beijing"/>
                </Form.Item>
                <Form.Item label="Duration of study" name={"time"} required
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