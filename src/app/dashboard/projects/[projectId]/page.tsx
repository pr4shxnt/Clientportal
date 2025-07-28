// app/dashboard/projects/[projectId]/page.tsx
import ClientPage from "./ClientPage";

export default async function Page({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  return <ClientPage projectId={projectId} />;
}