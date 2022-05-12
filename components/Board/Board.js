import Link from 'next/link'
import { Breadcrumb, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useWorkflows } from '../../shared/hook/useWorkflows'
import { useStore } from '../../zustand/store'
import { useDebounce } from '../../shared/hook/useDebounce'
import Workflows from '../Workflows/Workflows'

function Board({ project }) {
  const { data } = useWorkflows(project.key)
  const workflows = data && data?.message === 'SUCCESS' ? data.result.docs : null

  const [search, setSearch] = useStore(state => [state.issueSearch, state.setIssueSearch])
  const debouncedSearch = useDebounce(search, 500)

  const handleSearchChange = e => {
    setSearch(e.target.value)
  }

  if (!workflows) return <div></div>

  return (
    <div className="flex flex-col w-9/12">
      <div className="flex h-full">
        <div className="w-[3px] bg-divider h-full"></div>
        <div className="p-10 w-full">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link href="/styre/project">
                <a>Project</a>
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link href={`/styre/project/${project._id}/board`}>
                <a>{project.name}</a>
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="my-8">
            <Input className="max-w-[184px]" allowClear suffix={<SearchOutlined />} onChange={handleSearchChange} />
          </div>
          <div>
            <Workflows workflows={workflows} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Board
