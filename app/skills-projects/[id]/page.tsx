"use client"

import React, { useEffect, useState } from 'react';
import projectsData from "@/app/data/projects.json";
import { useRouter } from 'next/navigation'

type ProjectType = {
    id: number;
    title: string;
    description: string;
    tags: string[];
    github: string;
    url: string;
};

function page({params} : any) {
    const [project, setProject] = useState<ProjectType>();
    const router = useRouter();
    const {id} = params;
    useEffect(() => {
        const foundProject = projectsData.projects.find((project) => project.id == id) as ProjectType;
        if (!foundProject) {
            router.push("/skills-projects");
        } else {
            setProject(foundProject);
        }
    }, [id])
    return (
        <div className="min-h-screen max-h-full pt-[120px] pb-[100px] w-full mx-5">
          {project && <div className='text-[50px]'>{project.title}</div> }
        </div>
    );
}

export default page;