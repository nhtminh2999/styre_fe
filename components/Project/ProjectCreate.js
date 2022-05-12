import React, { useState, useEffect } from 'react'
import { useCurrentUser } from '../../shared/hook/useCurrentUser'
import { useCreateProject } from '../../shared/hook/useCreateProject'
import { Modal, Form, Input, Spin } from 'antd'
import { openErrorNotification, openSuccessNotification } from '../../shared/utils/notification'

function ProjectCreate(props) {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const { data } = useCurrentUser()
  const {
    mutate: createProject,
    isLoading,
    data: createProjectData
  } = useCreateProject(props.page, props.limit, props.search)
  const user = data && data?.message === 'SUCCESS' ? data.user : {}

  useEffect(() => {
    form.resetFields()
  }, [form])

  const handleOpen = () => {
    setVisible(true)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const handleFinish = async () => {
    try {
      if (isLoading) return

      const values = await form.validateFields()
      createProject(values)
    } catch (error) {
      // TO DO
    }
  }

  useEffect(() => {
    if (createProjectData && createProjectData.message !== 'SUCCESS')
      openErrorNotification({ description: createProjectData.error })

    if (createProjectData && createProjectData.message === 'SUCCESS') {
      openSuccessNotification({ description: 'Project created successfully' })
      form.resetFields()
      setVisible(false)
    }
  }, [createProjectData, form])

  return (
    <>
      <button
        className="px-[10px] py-[2px] text-[14px] font-medium leading-loose border transition-all duration-300 ease-linear rounded
          border-solid border-[#38b6ff] bg-[#38b6ff] text-white"
        onClick={handleOpen}
      >
        Create project
      </button>
      <Modal
        visible={visible}
        title="Create a new project"
        cancelText="Cancel"
        onCancel={handleCancel}
        forceRender
        footer={[
          <React.Fragment key="submit">
            {isLoading ? (
              <div key="loading" className="mx-auto text-center">
                <Spin />
              </div>
            ) : (
              <button
                key="Save"
                onClick={handleFinish}
                className="px-[10px] py-1 font-bold leading-loose border transition-all duration-300 ease-linear rounded
              border-solid border-[#38b6ff] bg-[#38b6ff] text-white"
              >
                Create
              </button>
            )}
          </React.Fragment>
        ]}
      >
        <Form form={form} layout="vertical" name="create-project-form" requiredMark={false}>
          <Form.Item
            name="name"
            label="Name"
            initialValue={null}
            className="create-project-label"
            hasFeedback
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input className="" allowClear />
          </Form.Item>
          <Form.Item
            name="key"
            label="Key"
            initialValue={null}
            className="create-project-label"
            hasFeedback
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input className="" />
          </Form.Item>
          <Form.Item
            name="lead"
            label="Project Lead"
            initialValue={`${user.firstName} ${user.lastName}`}
            className="create-project-label"
            hasFeedback
          >
            <Input className="" allowClear disabled />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default ProjectCreate
