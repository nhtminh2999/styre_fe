import { notification } from 'antd'

export const openSuccessNotification = ({ message = 'Success', description }) => {
  notification.success({
    message,
    description,
    placement: 'topRight',
    duration: 3
  })
}

export const openErrorNotification = ({ message = 'Error', description }) => {
  notification.error({
    message,
    description,
    placement: 'topRight',
    duration: 3
  })
}
