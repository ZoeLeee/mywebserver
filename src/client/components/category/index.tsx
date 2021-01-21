/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from 'react';
import { Menu, Tree, Input, Button, message } from 'antd';
import { useState } from 'react';
import { EventDataNode, DataNode } from 'rc-tree/lib/interface';
import { CheckOutlined } from '@ant-design/icons';
import { DeleteReq, Get, Post, RequestStatus } from '../../utils/request';
import { ReqApi } from './../../utils/api';
import { getNodesPathNum } from '../../utils/categoryUtils';

export type StrNumType = string | number;
export interface ISelectData {
    event: 'select';
    selected: boolean;
    node: EventDataNode;
    selectedNodes: DataNode[];
    nativeEvent: MouseEvent;
}
export interface IExpandData {
    node: EventDataNode;
    expanded: boolean;
    nativeEvent: MouseEvent;
}

const tmpStyle: React.CSSProperties = {
    position: 'absolute',
    left: `0px`,
    top: `0px`,
    zIndex: 1,
    outline: "1px solid #ccc",
};

const currentNode: DataNode = {
    key: "",
};

enum EInputHandleType {
    Add = "add",
    Update = "update",
}


export interface ICategorys {
    parent: string;
    id: string;
    title: string;
    children: ICategorys[];
}

const rightClickNodeTreeItem = {
    pageX: 500,
    pageY: 500,
};

let handleType: EInputHandleType;
let isSelectNode = false;

export function Category() {

    const [treeNodes, setTreeNodes] = useState<DataNode[]>([]);
    const [showContextmMenu, setShowContextmMenu] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState<StrNumType[]>([]);
    const [expandedKeys, setExpandedKeys] = useState<StrNumType[]>([]);
    const [showInput, setShowInput] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [showMasking, setShowMasking] = useState(false);

    const inputEl = useRef(null);

    const handleExpandKeys = (keys: StrNumType[]) => {
        let s = new Set(expandedKeys);
        for (let key of keys) {
            if (s.has(key))
                s.delete(key);
            else
                s.add(key);
        }
        setExpandedKeys(Array.from(s));
    };

    const onSelect = (keys: StrNumType[], info: ISelectData) => {
        Object.assign(currentNode, { key: info.node.key });
        setSelectedKeys([info.node.key]);
        info.nativeEvent.stopPropagation();
        isSelectNode = true;
    };

    const clickMasking = (e: React.MouseEvent) => {
        setShowMasking(false);
        setShowContextmMenu(false);
        setShowInput(false);
        e.stopPropagation();
    };

    const onRightClick = (data: {
        event: React.MouseEvent;
        node: EventDataNode;
    }) => {
        const { event, node } = data;

        Object.assign(currentNode, { key: node.key });
        setSelectedKeys([node.key]);
        Object.assign(rightClickNodeTreeItem, {
            pageX: event.pageX,
            pageY: event.pageY,
        });
        setShowContextmMenu(true);
        setShowMasking(true);
        event.stopPropagation();
        isSelectNode = true;
    };


    const handleShowInput = (e: React.MouseEvent) => {
        setShowInput(true);
        setShowMasking(true);
        setShowContextmMenu(false);
        handleType = e.currentTarget.getAttribute("data-type") as EInputHandleType;
        setTimeout(() => {
            if (inputEl && inputEl.current.input) {
                inputEl.current.input.focus();
            }
        }, 0);
        e.stopPropagation();
    };

    const renderContextMenu = () => {
        if (!showContextmMenu)
            return null;

        const { pageX, pageY } = rightClickNodeTreeItem;

        Object.assign(tmpStyle, {
            left: `${pageX - 220}px`,
            top: `${pageY - 70}px`,
        });

        const menu = (
            <Menu
                selectable={false}
                style={{ ...tmpStyle }}
            >
                <Menu.Item data-type={EInputHandleType.Add} onMouseDown={handleShowInput}>添加</Menu.Item>
                <Menu.Item data-type={EInputHandleType.Update} onMouseDown={handleShowInput}>重命名</Menu.Item>
                <Menu.Item onMouseDown={handleDeleteCategory}>删除</Menu.Item>
            </Menu>
        );
        return menu;
    };

    const onExpand = (keys: StrNumType[], info: IExpandData) => {
        if (keys.length === 0) {
            handleExpandKeys([info.node.key]);
        }
        else
            setExpandedKeys(keys);
    };

    const AddCategory = async (inputValue: string, parent: string) => {
        let data = await Post(ReqApi.AddCategory, { title: inputValue, parent });

        let id: string;
        if (data.code === RequestStatus.Ok) {
            id = data.data;
            message.success("分类添加成功");
        }
        else {
            message.error(data.data);
        }

        if (!id) {
            currentNode.key = "";
            return;
        }

        if (!currentNode.key) {
            setTreeNodes([...treeNodes, {
                title: inputValue,
                key: id,
                children: [],
            }]);
        }

        let path = getNodesPathNum(currentNode, treeNodes);

        let nodes = treeNodes;
        for (let index of path) {
            nodes = nodes[index].children;
        }
        nodes.push({
            title: inputValue,
            key: id,
            children: [],
        });

        setTreeNodes([...treeNodes]);
        currentNode.key = "";
    };
    const UpdateCatecory = async (inputValue: string) => {

        if (!currentNode.key) {
            return;
        }

        let res = await Post(ReqApi.UpdateCategory, { title: inputValue, id: currentNode.key });


        if (res.code === RequestStatus.Ok) {
            let path = getNodesPathNum(currentNode, treeNodes);

            let nodes = treeNodes;
            let lastIndex = path.pop();
            for (let index of path) {
                nodes = nodes[index].children;
            }
            nodes[lastIndex].title = inputValue;

            setTreeNodes([...treeNodes]);
        }
        currentNode.key = "";
    };

    const handleConfirmInput = async () => {
        setShowInput(false);
        setInputValue("");
        setShowMasking(false);

        if (!inputValue)
            return;
        let parent = "";
        if (currentNode.key) {
            parent = currentNode.key as string;
        }

        if (handleType === EInputHandleType.Add) {
            await AddCategory(inputValue, parent);
        }
        else {
            await UpdateCatecory(inputValue);
        }

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue((e.target as HTMLInputElement).value);
    };

    const handleClickContainer = (event: React.MouseEvent) => {
        Object.assign(rightClickNodeTreeItem, {
            pageX: event.pageX,
            pageY: event.pageY,
        });
        if (isSelectNode) {
            isSelectNode = false;
            setSelectedKeys([]);
            currentNode.key = "";
            return;
        }
        if (event.button === 2) {
            setShowContextmMenu(true);
            setShowMasking(true);
            return;
        }
        setSelectedKeys([]);
        currentNode.key = "";
    };

    const updateNodes = (categorys: ICategorys[]) => {
        let nodes: DataNode[] = [];
        for (let cg of categorys) {
            nodes.push({
                key: cg.id,
                title: cg.title,
                children: updateNodes(cg.children),
            });
        }
        return nodes;
    };

    const handleDeleteCategory = async (e: React.MouseEvent) => {
        setShowContextmMenu(false);
        e.stopPropagation();
        if (currentNode.key) {

            let res = await DeleteReq(ReqApi.DeleteCategory, { id: currentNode.key });
            if (res.code === RequestStatus.Ok) {
                message.success("该分类删除成功");
                deleteNodes();
            }
        }
        else {
            message.error("没选中分类");
        }
    };

    const deleteNodes = () => {
        let path = getNodesPathNum(currentNode, treeNodes);

        let nodes = treeNodes;
        let lastIndex = path.pop();
        for (let index of path) {
            nodes = nodes[index].children;
        }
        nodes.splice(lastIndex, 1);

        setTreeNodes([...treeNodes]);
    };

    useEffect(() => {
        Get(ReqApi.GetCategorys).then(data => {
            if (data.code === RequestStatus.Ok) {
                setTreeNodes(updateNodes(data.data));
            }
        });
    }, []);

    return (
        <div style={{ width: "100%", height: "100%" }} onMouseDown={handleClickContainer}>
            <Tree
                checkable={false}
                showLine
                selectedKeys={selectedKeys}
                expandedKeys={expandedKeys}
                onSelect={onSelect}
                treeData={treeNodes}
                onRightClick={onRightClick}
                onExpand={onExpand}
            />
            {
                renderContextMenu()
            }
            {
                showInput && <div style={{ ...tmpStyle, width: "200px", display: "flex" }} onMouseDown={e => e.stopPropagation()}>
                    <Input
                        value={inputValue}
                        onPressEnter={handleConfirmInput}
                        onChange={handleChange}
                        autoFocus
                        ref={inputEl}
                    />
                    <Button
                        icon={<CheckOutlined />}
                        onClick={handleConfirmInput}
                    />
                </div>
            }
            {
                showMasking && <div className="masking" onClick={clickMasking}></div>
            }
        </div>

    );
}
