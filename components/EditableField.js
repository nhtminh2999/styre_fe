import { useState, useEffect, useCallback, useRef } from 'react'
import { Form, Input } from 'antd'
import { CheckOutlined, CloseOutlined, EllipsisOutlined } from '@ant-design/icons'

function EditableField({ issueListname, quantity = 0 }) {
  const [isEdit, setIsEdit] = useState(false)
  const [name, setName] = useState(issueListname)
  const [form] = Form.useForm()
  const inputRef = useRef(null)
  const wrapperRef = useRef(null)

  const handleClickOutSide = useCallback(
    e => {
      if (isEdit && wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setName(form.getFieldValue('name'))
        setIsEdit(false)
      }
    },
    [form, isEdit]
  )

  const handleEditable = e => {
    e.stopPropagation()
    form.setFieldsValue({ name })
    setIsEdit(true)
  }

  const handleFinish = values => {
    if (values.name) {
      setName(values.name)
      setIsEdit(false)
    } else {
      setIsEdit(false)
    }
  }

  const handleCloseEdit = e => {
    e.stopPropagation()
    setIsEdit(false)
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutSide)

    return () => {
      document.addEventListener('click', handleClickOutSide)
    }
  }, [handleClickOutSide])

  useEffect(() => {
    if (isEdit && inputRef.current) inputRef.current.focus()
  }, [isEdit])

  return (
    <div className="border-2 border-solid border-transparent">
      <div className={`${isEdit ? 'hidden' : 'flex'} justify-between items-center group`}>
        <div
          className="flex flex-1 space-x-1 transition-all duration-100 ease-linear 
          hover:bg-[rgb(235,236,240)] hover:cursor-pointer"
        >
          <div className="uppercase">{name}</div>
          <div className="uppercase">
            {quantity === 1 ? `${quantity} issue` : quantity > 1 ? `${quantity} issues` : ''}
          </div>
        </div>
        <div
          className="opacity-0 flex justify-center items-center w-5 h-full 
            group-hover:opacity-100 hover:opacity-100 hover:bg-[rgb(235,236,240)]"
        >
          <EllipsisOutlined style={{ fontSize: '16px', display: 'block', cursor: 'pointer' }} />
        </div>
      </div>
      <div ref={wrapperRef}>
        <Form form={form} name="editable-form" className={`${isEdit ? 'block' : 'hidden'}`} onFinish={handleFinish}>
          <div className="relative">
            <Form.Item name="name" initialValue={name}>
              <Input ref={inputRef} />
            </Form.Item>
            <div className="absolute flex justify-end items-center w-full h-full -bottom-[110%] right-0 space-x-1 z-10">
              <button
                type="submit"
                className="w-10 h-7 flex items-center justify-center bg-[rgba(244,245,247,0.5)] 
                  rounded-md shadow-md cursor-pointer hover:bg-[rgba(244,245,247,1)]"
              >
                <CheckOutlined style={{ fontSize: '12px' }} />
              </button>
              <button
                onClick={handleCloseEdit}
                className="w-10 h-7 flex items-center justify-center bg-[rgba(244,245,247,0.5)] 
                  rounded-md shadow-md cursor-pointer hover:bg-[rgba(244,245,247,1)]"
              >
                <CloseOutlined style={{ fontSize: '12px' }} />
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default EditableField
