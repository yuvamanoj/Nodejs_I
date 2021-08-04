import React from 'react';
import {Tile, Button} from 'carbon-components-react';

import './tile.scss';

const StatusCard = (props) => {

    const openDetails = () => {
        // setShowDetails(true);
        console.log('open details');
        props.openDetails();
    }

    return (
        <Tile>
            <div className="tile-header">{props.data.clusterId}</div>
            <div className="tile-sub-header">{ props.data.trialVersion ? 'Trial' : ' ' }</div> 
            <div className="tile-content-cont">
                <div className="tile-content">
                    <div className="tile-content-item">Registration Date</div>
                    <div className="tile-content-val">{props.data.initiatedDateTime}</div>
                </div>
                <div className="tile-content">
                    <div className="tile-content-item">Current Activity</div>
                    <div className="tile-content-val">{props.data.taskName}</div>
                </div>
                <div className="tile-content">
                    <div className="tile-content-item">Status</div>
                    <div className="tile-content-val">
                        { props.data.status === 'Completed' && <div><span className="status-btn green"></span> Completed</div> }
                        { props.data.status === 'Ongoing' && <div><span className="status-btn gray"></span> Ongoing</div> }
                        { props.data.status === 'Error' && <div><span className="status-btn red"></span> Error</div> }
                    </div>
                </div>
            </div>
            <div className="tile-content-footer">
                <Button kind='ghost' size='small' onClick={() => openDetails()}>View details</Button>
            </div>
        </Tile>
    );
}


export default StatusCard;

