"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Create() {
    const router = useRouter();
    const [teamName, setTeamName] = useState("");
    const createTeam = useMutation(api.teams.createTeam);
    const {user } = useKindeBrowserClient();

    const createNewTeam = () => {
        console.log("User object:", user);
        console.log("User email:", user?.email);

        if (!user?.email) {
            toast("User email is missing. Please log in again.");
            return;
        }

        createTeam({
            teamName: teamName,
            createdBy: user.email
        })
            .then((res) => {
                console.log(res);
                if (res) {
                    router.push('/dashboard');
                    toast("Team has been created successfully!");
                }
            })
            .catch((error) => {
                console.error("Error creating team:", error);
                toast("Failed to create team. Please try again.");
            });
    };

    return (
        <div className="px-10 md:px-16 my-20">
            <svg width="200" height="50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0)" fillRule="evenodd" clipRule="evenodd">
                    <path
                        d="M36.77 35.77H31a1.9 1.9 0 01-1.9-1.9v-14a10 10 0 00-9.4-10.05 9.8 9.8 0 00-10.15 9.8v14.89a1.25 1.25 0 01-1.26 1.26h-7A1.259 1.259 0 010 34.51V20A19.59 19.59 0 0118.9.26a19.36 19.36 0 0119.77 19.35v14.26a1.91 1.91 0 01-1.9 1.9z"
                        fill="#3767F6"
                    />
                    <path
                        d="M66.75 35.77h-7.44a.999.999 0 01-1.05-1.05V19.87a10 10 0 00-9.43-10.06 9.81 9.81 0 00-10.15 9.8V33.7a2.07 2.07 0 01-2.06 2.07h-5.39a2.1 2.1 0 01-2.09-2.09V20A19.59 19.59 0 0148 .26a19.36 19.36 0 0119.8 19.35v15.11a1.06 1.06 0 01-1.05 1.05z"
                        fill="#F63767"
                    />
                    <path
                        d="M38.67 19.61c0-4.2-2.41-9.46-4.7-12.64 0 0-.55.63-1.08 1.38A19.93 19.93 0 0029.15 20v14.43a1.33 1.33 0 001.33 1.34h6.86a1.34 1.34 0 001.34-1.34V19.61h-.01z"
                        fill="#214BC7"
                    />
                </g>
                <defs>
                    <clipPath id="clip0">
                        <path fill="#fff" d="M0 0h68v36H0z" />
                    </clipPath>
                </defs>
            </svg>

            <div className="flex flex-col items-center mt-8">
                <h2 className="font-bold text-[40px] py-3">What should we call your team?</h2>
                <h2 className="text-gray-500">You can always change this later from settings.</h2>

                <div className="mt-7 w-[40%]">
                    <label className="text-gray-500">Team Name</label>
                    <Input
                        onChange={(e) => setTeamName(e.target.value)}
                        placeholder="Team Name"
                        className="mt-3"
                    ></Input>
                </div>
                <Button
                    onClick={createNewTeam}
                    disabled={!teamName}
                    className="bg-blue-500 hover:bg-blue-700 mt-9 w-[40%]"
                >
                    Create Team
                </Button>
            </div>
        </div>
    );
}
