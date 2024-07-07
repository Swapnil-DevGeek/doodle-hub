"use client";
import {Excalidraw, MainMenu, WelcomeScreen} from "@excalidraw/excalidraw";
import {FILE} from "@/app/(routes)/dashboard/_components/FileList";
import {useEffect, useState} from "react";
import {useMutation} from "convex/react";
import {api} from "@/convex/_generated/api";

export default function Canvas({onSaveTrigger,fileId,fileData}: { onSaveTrigger:any,fileId:any,fileData:FILE}){
    const [whiteboardData,setWhiteboardData] = useState<any>()

    const updateWhiteboard= useMutation(api.files.updateWhiteboard);

    useEffect(() => {
        onSaveTrigger && saveWhiteboard();
    }, [onSaveTrigger]);

    const saveWhiteboard = ()=>{
        updateWhiteboard({
            _id: fileId,
            whiteboard : JSON.stringify(whiteboardData),
        }).then((res)=>{
            console.log(res);
        })
    }

    return (
        <>
            <div className={'h-[650px]'}>
                {fileData && <Excalidraw
                    initialData={{
                        elements: fileData.whiteboard && JSON.parse(fileData.whiteboard)
                    }}
                    onChange={(excalidrawElements, appState, files) =>
                        setWhiteboardData(excalidrawElements)}>
                    <MainMenu>
                        <MainMenu.DefaultItems.LoadScene/>
                        <MainMenu.DefaultItems.Export/>
                        <MainMenu.DefaultItems.SaveAsImage/>
                        <MainMenu.DefaultItems.Help/>
                        <MainMenu.DefaultItems.ClearCanvas/>
                        <MainMenu.Separator/>
                        <MainMenu.DefaultItems.ChangeCanvasBackground/>
                        <MainMenu.DefaultItems.ToggleTheme/>
                    </MainMenu>
                    <WelcomeScreen>
                        <WelcomeScreen.Hints.ToolbarHint/>
                        <WelcomeScreen.Hints.MenuHint/>
                        <WelcomeScreen.Hints.HelpHint/>
                        <WelcomeScreen.Center>
                            <svg width="68" height="36" xmlns="http://www.w3.org/2000/svg">
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
                            <WelcomeScreen.Center.Heading>
                                Welcome To DoodleHub!
                            </WelcomeScreen.Center.Heading>
                            <WelcomeScreen.Center.Menu>
                                <WelcomeScreen.Center.MenuItemLoadScene/>
                                <WelcomeScreen.Center.MenuItemHelp/>
                            </WelcomeScreen.Center.Menu>
                        </WelcomeScreen.Center>
                    </WelcomeScreen>
                </Excalidraw>}
            </div>
        </>
    )
}