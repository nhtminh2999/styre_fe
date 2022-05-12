import React from 'react'
import Link from 'next/link'
import { Avatar, Table } from 'antd'
import ProjectDelete from './ProjectDelete'
import { getFirstLetterOfWord } from '../../shared/utils/method'

const columns = [
  {
    width: 300,
    title: 'Name',
    dataIndex: 'name',
    render(_, record) {
      return (
        <Link href={`/styre/project/${record._id}/board`}>
          <a className="text-[#38b6ff] hover:underline">{record.name}</a>
        </Link>
      )
    },
    sortDirections: ['ascend', 'descend', 'ascend'],
    showSorterTooltip: false,
    sorter(a, b) {
      return a.name.localeCompare(b.name)
    }
  },
  {
    width: 200,
    title: 'Key',
    dataIndex: 'key',
    sortDirections: ['ascend', 'descend', 'ascend'],
    showSorterTooltip: false,
    sorter(a, b) {
      return a.name.localeCompare(b.key)
    }
  },
  {
    width: 200,
    title: 'Members',
    dataIndex: 'members',
    render(data) {
      return <span className="text-center">{data.length}</span>
    }
  },
  {
    width: 200,
    title: 'Lead',
    dataIndex: 'leader',
    render(data) {
      return (
        <div className="flex space-x-2">
          <Avatar style={{ backgroundColor: data.color }} className="relative z-[1] align-middle" size="small">
            {getFirstLetterOfWord(`${data.firstName} ${data.lastName}`)}
          </Avatar>
          <span>{`${data.firstName} ${data.lastName}`}</span>
        </div>
      )
    }
  },
  {
    width: 50,
    title: '',
    dataIndex: '_id',
    render(id) {
      return <ProjectDelete id={id} />
    }
  }
]

function ProjectList({ onChange, dataSource = [], total = 1, pageSize, current }) {
  return (
    <Table
      className="project-list"
      columns={columns}
      dataSource={dataSource}
      pagination={{
        total,
        current,
        showSizeChanger: true,
        pageSize,
        onChange: onChange,
        pageSizeOptions: ['10', '20', '30', '40']
      }}
    />
  )
}

export default ProjectList
