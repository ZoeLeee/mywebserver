import React from 'react';
import { Cascader } from 'antd';
import { useGetCategoryOption } from '../../hooks/getCategorys';
import { IProjectOption } from '../../utils/Interface';
import { getCategorysIdsByKey } from './../../utils/categoryUtils';

const defaultValue = [];

export default function SelectCatoryComponent(props: { project: IProjectOption; }) {

    const option = useGetCategoryOption();

    defaultValue[0] = props.project.categoryId;
    let vs = getCategorysIdsByKey(props.project.categoryId, option);
    if (vs) {
        defaultValue.length = 0;
        defaultValue.push(...vs);
    }

    function onChange(value: string[]) {
        props.project.categoryId = [...value].pop();
    }
    return (
        <>
            <span style={{ marginRight: 20 }}>选择文章分类</span>
            <Cascader defaultValue={defaultValue} options={option} onChange={onChange} placeholder="请选择分类" />
        </>
    );
}
