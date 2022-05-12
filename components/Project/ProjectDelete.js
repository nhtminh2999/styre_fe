import { useState, useEffect, memo } from 'react'
import { Modal } from 'antd'
import { ExclamationCircleOutlined, DeleteFilled } from '@ant-design/icons'
import { useRemoveProject } from '../../shared/hook/useRemoveProject'
import { useStore } from '../../zustand/store'
import { openErrorNotification, openSuccessNotification } from '../../shared/utils/notification'

const ModalTitle = memo(() => {
  return (
    <div className="flex space-x-2 items-center">
      <ExclamationCircleOutlined style={{ color: 'rgb(222, 53, 11)', fontWeight: 700, fontSize: '16px' }} />
      <span>Delete permanently ?</span>
    </div>
  )
})

const ProjectDelete = props => {
  const [visible, setVisible] = useState(false)
  const [page, limit, search] = useStore(state => [
    state.projectListPage,
    state.projectListLimit,
    state.projectListSearch
  ])
  const { mutate: deleteProject, data } = useRemoveProject(page, limit, search)

  const handleOpen = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const handleSubmit = () => {
    try {
      deleteProject(props.id)
    } catch (error) {
      // TO DO
    }
  }

  useEffect(() => {
    if (data && data.message !== 'SUCCESS') openErrorNotification({ description: data.error })

    if (data && data.message === 'SUCCESS') {
      openSuccessNotification({ description: 'Project deleted successfully' })
      setVisible(false)
    }
  }, [data])

  return (
    <>
      <DeleteFilled style={{ color: 'rgb(222, 53, 11)', cursor: 'pointer', fontSize: '16px' }} onClick={handleOpen} />
      <Modal
        visible={visible}
        destroyOnClose
        title={<ModalTitle />}
        onCancel={handleCancel}
        footer={[
          <button
            key="Save"
            onClick={handleSubmit}
            className="px-[10px] py-1 font-semibold leading-loose border transition-all duration-300 ease-linear rounded
              border-solid border-[rgb(222,53,11)] bg-[rgb(222,53,11)] text-white"
          >
            Delete
          </button>
        ]}
      >
        <div>The project along with its issues, components, attachments, and versions will be deleted permanently.</div>
      </Modal>
    </>
  )
}

export default memo(ProjectDelete)
