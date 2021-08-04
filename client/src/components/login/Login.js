import React from 'react';
import { Button, Link } from 'carbon-components-react';
import { ArrowRight16 } from '@carbon/icons-react';

import './login.scss';

const Login = () => {
    return (        
        <div className="login-cont">                       
            <div className="login-btn-cont">
                <div className="title-cont">
                    <p className="title-text">Log in to IBM</p>
                    <p className="title-text">Container Security</p>
                    <p className="title-text">Service</p>
                </div>
                <div className="link">
                    <span className="create-account">Don't have an account?</span> <Link href="https://www.ibm.com/account/us-en/signup/register.html?a=ZGNlNzQwZmQtYTI3My00">Create an IBMid</Link>
                </div>
                <div className="btn-cont">
                    <a href={`${process.env.PUBLIC_URL}/api/login`}>
                        <Button
                            className="button"
                            renderIcon={ArrowRight16}                                               
                        >
                            Login with your IBMid
                        </Button>
                    </a>
                </div>
            </div>
            <div className="login-desc">
                {/* <p className="login-desc-title">Sign up for a free trial to:</p>
                <div className="login-desc-text">
                    <ul>
                        <li>Visualize the security posture on your container environments</li>
                        <li>Highlight critical vulnerabilities across containers, hosts and images</li>
                        <li>Realize and fix critical compliance issues</li>
                    </ul>
                </div> */}
            </div>
        </div>
    )
}

export default Login;