"use client";
import WorkspaceHeader from "@/app/(routes)/workspace/_components/WorkspaceHeader";
import Editor from "@/app/(routes)/workspace/_components/Editor";
import {useEffect, useState} from "react";
import {useConvex} from "convex/react";
import {api} from "@/convex/_generated/api";
import {FILE} from "@/app/(routes)/dashboard/_components/FileList";
import Canvas from "@/app/(routes)/workspace/_components/Canvas";

export default function Workspace({params}: any){
    const [save,setSave] = useState<boolean>(false);
    const convex = useConvex();
    const [fileData,setFileData] = useState<FILE|any>();

    useEffect(() => {
        params.fileId && getFileData();
    }, []);

    const getFileData = async ()=> {
        const result = await convex.query(api.files.getFileById,{_id : params.fileId});
        setFileData(result);
    }

    return(
        <>
           <div>
               <WorkspaceHeader
                   fileName={fileData ? fileData.fileName : "File"}
                   onSave={()=>setSave(!save)}/>

               <div className={'grid grid-cols-1 md:grid-cols-5'}>

               {/* document*/}
                   <div className={'h-screen px-10 col-span-2'}>
                       <Editor
                           fileData={fileData}
                           fileId={params.fileId}
                           onSaveTrigger={save}/>
                   </div>

               {/*canvas*/}
                   <div className={'h-screen border-l col-span-3'}>
                       <Canvas
                           fileData={fileData}
                           fileId={params.fileId}
                           onSaveTrigger={save}
                       />
                   </div>

               </div>

           </div>
        </>
    )
}