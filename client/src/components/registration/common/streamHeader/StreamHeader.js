import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './stream-header.scss';
// import MediaQuery from 'react-responsive';
// import moment from 'moment';
import { Button } from '@carbon/ibm-security';
// import ToggleFiltersButton from './toggleFilters/ToggleFiltersButton';
// import { ReactComponent as AddIcon } from '../../../../assets/common/add.svg';
// import ExportMenu from '../../../common/exportMenu/ExportMenu';

// Each streamType can have a breadCrumb menu shown.
// The key is the streamType and the value is the array of {url,text} objects for
// each element of the menu to build.
// If a streamType has no entry, then no breadCrumb menu will appear.
const breadCrumbData = {
  'new-ticket': [
    { url: '/stream', text: 'Home' },
    { url: '/requests', text: 'Your requests' }
  ],
  'new-pam-request': [
    { url: '/stream', text: 'Home' },
    { url: '/requests', text: 'Your requests' },
    { url: '/new-ticket', text: 'Create New Request' }
  ]
};

/**
 * Build an element for a single NavLink in the breadcrumb.
 * @param obj Object with {url, text} values for the NavLink
 * @return ReactComponent a NavLink with leading/trailinlg space ending with slash
 */
const getBreadCrumbElement = (obj) => (
  <React.Fragment key={obj.url}>
    <NavLink className="menu-item" to={obj.url}>
      {obj.text}
    </NavLink>
    {' '}/{' '}
  </React.Fragment>
);

/**
* Builds a breadcrumb component based on the streamType
* @param streamType String describing the type of the stream
* @param title String for the title to appear at the end of the breadcrumb (non-clickable)
* @return ReactComponent The breadcrumb
*/
const getBreadCrumb = (streamType, title) => {
  const elements = breadCrumbData[streamType];
  if (!elements) return null;

  return (
    <>
      { elements.map((obj) => getBreadCrumbElement(obj)) }
      <span>{title}</span>
    </>
  );
};

const StreamHeader = ({ title, streamType }) => (
  <>
    <div className="stream-header" data-cy="streamHeader">
      <div className="title-content">
        {getBreadCrumb(streamType, title)}
        <h1>{title}</h1>
      </div>

      {/* <div className="export-icon-content">
        {items.length > 0 && <ExportMenu className="export" streamType={streamType} />}
      </div> */}

      {streamType === 'request' && (
        <Button
          className="create-new"
          disabled={false}
          iconDescription="Button icon"
          kind="primary"
          size="default"
          tabIndex={0}
          type="button"
        >
          <NavLink to="/new-ticket" className="create-new-link">
            <span className="desktop">Create New</span>
            <span className="mobile">
              {/* <AddIcon /> */}
            </span>
          </NavLink>
        </Button>
      )}
      {/* <MediaQuery maxWidth={768}>{streamType !== 'new-ticket' && <ToggleFiltersButton type={streamType} />}</MediaQuery> */}
    </div>
    {/* {displayTime && (
      <div className="stream-time" data-cy="streamTime">
        {moment().format('dddd, MMMM D')}
      </div>
    )} */}
  </>
);

StreamHeader.propTypes = {
  title: PropTypes.string.isRequired,
  streamType: PropTypes.string.isRequired,
  displayTime: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      length: PropTypes.string
    })
  )
};

export default StreamHeader;

StreamHeader.defaultProps = { displayTime: false, items: [] };
