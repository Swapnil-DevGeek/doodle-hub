"use client";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import {useEffect, useState} from "react";
import {useConvex} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useRouter} from "next/navigation";
import SideNav from "@/app/(routes)/dashboard/_components/SideNav";
import {FilesListContext} from "@/app/_context/FilesListContext";

export default function DashboardLayout(
{
    children,}: Readonly<{
    children: React.ReactNode;
}>)
{
    const [fileList_,setFileList_] = useState();
    const router = useRouter();
    const convex = useConvex();
    const {user}:any= useKindeBrowserClient();
    useEffect(()=>{
        if(user){
            checkTeam();
        }
    },[user]);

    const checkTeam = async ()=>{
        const result = await convex.query(api.teams.getTeam,{email : user?.email});
        if(!result?.length){
            router.push('/teams/create');
        }
    }

    return(
        <div>
            <FilesListContext.Provider value={{fileList_,setFileList_}}>
            <div className="grid grid-cols-4">
                <div className='h-screen w-64 fixed'>
                    <SideNav/>
                </div>
                <div className="col-span-4 ml-72">
                {children}
                </div>
            </div>
            </FilesListContext.Provider>
        </div>
    )
}