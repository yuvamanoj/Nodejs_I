import React from 'react';
import { InlineNotification } from 'carbon-components-react';

import './notification.scss'

const Notification = (props) => {
    const onCloseClick = () => {
      props.handleNotification();
    }

    return (
        <InlineNotification
          kind="success"
          className="alert-notification"
          title="Congratulations!!"
          subtitle={<span>Your request has been submitted successfully!</span>}
          onCloseButtonClick={onCloseClick}
        />
    )
}

export default Notification;