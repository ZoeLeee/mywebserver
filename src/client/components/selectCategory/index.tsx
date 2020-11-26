import { Cascader } from 'antd';
import React from 'react';
import { useGetCategoryOption } from '../../hooks/getCategorys';
import { IProjectOption } from '../../utils/Interface';

export default function SelectCatoryComponent(props: { project: IProjectOption; }) {

    const option = useGetCategoryOption();

    function onChange(value: string[]) {
        props.project.categoryId = value.pop();
    }
    return (
        <div>
            <span style={{ marginRight: 20 }}>选择文章分类</span>
            <Cascader options={option} onChange={onChange} placeholder="请选择分类" />
        </div>
    );
}
