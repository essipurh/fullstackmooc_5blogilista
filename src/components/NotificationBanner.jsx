import { useState, useImperativeHandle, forwardRef } from 'react'

const Notification = forwardRef(( _, ref) => {
  const [notification, setNotification] = useState(null)

  const notificationMessages = (messagesList, msgType) => {
    const messagesString = messagesList.map(er => er.message).join(' ')
    setNotification({ type: msgType, message: messagesString })
    setTimeout(() => { setNotification(null) }, 5000)
  }
  useImperativeHandle(ref, () => {
    return {
      notificationMessages
    }
  })

  if (!notification) { return null }
  return (
    <div className={notification.type}>
      {notification.message}
    </div>
  )
})

Notification.displayName = 'Notification'

export default Notification