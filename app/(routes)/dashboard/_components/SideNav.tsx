import {ChevronDown, LayoutGrid, LogOut, Settings, Users} from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {LogoutLink, useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import {Separator} from "@/components/ui/separator";
import Image from "next/image";
import {useConvex} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

export interface TEAM {
    _id : String,
    createdBy : String,
    teamName : String
}

export default function SideNav(){
    const menu = [
        {
            id: 1,
            name : 'Create Team',
            path : '/teams/create',
            icon : Users
        },
        {
            id : 2,
            name : 'Settings',
            path : '',
            icon : Settings
        }
    ]
    const convex = useConvex();
    const router = useRouter();
    const [teamList,setTeamList] = useState<TEAM[]>();
    const [activeTeam,setActiveTeam] = useState<TEAM>()
    const {user}: any = useKindeBrowserClient();

    useEffect(()=>{
        if(user){
            getTeams();
        }
    },[user]);

    const getTeams = async ()=> {
        const result = await convex.query(api.teams.getTeam,{email : user?.email});
        setTeamList(result);
        setActiveTeam(result[0]);
        console.log(result);
    }

    const onMenuClick = (item:any)=>{
        if(item.path){
            router.push(item.path);
        }
    }

    return (
        <div className=" h-screen fixed w-72 border-r p-6 flex flex-col ">
            <div className='flex-1'>
                <Popover>
                    <PopoverTrigger>
                        <div className="flex items-center gap-3 hover:bg-slate-200 rounded-md p-2 cursor-pointer">
                            <svg width="68" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0)" fill-rule="evenodd" clip-rule="evenodd">
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
                            <h2 className="flex items-center gap-1 font-bold">
                                {activeTeam?.teamName}
                                <ChevronDown/>
                            </h2>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="ml-7 p-4">
                        <div>
                            {teamList?.map((team,index)=> (
                                <h2 className={`p-2 hover:bg-blue-500 hover:text-white rounded-lg mb-1 cursor-pointer
                                ${activeTeam?._id === team._id && 'bg-blue-500 text-white'}`}
                                    onClick={()=>setActiveTeam(team)}
                                    key={index}>{team.teamName}
                                </h2>
                            ))}
                            <Separator className="mt-2 bg-slate-100" />

                            <div>
                                {menu.map((item,index)=>(
                                    <h2
                                        onClick={()=>onMenuClick(item)}
                                        key={index}
                                        className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg text-sm cursor-pointer">
                                        <item.icon className="h-4 w-4"></item.icon>
                                        {item.name}
                                    </h2>
                                ))}
                                <LogoutLink>
                                    <h2 className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg text-sm cursor-pointer">
                                        <LogOut className="h-4 w-4"></LogOut>
                                        Logout
                                    </h2>
                                </LogoutLink>
                            </div>

                            <Separator className="mt-2 bg-slate-100"/>

                            {user && <div className="mt-2 flex gap-2 items-center">
                                <Image className="rounded-full"
                                       src={user.picture} alt='user'
                                       width={30}
                                       height={30}
                                />
                                <div >
                                    <h2 className='text-[14px] font-bold'>{user?.given_name} {user?.family_name}</h2>
                                    <h2 className='text-[14px] text-gray-500'>{user?.email}</h2>
                                </div>
                            </div>}

                        </div>

                    </PopoverContent>
                </Popover>

                <Button variant='outline' className='w-full flex justify-start gap-2 mt-8 font-bold bg-gray-100 border-[1px]'>
                    <LayoutGrid/>
                    All Files
                </Button>

            </div>

            <div>

                <Button className='w-full justify-start bg-blue-600 hover:bg-blue-700'>New File</Button>

                <div className='h-4 w-full bg-gray-200 rounded-full mt-5'>
                    <div className='h-4 w-[40%] bg-blue-600 rounded-full'>
                    </div>
                </div>

                <h2 className='text-[12px] mt-3'>
                    <strong>1</strong> out of <strong>5</strong> files used
                </h2>
                <h2 className='text-[12px] mt-1'><span className='underline'>Upgrade</span> your plan for unlimited access!</h2>
            </div>

        </div>
    )
}