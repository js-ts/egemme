import React from 'react'
import { Alert } from 'react-bootstrap'

interface IMessage {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light';

  children: React.ReactNode;
}
const Message = ({ variant, children }: IMessage) => {
  return <Alert variant={variant}>{children}</Alert>
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
