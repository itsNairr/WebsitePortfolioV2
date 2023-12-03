"use client"

import React, { useEffect } from 'react';
import projectsData from "@/app/data/projects.json";
import { useRouter } from 'next/navigation'

function page({params} : any) {
    const router = useRouter();
    const {id} = params;
    useEffect(() => {
    const project = projectsData.projects.find((project) => project.id == id);
    if (!project) {
        router.push("/skills-projects");
    }
    }, [])
    return (
        <div className="min-h-screen max-h-full pt-[120px] pb-[100px] w-full">
            {id}
        </div>
    );
}

export default page;