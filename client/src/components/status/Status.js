import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { Button, Loading } from 'carbon-components-react';
import { UserIdentification16, Document16 } from '@carbon/icons-react';

import { getStatus, getStatusDetails } from '../../actions/status';
import StreamHeader from '../registration/common/streamHeader/StreamHeader';
import Notification from '../shared/notification/Notification';
import StatusCard from '../shared/tile/tile';
import StatusTable from '../shared/table/table';
import './status.scss';

const Status = () => {
  const [cookies] = useCookies(['uid']);
  const successInfo = {
      type: 'success',
      title: 'Successfully submitted',
      subtitle: 'You will receive an email with the link to your cloud container dashboard shortly.'
  }
  const errorInfo = {
      type: 'error',
      title: 'Request Failed',
      subtitle: 'Something went wrong while fetching status. Please contact support team.'
  }
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.status.isFetching);
  const isError = useSelector(state => state.status.isError);
  const statusData = useSelector(state => state.status.statusData);
  const isRegistered = useSelector(state => state.registration.isRegistered);
  const isStatusDetails = useSelector(state => state.status.isStatusDetails);
  const statusDetails = useSelector(state => state.status.statusDetails);
  const location = useLocation();
  const isFromReg = location.search ? location.search.split('=')[1] : false;

  useEffect(() => {
    dispatch(getStatus(cookies.uid));
  }, [dispatch, cookies]);

  const viewDetails = (cid) => {
    setShowDetails(false);
    dispatch(getStatusDetails(cid));
    if (!isFetching && isStatusDetails) {
        console.log('Details', statusDetails);
        setShowDetails(true);
        window.scrollTo(0, 0);
    } else {
        setTimeout(() => {
            if (statusData) {
                setShowDetails(true);
            }
        },500)
    } 
    
    console.log('close Modal', statusData);
  }

  const closeDetails = () => {
    setShowDetails(false);
  } 

    return (
        <>
            <StreamHeader title="Status" streamType="" filters="" />            
            { (isRegistered && isFromReg) && <Notification info={successInfo} /> }
            { isError && <Notification info={errorInfo} /> }
            { isFetching && <Loading description="Registration request" withOverlay={true} /> }
            { !isFetching && <p className="status-cont-title">Your Cloud Container trials ({statusData.length})</p> }
            { !isFetching && statusData.length >0 && <div className="status-container">                
                <div className="bx--grid">
                    <div className="bx--row tile-cont">
                        <div className="bx--col-sm-9 bx--col-md-9 bx--col-lg-9">
                            <div className="tile-container">
                                {statusData.map((status, index) => {
                                    return (<StatusCard data={status} key={index} openDetails={() => viewDetails(status.customerId)} />)
                                })}                                                       
                            </div>
                        </div>
                        <div className="bx--col-sm-3 bx--col-md-3 bx--col-lg-3">
                            <div>
                                <p className="useful-link-title">Useful links</p>
                                <div className="useful-link-cont"><UserIdentification16 /><a className="useful-links" href="https://www.google.com">Contact IBM Support</a></div>
                                <div className="useful-link-cont"><Document16 /><a className="useful-links" href="https://www.google.com">View documentation</a></div>
                            </div> 
                        </div>
                    </div>
                </div>                
            </div> }
            <div>
                { showDetails && <div className="details">                    
                    <div className="details-header">
                        <div>Details <Button kind='ghost' size='small' onClick={() => closeDetails()}>x</Button></div>
                    </div>
                    <div className="details-content">
                        <div className="property-cont"><div className="property-name">ID</div> <div className="property-val">{statusDetails.customerId}</div></div>
                        <div className="property-cont"><div className="property-name">Current Activity</div> <div className="property-val">{statusDetails.taskName}</div></div>
                        <div className="property-cont"><div className="property-name">Status</div> <div className="property-val"><span className="status-btn gray"></span>{statusDetails.status}</div></div>
                        <div className="activity-details">
                            <div className="activity-details-title">Activity log</div>
                            { statusDetails.activities && <StatusTable tableData={statusDetails.activities} /> }
                        </div>
                        <div className="details-bottom">
                            <p>Need Help?</p>
                            <div className="contact-info">
                                For any assistance, please <span>contact IBM Support</span>
                            </div>   
                        </div>     
                    </div>
                </div>
                }                
            </div>
        </>
    )
}

export default Status;