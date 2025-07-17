
interface ProjectPageProps {
  params: {
    projectId: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <main className="">
      <p>Project ID: {params.projectId}</p>
    </main>
  );
}
