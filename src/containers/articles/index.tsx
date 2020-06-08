import React, { useState,useEffect } from 'react'
import {
  Table, Button, Pagination, Spin, Input, DatePicker, Tag,
} from 'antd';
import { Link } from 'react-router-dom';
import { PlusOutlined, EditTwoTone, DeleteOutlined } from '@ant-design/icons';
import {  Get, RequestStatus } from '../../utils/request';
import { ReqApi } from '../../utils/hosts';
import './index.less'

const Search = Input.Search;
const { RangePicker } = DatePicker;

interface IArticle{
  content:string;
  create_time:number;
  update_time:number;
  tag:string[];
  _id:string;
  scanCount:string;
  title:string;
}

const colums=[
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '内容',
    dataIndex: 'content',
    key: 'content',
    width:300,
    render:(content:string)=>content.length>300?content.slice(0,300)+"...":content
  },
  {
    title: '标签',
    key: 'tag',
    dataIndex: 'tag',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '发布日期',
    dataIndex: 'create_time',
    key: 'create_time',
    render:(text, record) => (
      <span>
        {
          new Date(text).toLocaleString("zh",{hour12: false})
        }
      </span>
    )
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
    key: 'update_time',
    render:(text, record) => (
      <span>
        {
          new Date(text).toLocaleString("zh",{hour12: false})
        }
      </span>
    )
  },
  {
    title: '浏览次数',
    dataIndex: 'scanCount',
    key: 'scanCount',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record:any) => (
      <span>
        <Link to={`/article/update/${record._id}`}>
          <EditTwoTone style={{ cursor: 'pointer', marginRight: 16 }} />
        </Link>
        <DeleteOutlined style={{ cursor: 'pointer' }} />
      </span>
    ),
  },

]


const Article = () => {
  const [articles,setArticles]= useState([] as IArticle[]);
  const [isLoading,setIsloading]=useState(true);
  useEffect(() => {
    Get(ReqApi.Articles)
    .then(res=>{
      if(res.code===RequestStatus.Ok){
        setArticles(res.data);
      }
      setIsloading(false);
    }).catch(rej=>{
      setIsloading(false);
    })
    return () => {
      
    }
  }, [])


  return (
    <main className="wrapper article_wrapper">
      <div
        className="search_container"
        style={{
          display: 'flex', justifyContent: 'space-between', margin: '0 0 30px 0', width: '50%',
        }}
      >
        <Search
          placeholder="Search by title..."
          onSearch={value => {}}
          enterButton
          style={{ width: 300 }}
        />
        <RangePicker />
        <Button
          type="primary"
        >
          Reset
      </Button>
      </div>
      <div className="add_batch_delete_wrapper">
        <Button
          type="primary"
          style={{
            marginBottom: 16,
            marginRight: 20,
          }}
        >
          <Link to="/article/add">
            <PlusOutlined style={{ position: 'relative', top: 1, marginRight: 10 }} />
            添加文章
        </Link>
        </Button>
      </div>
      <Table
        rowKey={record => record._id} /* eslint-disable-line */
        dataSource={articles}
        pagination={false}
        loading={isLoading}
        columns={colums}
      >
      </Table>
      <Spin
        spinning={false}
        style={{ marginLeft: '50%', marginTop: 20 }}
      />
      <Pagination
        size="small"
        showQuickJumper
        defaultCurrent={1}
        total={10}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
        style={{ marginTop: 20, textAlign: 'right' }}
      />
    </main>
  )
}

export default Article
