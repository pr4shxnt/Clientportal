export default function ProjectPage({
  params,
}: {
  params: { projectId: string };
}) {
  return (
    <main className="">
      <p>Project ID: {params.projectId}</p>
    </main>
  );
}
