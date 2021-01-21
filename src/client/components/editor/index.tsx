import React, { useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { CURRENT_HOST, Post } from '../../utils/request';
import { UploadImgUrl } from '../../utils/api';

interface IEditorProps {
    option: { content: string; };
}

const CommonEdiror = React.forwardRef((props: IEditorProps, ref: React.MutableRefObject<Editor>) => {

    const addImgToMd = (data) => {
        console.log('data: ', data);
        const editorIntance = ref.current.getInstance();
        const editor = editorIntance.getCodeMirror();
        editorIntance.insertText(editor.getValue() + `![img](${data})`);
    };
    const addImageBlobHook = async (
        blob: Blob | File,
        callback: (url: string, altText?: string) => void
    ) => {
        let url = await uploadImg(blob);
        //alttext不传则为输入的描述信息
        if (url)
            callback(url);
    };

    const uploadImg = async (blob: Blob, isInsert = false) => {
        const formdata = new FormData();
        formdata.append("files", blob);

        let res = await Post(UploadImgUrl, formdata);
        if (res.code === 200) {
            let url = "https://www.dodream.wang" + res.data.url;
            if (isInsert)
                addImgToMd(url);
            return url;
        }
        return null;
    };

    useEffect(() => {
        const editorIntance = ref.current.getInstance();
        editorIntance.addHook('paste', (info: { data: ClipboardEvent; }) => {

            const clipboardData = info.data.clipboardData;
            if (clipboardData.items) {
                const items = clipboardData.items;

                const len = items.length;
                let blob = null;
                // info.data.preventDefault();
                // 在items里找粘贴的image,据上面分析,需要循环
                for (let i = 0; i < len; i++) {
                    if (items[i].type.includes('image')) {
                        blob = items[i].getAsFile();
                    }
                    else
                        items[i].getAsString((str) => {
                            if (str.startsWith("<html>") && str.includes("<img")) {
                                let srcIndex = str.indexOf("src=");
                                let altIndex = str.indexOf("alt=");
                                let titleIndex = str.indexOf("title=");
                                let stylendex = str.indexOf("style=");
                                let src: string;
                                let alt: string;
                                let title: string;
                                if (srcIndex != -1)
                                    src = str.slice(srcIndex + 5, altIndex - 2).trim();
                                if (altIndex != -1)
                                    alt = str.slice(altIndex + 5, titleIndex - 2).trim();
                                if (titleIndex != -1)
                                    title = str.slice(titleIndex + 6, stylendex).trim();

                                editorIntance.insertText(`![${alt}](${src} ${title})`);
                            }
                        });
                }
                if (blob !== null) {
                    uploadImg(blob, true);
                }
            }
        });
    });

    return (
        <Editor
            initialValue={props.option.content}
            previewStyle="vertical"
            height="600px"
            initialEditType="markdown"
            useCommandShortcut={true}
            ref={ref}
            hooks={
                {
                    addImageBlobHook
                }
            }
            hideModeSwitch
        />
    );
});

export default CommonEdiror;