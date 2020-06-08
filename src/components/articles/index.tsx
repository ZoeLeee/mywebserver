import React from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

function Articles() {
  return (
    <div>
      <Button type="primary" icon={<PlusOutlined />}>
        添加文章
      </Button>
    </div>
  )
}

export default Articles
