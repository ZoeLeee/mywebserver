import React, { Component, useEffect, useState, useRef } from 'react';
import {
  Button, Input, Upload, Popconfirm, Tag,
} from 'antd';

import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';

import { Editor } from '@toast-ui/react-editor';
import { LoadingOutlined, PlusOutlined, WarningOutlined } from '@ant-design/icons';
import { beforeUpload } from './../../utils/utils';

import './index.less'
import { IArticleOption } from './../../utils/articleInterface';
import { Post, RequestStatus } from '../../utils/request';
import { ReqApi } from '../../utils/hosts';
import { RouterProps, RouteComponentProps } from 'react-router';

const Dragger = Upload.Dragger;

const AddArticles = (props:RouteComponentProps) => {

  const id=props.match.params["id"];
  const isUpdate=!!id;

  const articleDetailStore = { uploadStatus: false, inputVisible: true };
  const [article, setArticle] = useState<IArticleOption>({
    title: "",
    content: "",
    tags: []
  })

  const [inputVisible, setInputVisible] = useState(false);

  const [tagName, settagName] = useState("");

  const uploadButton = (
    <div>
      {
        articleDetailStore.uploadStatus ? <LoadingOutlined /> : <PlusOutlined />
      }
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const tagColorList = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];


  const uploadImage = () => {

  };
  const onHeaderCoverUploadChange = () => {

  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    settagName(e.target.value);
  }
  const handleInputConfirm = () => {
    if (!article.tags.includes(tagName))
      article.tags.push(tagName);
    settagName("");
    setInputVisible(false);
  }

  const showInput = () => {
    setInputVisible(true);
  }
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArticle({ ...article, title: e.target.value });
  }

  const editorRef = useRef<Editor>(null);

  const upload=async ()=>{
    article.content=editorRef.current.getInstance().getHtml();
    article.scanCount=0;
    let data=await Post(ReqApi.Write,article);
    if(data.code===RequestStatus.Ok){
        props.history.push('/articles');
    }
  }

  useEffect(() => {
    console.log(id);

    return () => {
    }
  }, [])

  return (
    <main className="wrapper article_detail_wrapper">
      <h1>
        添加文章
      </h1>
      <section className="article_detail_container">
        <span style={{ lineHeight: '102px' }}>
          Header Cover:
          </span>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={onHeaderCoverUploadChange}
        >
          {
            uploadButton
          }
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
      <Editor
        initialValue={article.content}
        previewStyle="vertical"
        height="600px"
        initialEditType="markdown"
        useCommandShortcut={true}
        ref={editorRef}
      />
      <span className="tags_label">
        Tags:
        </span>
      <div className="tags_container">
        {article.tags.map((tag, index) => {
          return <Tag
            key={tag}
            closable
            color={tagColorList[index]}
          // afterClose={() => articleDetailStore.handleClose(tag)}
          >
            {tag}
          </Tag>
        })}
        {inputVisible && (
          <Input
            type="text"
            size="small"
            style={{ width: 78 }}
            value={tagName}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag
            onClick={showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <PlusOutlined />
            {' '}
            添加标签
            </Tag>
        )}
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
          SAVE
        </Button>
      </div>
    </main>
  );
}

export default AddArticles
