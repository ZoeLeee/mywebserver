import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import {
    Button, Spin, Upload
} from 'antd';
import 'codemirror/lib/codemirror.css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { ReqApi } from '../../utils/api';
import { IProjectOption } from '../../utils/Interface';
import { Post, RequestStatus } from '../../utils/request';
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
                // Get this url from response in real world.
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

    const editorRef = useRef<Editor>(null);

    const upload = async () => {
        project.content = editorRef.current.getInstance().getHtml();

        if (isUpdate) {
            // project.scanCount++;
            // project.id = id;
            // project.imgUrl = url;
            // let data = await Post(ReqApi.Update, project);
            // if (data.code === RequestStatus.Ok) {
            //     props.history.push('/articles');
            // }
        }
        else {
            project.scanCount = 0;
            project.imgUrl = url;
            let data = await Post(ReqApi.AddProject, project);
            if (data.code === RequestStatus.Ok) {
                props.history.push('/projects/list');
            }
        }
    };
    useEffect(() => {
        if (isUpdate) {
            // Get(ReqApi.Article + "?id=" + id)
            //     .then(res => {
            //         if (res.code === RequestStatus.Ok && res.data.length > 0) {
            //             editorRef.current.getInstance().setHtml(res.data[0].content);
            //             setProject({
            //                 content: res.data[0].content,
            //                 categoryId: res.data[0].category,
            //                 title: res.data[0].title,
            //                 scanCount: Number(res.data[0].scanCount) || 0,
            //                 imgUrl: res.data[0].imgUrl || "",
            //             });
            //         }
            //     });
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
                <span style={{ lineHeight: '102px' }}>
                    封面:
          </span>
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
                <span>
                    Title:
          </span>
                <input
                    id="title"
                    type="text"
                    value={project.title}
                    placeholder="输入标题"
                    onChange={onTitleChange}
                />
            </section>
            <span
                style={{ position: 'relative', top: 400 }}
            >
                Content:
      </span>
            <Editor
                initialValue={project.content}
                previewStyle="vertical"
                height="600px"
                initialEditType="markdown"
                useCommandShortcut={true}
                ref={editorRef}
            />
            <SelectCatoryComponent project={project} />
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
