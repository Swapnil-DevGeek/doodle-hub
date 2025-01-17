import {Button} from "@/components/ui/button";
import { Link,Save} from "lucide-react";

export default function WorkspaceHeader({onSave,fileName}:any){
    return(
        <div className={'py-3 px-12 border-b flex justify-between items-center'}>
            <div className={'flex items-center gap-4'}>
                <a href='/dashboard'>
                 <svg width="68" height="36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0)" fillRule="evenodd" clipRule="evenodd">
                            <path
                                d="M36.77 35.77H31a1.9 1.9 0 01-1.9-1.9v-14a10 10 0 00-9.4-10.05 9.8 9.8 0 00-10.15 9.8v14.89a1.25 1.25 0 01-1.26 1.26h-7A1.259 1.259 0 010 34.51V20A19.59 19.59 0 0118.9.26a19.36 19.36 0 0119.77 19.35v14.26a1.91 1.91 0 01-1.9 1.9z"
                                fill="#3767F6"/>
                            <path
                                d="M66.75 35.77h-7.44a.999.999 0 01-1.05-1.05V19.87a10 10 0 00-9.43-10.06 9.81 9.81 0 00-10.15 9.8V33.7a2.07 2.07 0 01-2.06 2.07h-5.39a2.1 2.1 0 01-2.09-2.09V20A19.59 19.59 0 0148 .26a19.36 19.36 0 0119.8 19.35v15.11a1.06 1.06 0 01-1.05 1.05z"
                                fill="#F63767"/>
                            <path
                                d="M38.67 19.61c0-4.2-2.41-9.46-4.7-12.64 0 0-.55.63-1.08 1.38A19.93 19.93 0 0029.15 20v14.43a1.33 1.33 0 001.33 1.34h6.86a1.34 1.34 0 001.34-1.34V19.61h-.01z"
                                fill="#214BC7"/>
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <path fill="#fff" d="M0 0h68v36H0z"/>
                            </clipPath>
                        </defs>
                    </svg>
                </a>
                <h2 className={'font-semibold text-lg'}>{fileName}</h2>
            </div>
            <div className={'flex items-center gap-4'}>
                <Button onClick={() => onSave()} className={'h-8 text-[12px] gap-2 bg-yellow-500 hover:bg-yellow-600'}>
                    <Save className={'h-4 w-4'}/> Save</Button>
                <Button className={'h-8 text-[12px] gap-2 bg-blue-600 hover:bg-blue-700'}>Share <Link
                    className={'h-4 w-4'}/></Button>
            </div>
        </div>
    )
}