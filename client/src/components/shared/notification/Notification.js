import React from 'react';
import { InlineNotification } from 'carbon-components-react';

import './notification.scss'

const Notification = (props) => {
    // const onCloseClick = () => {
    //   props.handleNotification();
    // }

    return (
        <InlineNotification
          kind={props.info.type}
          className="alert-notification"
          title={props.info.title}
          subtitle={<span>{props.info.subtitle}</span>}
          // onCloseButtonClick={onCloseClick}
        />
    )
}

export default Notification;