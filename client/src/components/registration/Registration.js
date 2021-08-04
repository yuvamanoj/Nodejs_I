/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useCookies } from "react-cookie";
import {
  ProgressIndicator,
  ProgressStep,
  Button,
  Loading
} from 'carbon-components-react';
import { postRegistration } from '../../actions/registration';
import StreamHeader from './common/streamHeader/StreamHeader';
import ContactForm from './common/contact-info';
import CloudEnvironment from './common/cloud-env';
import Toolset from './common/toolset';
import TermAndCond from './common/termsAndCond';
import Summary from './common/summary';
import Notification from '../shared/notification/Notification';
import validator from 'validator';
import { ContactInfoText, PlatformInfoText, ToolsetInfoText } from './common/text-info';

import './registration.scss';

const { ArrowRight32 } = require('@carbon/icons-react');

const Registration = () => {
    const [cookies] = useCookies(['uid', 'email']);
    const initialUserData = {
      companyName: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      platform: '',
      apiKey: '',
      region: '',
      resourceGroup: '',
      clusterId: '',
      toolset: 'pcc',
      licenseKey: '',
      tncCheck: false,
      ibmId : cookies.uid,
      ibmEmailId: cookies.email
    };
    const errorInfo = {
      type: 'error',
      title: 'Request Failed',
      subtitle: 'Something went wrong. Please contact support team.'
    };
    const [currentStep, setCurrentStep] = useState(0);
    const [isValid, setIsValid] = useState(false);
    const [userData, setUserData] = useState({ ...initialUserData });
    const [isReqSubmitted, setIsReqSubmitted] = useState(false);
    const dispatch = useDispatch();
    const isFetching = useSelector(state => state.registration.isFetching);
    const isRegistered = useSelector(state => state.registration.isRegistered);
    const isError = useSelector(state => state.registration.isError);
    const history = useHistory();

    useEffect(() => {
      // setCookie(document.cookie);
      // console.log('js cookie', document.cookie);
      if (isRegistered && isReqSubmitted) {
        history.push({
          pathname: '/status',
          search: '?r=true'
        });
      }

    }, [isRegistered, isReqSubmitted, history]);

    const checkValidity = () => {
      // console.log('userData email', currentStep, userData);
      if (currentStep === 0 && (userData.companyName.length < 2 ||
                userData.firstName.length < 2 || userData.lastName.length < 2 || !(validator.isEmail(userData.email)))) {
          return false;
      }
      if (currentStep === 1 && (userData.apiKey.length < 2 ||
                      userData.platform === '' || userData.platform === 'placeholder-item' ||
                      userData.region.length < 2 ||
                      userData.resourceGroup.length < 2 || userData.clusterId.length < 2)) {
          return false;
      }
      if (currentStep === 2 && (userData.toolset === '' || userData.licenseKey.length < 2)) {
          return false;
      }

      return true;
    };

    const inputChangeHandler = (item, value, isValid) => {

      // if (isValid) {
        setUserData((userData) => ({ ...userData, [item]: value }));
      // }

      // if (item === 'email') {
      //   setUserData((userData) => ({ ...userData, [item]: value }));
      // }
      const valid = checkValidity();

      if (valid && isValid) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }

      if (item === 'tncCheck') {
        if (value === true) {
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      }
    };

    const handleDeleteContent = (elemName, validity) => {
      setUserData((userData) => ({ ...userData, [elemName]: '' })); 
      // console.log(validity);
      setIsValid(false);
    }

    const steps = [
      {
        label: 'Contact Information',
        key: 'contInfo',
        description: 'Contact Information',
        container: <ContactForm data={userData} handleInputChange={inputChangeHandler} backSpacePressed={handleDeleteContent} />,
        textInfo: <ContactInfoText />
      },
      {
        label: 'Cloud Environment',
        key: 'cloudEnv',
        description: 'Cloud Environment',
        container: <CloudEnvironment data={userData} handleInputChange={inputChangeHandler} backSpacePressed={handleDeleteContent} />,
        textInfo: <PlatformInfoText />
      },
      {
        label: 'Toolset',
        key: 'toolSet',
        description: 'Toolset',
        container: <Toolset data={userData} handleInputChange={inputChangeHandler} backSpacePressed={handleDeleteContent} />,
        textInfo: <ToolsetInfoText />
      }
      ,
      {
        label: 'Summary',
        key: 'summary',
        description: 'Summary',
        container: <Summary data={userData} />,
        textInfo: ''
      },
      {
        label: 'Terms and Conditions',
        key: 'tnc',
        description: 'Terms &amp; Conditions',
        container: <TermAndCond handleInputChange={inputChangeHandler} />
      }
    ];

    const handleClick = (next) => {
      if (next) {
        if (currentStep === steps.length - 1) {
          // console.log('userData', userData);
          dispatch(postRegistration(userData));
          window.scrollTo(0, 0);
          setIsReqSubmitted(true);
          // if (isRegistered) {
          //   history.push('/status');
          // }
        } else if (currentStep === steps.length - 3 || currentStep === steps.length - 4) {
          setCurrentStep(currentStep + 1);
          setIsValid(true);
          // setUserData((userData) => ({ ...userData, ['ibmId']: cookies.uid }));
          // setUserData((userData) => ({ ...userData, ['ibmEmailId']: cookies.email }));
        } else {
          const validity = checkValidity();
          if (validity) {
            setCurrentStep(currentStep + 1);
            setIsValid(false);
          }
        }
      } else {
        setCurrentStep(currentStep - 1);
        setIsValid(true);        
      }
    };

    const resetUserData = () => {
      setUserData({ ...initialUserData });
    };

    const cancelClick = () => {
      setCurrentStep(0);
      resetUserData();
      history.push('/registration');
      window.location.reload();
    }

    return (
      <>
        <StreamHeader title="Registration" streamType="" filters="" />
        { isError && <Notification info={errorInfo} /> }
        <div className="registration-cont">
          <div className="bx--grid">
            <div className="bx--row">
              <div className="bx--col-lg-4 bx--col-md-4">
                <div className="vertical-progress">
                  <h4 className="progress-header">Registration Steps</h4>
                  <p className="progress-title-desc">Step {currentStep + 1} of 5</p>
                  <ProgressIndicator
                    vertical={true}
                    currentIndex={currentStep}
                    spaceEqually={true}
                  >
                    {steps.map((step) => (
                      <ProgressStep key={step.key} label={step.label} description={step.description} />
                    ))}
                  </ProgressIndicator>
                </div>
              </div>
              <div className="bx--col-lg-8 bx--col-md-8">
                  <div className="bx--row main-cont"> 
                    <div className="bx--col">        
                      <div className="form-cont">
                        <h3 className="form-cont-title">{steps[currentStep].label}</h3>
                        {steps[currentStep].container}
                      </div>
                    </div>
                    { currentStep <=2 && <div className="bx--col">
                      <div className="info-cont">
                        {steps[currentStep].textInfo}
                      </div>
                    </div>
                    }
                  </div>
                  { isFetching && !isRegistered && <Loading description="Registration request" withOverlay={true} />}
                  <div className="bx-row">
                    <div className="bx-col">  
                      <div className="form-footer">
                          <Button
                            kind="ghost"
                            size="xl"
                            className="action-btn btn-cancel"
                            onClick={() => cancelClick()}
                          >Cancel
                          </Button>
                          {currentStep === 0 ? <div className="back-btn-cont" /> :
                            (
                              <Button
                                kind="secondary"
                                size="xl"
                                className="action-btn"
                                onClick={() => handleClick(false)}
                                disabled={currentStep === 0}
                              > Back
                              </Button>
                            )}
                          <Button
                            kind="primary"
                            size="xl"
                            className="action-btn"
                            renderIcon={ArrowRight32}
                            disabled={!isValid || isFetching }
                            onClick={() => handleClick(true)}
                          >
                            {currentStep === steps.length - 1 ? 'Submit' : 'Next'}
                          </Button>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default Registration;
