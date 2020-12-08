import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Button, Upload, Spin,
} from 'antd';

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import './index.less';
import { IArticleOption } from '../../utils/Interface';
import { Post, RequestStatus, Get } from '../../utils/request';
import { ReqApi } from '../../utils/api';
import { RouteComponentProps } from 'react-router';
import AddTagComponent from '../addTag';
import CommonEdiror from '../editor';


function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

let url: string;

export interface IEditor extends RouteComponentProps {
  title: string,
}

const AddArticles = (props: IEditor) => {

  const id = props.match.params["id"];
  const isUpdate = !!id;

  const [article, setArticle] = useState<IArticleOption>({
    title: "",
    content: "",
    tags: [],
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
    setArticle({ ...article, title: e.target.value });
  };

  const editorRef = useRef<Editor>(null);

  const upload = async () => {
    article.content = editorRef.current.getInstance().getHtml();

    if (isUpdate) {
      article.scanCount++;
      article._id = id;
      article.imgUrl = url;
      let data = await Post(ReqApi.Update, article);
      if (data.code === RequestStatus.Ok) {
        props.history.push('/articles');
      }
    }
    else {
      article.scanCount = 0;
      article.imgUrl = url;
      let data = await Post(ReqApi.Write, article);
      if (data.code === RequestStatus.Ok) {
        props.history.push('/articles');
      }
    }
  };
  useEffect(() => {
    if (isUpdate) {
      Get(ReqApi.Article + "?id=" + id)
        .then(res => {
          if (res.code === RequestStatus.Ok && res.data.length > 0) {
            editorRef.current.getInstance().setHtml(res.data[0].content);
            setArticle({
              content: res.data[0].content,
              tags: res.data[0].tag,
              title: res.data[0].title,
              scanCount: Number(res.data[0].scanCount) || 0,
              imgUrl: res.data[0].imgUrl || "",
            });
          }
        });
    }

    return () => {
    };
  }, [id, isUpdate]);

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
          value={article.title}
          placeholder="输入标题"
          onChange={onTitleChange}
        />
      </section>
      <span
        style={{ position: 'relative', top: 400 }}
      >
        Content:
      </span>
      <CommonEdiror
        option={article}
        ref={editorRef}
      />
      <AddTagComponent article={article} />
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



export default AddArticles;
