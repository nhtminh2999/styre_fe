import { useState, useEffect, Fragment } from 'react'
import { Modal, Form, Input, Spin } from 'antd'
import { openErrorNotification, openSuccessNotification } from '../../shared/utils/notification'
import { useCreateIssue } from '../../shared/hook/useCreateIssue'

function IssueCreate(props) {
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const { mutate: createIssue, isLoading, data: createIssueData } = useCreateIssue(props.projectKey)

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
      values.workflow = props.workflowID
      createIssue(values)
      handleCancel()
    } catch (error) {
      // TO DO
    }
  }
  return (
    <>
      <div
        className="border-2 rounded-md border-solid border-transparent my-2 py-1 px-2 opacity-0 
          hover:opacity-100 hover:bg-[rgba(9,30,66,0.08)] hover:cursor-pointer"
        onClick={handleOpen}
      >
        + Create issue
      </div>
      <Modal
        visible={visible}
        title="Create a new issue"
        cancelText="Cancel"
        onCancel={handleCancel}
        forceRender
        destroyOnClose
        footer={[
          <Fragment key="submit">
            <button
              className="px-[10px] py-1 font-bold leading-loose border transition-all duration-300 ease-linear rounded
                border-solid border-[#38b6ff] bg-[#38b6ff] text-white"
              onClick={handleFinish}
            >
              Create
            </button>
          </Fragment>
        ]}
      >
        <Form form={form} layout="vertical" name="create-issue-form" requiredMark={false}>
          <Form.Item
            name="shortSummary"
            label="Short summary"
            initialValue={null}
            className="create-project-label"
            hasFeedback
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input className="" allowClear />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default IssueCreate
