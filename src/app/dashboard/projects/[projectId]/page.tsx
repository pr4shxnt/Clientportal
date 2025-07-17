import React from 'react';

interface ProjectPageProps {
  params: {
    projectId: string;
  };
}

const ProjectPage = ({ params }: ProjectPageProps) => {
  return (
    <main className=''>
      <p>Project ID: {params.projectId}</p>
    </main>
  );
};

export default ProjectPage;
