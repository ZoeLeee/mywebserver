import { DataNode } from "antd/lib/tree";
import { ICategorys } from "../components/category";

export function getNodesPathNum(node: DataNode, nodes: DataNode[]) {
    if (!node) return [];
    let pathNums: number[] = [];
    if (!nodes) nodes = [];
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].key === node.key) {
            pathNums.push(i);
            break;
        }
        else {
            let ss = getNodesPathNum(node, nodes[i].children);
            if (ss.length === 1) {
                pathNums.push(i, ss[0]);
            }
        }
    }
    return pathNums;
}

export function getCategorysInfoByKey(key: string, nodes: ICategorys[]) {
    if (!key) return null;
    let pathNums: number[] = [];
    if (!nodes) nodes = [];
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === key) {
            pathNums.push(i);
            break;
        }
        else {
            let d = getCategorysInfoByKey(key, nodes[i].children);
            if (d.length === 1) {
                pathNums.push(i, d[0]);
            }
        }
    }
    return pathNums;
}