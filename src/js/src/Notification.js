import { notification } from 'antd';

const Notification = (type,message,description) => {
    notification[type]({
        message: message,
        description:
        description,
        onClick: () => {
         
        },
      });
}

export const SuccessNotification = (message,description) =>{
    Notification('success',message,description)
}


export const InfoNotification = (message,description) =>{
    Notification('info',message,description)
}

export const ErrorNotification = (message,description) =>{
    Notification('error',message,description)
}

export const WarningNotification = (message,description) =>{
    Notification('warning',message,description)
}

