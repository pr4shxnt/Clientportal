import {GitGraph} from "./GitGraph"
import GitActivity from "./GitActivity"

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>
}) {
  const { projectId } = await params
  return <div className="m-5"> 
  {projectId}
  <GitGraph/>
  <GitActivity/>
  </div>
}