import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import ProtectedRoute from '../../../../components/ProtectedRoute'
import Header from '../../../../components/Layout/Header'
import Sidebar from '../../../../components/Sidebar'
import Board from '../../../../components/Board/Board'
import { projectService } from '../../../../service/Project.Service'

function ProjectDetail() {
  const { query } = useRouter()
  const [project, setProject] = useState(null)

  useEffect(() => {
    projectService.searchById(parseInt(query.key, 10)).then(response => {
      setProject(response.result)
    })
  }, [query.key])

  if (!project) return <></>

  return (
    <ProtectedRoute>
      <Head>
        <title>{project.key} board | Styre</title>
      </Head>

      <Header />
      <main className="flex flex-col w-full h-[calc(100vh-56px)]">
        <div className="flex h-full">
          <Sidebar name={project.name} />
          <Board project={project} />
        </div>
      </main>
    </ProtectedRoute>
  )
}

export default ProjectDetail
