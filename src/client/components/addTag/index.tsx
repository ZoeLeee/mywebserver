import React, { useState } from 'react';
import {
  Input, Tag,
} from 'antd';
import { IArticleOption } from '../../utils/Interface';
import { PlusOutlined } from '@ant-design/icons';


interface IAddTag {
  article: IArticleOption,
}
const tagColorList = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];

const AddTagComponent = (props: IAddTag) => {

  const { article } = props;
  const [inputVisible, setInputVisible] = useState(false);

  const [tagName, settagName] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    settagName(e.target.value);
  };
  const handleInputConfirm = () => {
    if (!article.tags.includes(tagName))
      article.tags.push(tagName);
    settagName("");
    setInputVisible(false);
  };

  const showInput = () => {
    setInputVisible(true);
  };



  return (
    <>
      <span className="tags_label">
        文章标签:
          </span>
      <div className="tags_container">
        {article.tags && article.tags.map((tag, index) => {
          return <Tag
            key={tag}
            closable
            color={tagColorList[index]}
          // afterClose={() => articleDetailStore.handleClose(tag)}
          >
            {tag}
          </Tag>;
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
    </>
  );
};

export default AddTagComponent;