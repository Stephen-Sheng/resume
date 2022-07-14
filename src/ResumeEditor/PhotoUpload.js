import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import {message, Upload} from 'antd';
import {useState} from 'react';
import './PhotoUpload.css'

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
    console.log(file)
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
};

const PhotoUpload = () => {
    const [loading, setLoading] = useState(false);
    const [, setImageUrl] = useState('');
    const [url, setUrl] = useState('')

    const handleChange = (info) => {
        console.log(info)
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }

        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
                setUrl(info.file.response.data.URL)
            });

        }
    };

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );
    return (
        <Upload
            accept={".jpg"}
            name="photo"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            maxCount={1}
            action="http://localhost:8080/api/upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
        >
            {url ?
                <img
                    src={url}
                    id={'img'}
                    alt="avatar"
                    style={{
                        width: '100%',
                    }}
                />
                :
                uploadButton
            }
        </Upload>

    );
};

export default PhotoUpload;