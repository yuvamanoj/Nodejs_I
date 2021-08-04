import React from 'react';
import { TooltipDefinition } from 'carbon-components-react';

import './summary.scss';

const Summary = (props) => {
    const userData = props.data;
    const apiKeyVal = 'API Key: ' + userData.apiKey;
    // const licenseKeyVal = 'License Key ' + userData.licenseKey;
    const platformList = [{ key: 'ibmCloudRoks', value: 'IBM Cloud - ROKS'}, { key: 'ibmCloudIks', value: 'IBM Cloud - IKS'}]
    const toolsetList = [{ key: 'pcc', value: 'Prisma Cloud Compute'}];
    
    const truncateStr = (text) => {
        if (text.length && text.length > 14) {
            return text.substring(0, 13) + '...';
        }        
        return text;
    }

    const getPlatformName = (platformKey) => {
        return platformList.find(platform => platform.key === platformKey).value;         
    }

    const getToolsetName = (toolsetKey) => {
        return toolsetList.find(toolset => toolset.key === toolsetKey).value;   
    }

    return (
        <div className="summary-cont">
            <div>
                <p className="title-info">Please ensure that all the information below is correct</p>
            </div>
            <div className="contact-info-sum">
                <p className="title-header">Contact Information</p>
                <div className="fx-box"> 
                    <div>
                        <p className="prop-name">Company</p>
                        <p className="prop-value">{userData.companyName}</p>
                    </div>
                    <div>
                        <p className="prop-name">First Name</p>
                        <p className="prop-value">{userData.firstName}</p>
                    </div>
                    <div>
                        <p className="prop-name">Last Name</p>
                        <p className="prop-value">{userData.lastName}</p>
                    </div>
                    <div>
                        <p className="prop-name">Email</p>
                        <p className="prop-value">{userData.email}</p>
                    </div>
                </div>
                <div>
                    <>
                        <p className="prop-name">Phone number</p>
                        <p className="prop-value">{userData.phoneNumber.length > 0 ? userData.phoneNumber : <span className="blank-number">-</span>}</p>
                    </>                                        
                </div>               
            </div>
            <div className="cloud-env-sum">
                <p className="title-header">Cloud Environment</p>
                <div className="fx-box"> 
                    <div>
                        <p className="prop-name">Platform</p>
                        <p className="prop-value">{getPlatformName(userData.platform)}</p>
                    </div>
                    <div>
                        <p className="prop-name">API Key</p>
                        <TooltipDefinition
                            tooltipText={apiKeyVal}
                            direction="top"
                            align="start"                            
                        >
                            <p className="prop-value">{truncateStr(userData.apiKey)}</p>
                        </TooltipDefinition>
                    </div>
                    <div>
                        <p className="prop-name">Cloud Region</p>
                        <p className="prop-value">{userData.region}</p>
                    </div>
                    <div>
                        <p className="prop-name">Cloud Resource Group</p>
                        <p className="prop-value">{userData.resourceGroup}</p>
                    </div>
                </div>
                <div>
                    <p className="prop-name">Cloud Cluster ID</p>
                    <p className="prop-value">{userData.clusterId}</p>
                </div>
            </div>
            <div className="tool-set-sum">
                <p className="title-header">Toolset</p>
                <div className="fx-box"> 
                    <div>
                        <p className="prop-name">Toolset</p>
                        <p className="prop-value">{getToolsetName(userData.toolset)}</p>
                    </div>
                    {/* <div>
                        <p className="prop-name">License Key</p>
                        <TooltipDefinition
                            tooltipText={licenseKeyVal}
                            direction="top"
                            align="center"                            
                        >
                            <p className="prop-value">{truncateStr(userData.licenseKey)}</p>
                        </TooltipDefinition>
                    </div>                     */}
                </div>                
            </div>                    
        </div>
    );
}

export default Summary;
