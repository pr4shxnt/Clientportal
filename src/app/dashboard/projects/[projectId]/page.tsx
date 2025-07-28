import ClientPage from "./ClientPage";

export default function Page({ params }: { params: { projectId: string } }) {
  const {projectId} =  params ;
  return <ClientPage projectId={projectId} />;
}
