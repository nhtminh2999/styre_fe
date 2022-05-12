import { useState } from 'react'
import Head from 'next/head'
import { useProjects } from '../../../shared/hook/useProjects'
import { useDebounce } from '../../../shared/hook/useDebounce'
import { useStore } from '../../../zustand/store'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Header from '../../../components/Layout/Header'
import ProjectList from '../../../components/Project/ProjectList'
import ProtectedRoute from '../../../components/ProtectedRoute'
import ProjectCreate from '../../../components/Project/ProjectCreate'

function ProjectPage() {
  const title = 'Projects - Styre'
  const [page, setPage] = useStore(state => [state.projectListPage, state.setProjectListPage])
  const [limit, setLimit] = useStore(state => [state.projectListLimit, state.setProjectListLimit])
  const [search, setSearch] = useStore(state => [state.projectListSearch, state.setProjectListSearch])
  const debouncedSearch = useDebounce(search, 500)
  const { data } = useProjects(page, limit, debouncedSearch)

  const handleSearchChange = e => {
    setSearch(e.target.value)
  }

  const handlePagination = (page, pageSize) => {
    setPage(page)
    setLimit(pageSize)
  }

  return (
    <ProtectedRoute>
      <Head>
        <title>{title}</title>
      </Head>

      <Header />

      <main className="bg-white flex flex-col w-full h-[calc(100vh-56px)] pt-6 px-10">
        <div className="flex justify-between items-center w-full">
          <h1 className="mb-0 text-[24px] font-medium">Projects</h1>
          <ProjectCreate page={page} limit={limit} search={search} />
        </div>
        <div className="my-8">
          <Input className="max-w-[184px]" allowClear suffix={<SearchOutlined />} onChange={handleSearchChange} />
        </div>
        <div>
          <ProjectList
            dataSource={data?.result?.docs}
            total={data?.result?.totalDocs}
            onChange={handlePagination}
            pageSize={limit}
            current={page}
          />
        </div>
      </main>
    </ProtectedRoute>
  )
}

export default ProjectPage
