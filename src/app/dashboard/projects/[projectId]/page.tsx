import {GitGraph} from "./GitGraph"

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  return <div className="m-5"> 
  {projectId}
  <GitGraph/>
  </div>
}