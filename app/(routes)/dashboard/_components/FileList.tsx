"use client";
import {useContext, useEffect, useState} from "react";
import {useRouter} from "next/navigation"
import {FilesListContext} from "@/app/_context/FilesListContext";
import moment from "moment";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import {Archive, MoreHorizontal} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface FILE {
    archive : boolean,
    createdBy : string,
    document : string,
    fileName : string,
    teamId: string,
    whiteboard: string,
    _id : string,
    _creationTime : number
}

export default function FileList(){
    const {fileList_, setFileList_} = useContext(FilesListContext);
    const [fileList, setFileList] = useState<FILE[]>(fileList_ || []);
    const router = useRouter();
    const {user} : any = useKindeBrowserClient();

    useEffect(() => {
        if (fileList_) {
            setFileList(fileList_);
        }
    }, [fileList_]);
    return(
        <div className="mt-10 overflow-x-auto">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                <thead className="ltr:text-left rtl:text-right">
                <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created At</td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Edited</td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Author</td>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Actions</td>
                </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                {fileList && fileList.map((file: FILE, index: number) => (
                    <tr onClick={()=>router.push('/workspace/'+file._id)} key={file._id} className="cursor-pointer odd:bg-gray-50">
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{file.fileName}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {moment(file._creationTime).format("DD MMM YYYY")}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            {moment(file._creationTime).format("DD MMM YYYY")}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            <Image className="rounded-full"
                                   src={user?.picture}
                                   alt="user" height={30} width={30}
                            />
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreHorizontal />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel className="gap-3 flex items-center">
                                        <Archive className="h-4 w-4" /> Archive
                                    </DropdownMenuLabel>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
