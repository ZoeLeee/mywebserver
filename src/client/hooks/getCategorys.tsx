import { useEffect, useState } from 'react';
import { CascaderOptionType } from 'antd/lib/cascader';
import { ICategorys } from '../components/category';
import { Get, RequestStatus } from '../utils/request';
import { ReqApi } from './../utils/api';


export function useGetCategoryOption() {

    const [option, setOption] = useState<CascaderOptionType[]>([]);

    const updateCategorys = (categorys: ICategorys[]) => {
        let nodes: CascaderOptionType[] = [];
        for (let category of categorys) {
            nodes.push({
                label: category.title,
                value: category.id,
                children: updateCategorys(category.children)
            });
        }
        return nodes;
    };

    useEffect(() => {
        Get(ReqApi.GetCategorys).then(res => {
            if (res.code === RequestStatus.Ok) {
                setOption(updateCategorys(res.data));
            }
        });
    }, []);


    return option;
}
export function useGetCategory() {

    const [option, setOption] = useState<ICategorys[]>([]);

    useEffect(() => {
        Get(ReqApi.GetCategorys).then(res => {
            if (res.code === RequestStatus.Ok) {
                setOption(res.data);
            }
        });
    }, []);


    return option;
}
