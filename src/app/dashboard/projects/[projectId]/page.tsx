import React from 'react';

interface ProjectPageProps {
    params: {
        projectId: string;
    };
}

const ProjectPage = async ({ params }: ProjectPageProps) => {
    const awaitedParams = await params;
    return (
        <main className='max-w-screen'>
            <p>Project ID: {awaitedParams.projectId}</p>
        </main>
    );
};

export default ProjectPage;