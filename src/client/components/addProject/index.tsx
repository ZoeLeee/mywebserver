import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import {
    Button, Spin, Upload, message
} from 'antd';
import 'codemirror/lib/codemirror.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { ReqApi } from '../../utils/api';
import { IProjectOption } from '../../utils/Interface';
import { Post, RequestStatus, Get } from '../../utils/request';
import CommonEdiror from '../editor';
import SelectCatoryComponent from '../selectCategory';
import './index.less';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

let url: string;

export interface IEditor extends RouteComponentProps {
    title: string,
}

const AddProject = (props: IEditor) => {

    const id = props.match.params["id"];
    const isUpdate = !!id;

    const [project, setProject] = useState<IProjectOption>({
        title: "",
        content: "",
        categoryId: "",
        scanCount: 0,
        imgUrl: "",
        showUrl: "",
        description: "",
    });

    const [isLoading, setIsloading] = useState(isUpdate);

    const [imgUrl, setImgUrl] = useState(null);
    const uploadButton = (
        <div>
            {
                isLoading && imgUrl ? <LoadingOutlined /> : <PlusOutlined />
            }
            <div className="ant-upload-text">上传</div>
        </div>
    );


    const handleChange = useCallback(
        (info) => {
            if (info.file.status === 'uploading') {
                setIsloading(true);
                return;
            }
            if (info.file.status === 'done') {
                if (info.file.response.code === 200)
                    url = info.file.response.data.url;
                console.log('url: ', url);
                getBase64(info.file.originFileObj, imageUrl => {
                    setImgUrl(imageUrl);
                    setIsloading(false);
                }
                );
            }
        },
        [],
    );


    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProject({ ...project, title: e.target.value });
    };
    const onDescribeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProject({ ...project, description: e.target.value });
    };
    const onShowUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProject({ ...project, showUrl: e.target.value });
    };

    const editorRef = useRef<Editor>(null);

    const upload = async () => {
        project.content = editorRef.current.getInstance().getHtml();

        if (isUpdate) {
            project.scanCount++;
            project.id = id;
            project.imgUrl = url;
            let data = await Post(ReqApi.UpdateProject, project);
            if (data.code === RequestStatus.Ok) {
                props.history.push('/projects/list');
                message.success("项目更新成功", 3);
            }
        }
        else {
            if (!project.title) {
                message.error("为输入标题");
                return;
            }
            if (!project.categoryId) {
                message.error("未选择分类");
                return;
            }
            project.scanCount = 0;
            project.imgUrl = url;
            let data = await Post(ReqApi.AddProject, project);
            if (data.code === RequestStatus.Ok) {
                props.history.push('/projects/list');
                message.success("添加项目成功", 3);
            }
        }
    };
    useEffect(() => {
        if (isUpdate) {
            Get(ReqApi.GetProject + "?id=" + id)
                .then(res => {
                    if (res.code === RequestStatus.Ok && res.data.length > 0) {
                        editorRef.current.getInstance().setHtml(res.data[0].content);
                        setProject({
                            content: res.data[0].content,
                            categoryId: res.data[0].categoryId,
                            title: res.data[0].title,
                            scanCount: Number(res.data[0].scanCount) || 0,
                            imgUrl: res.data[0].imgUrl || "",
                            description: res.data[0].description || "",
                            showUrl: res.data[0].showUrl || "",
                        });
                    }
                });
        }

        return () => {
        };
    }, []);

    const renderPreview = () => {
        if (!imgUrl) {
            return uploadButton;
        }

        if (isLoading)
            return <Spin />;
        else
            return imgUrl ? <img src={imgUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton;
    };
    return (
        <main className="wrapper article_detail_wrapper">
            <h1>
                {props.title}
            </h1>
            <section className="article_detail_container">
                <span style={{ lineHeight: '102px' }}>封面:</span>
                <Upload
                    name="files"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    onChange={handleChange}
                    multiple={false}
                    withCredentials={true}
                    action='http://www.dodream.wang:3600/uploadImg'
                >
                    {renderPreview()}
                </Upload>
                <span>项目标题: </span>
                <input
                    className="title"
                    type="text"
                    value={project.title}
                    placeholder="输入标题"
                    onChange={onTitleChange}
                />
                <span>
                    描述:
                 </span>
                <input
                    className="title"
                    type="text"
                    value={project.description}
                    placeholder="简介"
                    onChange={onDescribeChange}
                />
            </section>
            <span style={{ position: 'relative', top: 400 }} >内容:</span>
            <CommonEdiror option={project} ref={editorRef} />
            <div className="article_detail_container">
                <SelectCatoryComponent project={project} />
                <span>
                    演示地址:
                </span>
                <input
                    className="title"
                    type="text"
                    value={project.showUrl}
                    placeholder="演示地址"
                    onChange={onShowUrlChange}
                />
            </div>
            <div className="submit_btn_group">
                <Button
                    onClick={upload}
                    style={{
                        marginBottom: 16,
                        marginLeft: 20,
                        background: '#19be6b',
                        borderColor: '#19be6b',
                    }}
                >
                    {
                        isUpdate ? "更新" : "发布"
                    }
                </Button>
            </div>
        </main>
    );
};



export default AddProject;
