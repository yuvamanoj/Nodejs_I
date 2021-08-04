import React from 'react';

import './text-info.scss'

export const ContactInfoText = () => {
    return (
      <div className="info-block">
        <p className="info-desc">Application modernization and migration to cloud is significantly increasing container adoption. However, containers introduce a new set of threat vectors that require specialized security in the following key risk areas: images, registries, orchestrator tools, runtime containers and hosts.</p>
        <p className="info-desc">By using the Container Security trial, you will benefit from our services by:</p>
        <p className="info-list-item">
          <ul>
            <li>Improving your security posture by better visualizing compliance risks across images, containers and hosts</li>
            <li>Highlighting the most critical vulnerabilities on your environment</li>
            <li>Starting your experience in less than 10 minutes</li>
          </ul>
        </p>
        <p className="info-desc">The trial currently supports Red Hat OpenShift on IBM Cloud but more platforms are being added soon.</p>
        <p className="info-desc"><span className="highlight">Start now with a 30-day free of charge trial</span> and be able to upgrade to the full service, adding protection capabilities for your container workloads.</p>
      </div>
    );
}

export const PlatformInfoText = () => {
    return (
      <div className="info-block">
        <p className="info-desc">With Red Hat OpenShift on IBM Cloud, you can deploy apps on highly available OpenShift clusters that run the Red Hat OpenShift on IBM Cloud Container Platform software on Red Hat Enterprise Linux machines.</p>
        <p className="info-desc">To successfully deploy our service into your environment, please provide the following details.</p>
      </div>
    );
}

export const ToolsetInfoText = () => {
    return (
      <div className="info-block">
        <p className="info-desc">Prisma Cloud Compute Edition protects your containerized workloads and applications wherever you choose to deploy them. Prisma Cloud Compute protects by allow-listing application behavior and preventing anomalous actions from occurring. Defense in depth combines core cloud native firewalling with runtime defense to protect east-west traffic flows and leverage machine learning for known application behavior. Prisma Cloud Compute Edition provides vulnerability management and compliance for the full software lifecycle by integrating with any CI process, registry, code repository. </p>
        <p className="info-desc">Key Benefits:</p>
        <p className="info-list-item">
          <ul>
            <li>Embrace any cloud native technology you prefer</li>
            <li>Prioritize risks contextually in cloud native environments</li>
            <li>Automate security at DevOps speed</li>
          </ul>
        </p>
        <p className="info-desc">To learn more about Prisma Cloud, <a className="redirects" href="https://www.paloaltonetworks.com/prisma/cloud" target="_blank" rel="noreferrer">visit us online</a></p>
        <p className="info-desc">T&amp;C’s link</p>
      </div>
    );
}
