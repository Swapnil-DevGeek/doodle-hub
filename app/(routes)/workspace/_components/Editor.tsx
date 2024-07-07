"use client";
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';
// @ts-ignore
import Checklist from '@editorjs/checklist';
import {useEffect, useRef, useState} from "react";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";
import {toast} from "sonner";
import {FILE} from "@/app/(routes)/dashboard/_components/FileList";

const rawDocument = {
    "time" : 1550476186479,
    "blocks" : [{
        data : {
            text: "Document Name",
            level: 2
        },
        id : "123",
        type : "header"
    },{
        data : {
            level: 4
        },
        id : "1234",
        type : "header"
    }
    ],
    "version" : "2.8.1"
}

export default function Editor({onSaveTrigger,fileId,fileData}: { onSaveTrigger:any,fileId:any,fileData:FILE}){
    const ref=  useRef<EditorJS>();
    const updateDocument = useMutation(api.files.updateDocument);

    useEffect(() => {
        fileData && initEditor();
    }, [fileData]);

    useEffect(() => {
        console.log('Save Trigger: ',onSaveTrigger);
        onSaveTrigger && onSaveDocument();
    }, [onSaveTrigger]);

    const initEditor = ()=> {
        const editor = new EditorJS({
            tools : {
                header: {
                    //@ts-ignore
                    class :Header,
                    shortcut : 'CMD+SHIFT+H',
                    config : {
                        placeholder : "Enter Header"
                    }
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                },
                checklist : {
                    class : Checklist,
                    inlineToolbar : true,
                }
            },
            holder: 'editorjs',
            data : fileData.document ? JSON.parse(fileData.document) : rawDocument,
        });

        ref.current = editor;
    }

    const onSaveDocument = ()=> {
        if(ref.current){
            ref.current.save().then((outputData)=>{
                console.log("data : ",outputData);
                updateDocument({
                    _id :fileId,
                    document: JSON.stringify(outputData)
                }).then((res)=>{
                    toast("Document Updated!");
                },(e)=>{
                    toast('Server Error!');
                }).catch((e)=>{
                    toast('Server Error!');
                })
            }).catch((error)=>{
                console.log("Saving Failed! ",error);
            });
        }
    }

    return(
        <>
            <div id='editorjs'>

            </div>
        </>
    )
}