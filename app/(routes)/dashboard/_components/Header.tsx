import {Search, Send} from "lucide-react";
import {Input} from "@/components/ui/input";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import {Button} from "@/components/ui/button";

export default function Header(){
    const {user} : any = useKindeBrowserClient();
    return(
        <>
            <div className={'flex justify-end w-full gap-2 items-center'}>
                <div className={'flex gap-2 items-center'}>
                    <Search className={'h-4'}/>
                    <Input placeholder='Search'/>
                </div>
                    <Image className={'rounded-full'}
                    src={user?.picture}
                    alt={'user'} height={30} width={30}
                    />
                <Button className={'flex text-sm items-center gap-2 bg-blue-600 hover:bg-blue-700'}> <Send className={'h-4 w-4'}/> Invite </Button>
            </div>
        </>
    )
};