import React from 'react';
// import { TextInput } from 'carbon-components-react';

import Input from './uiElements/input';
import { VALIDATOR_REQUIRE, VALIDATOR_EMAIL, VALIDATOR_MINLENGTH } from '../../../utils/validators';
import './contact-info.scss';

const contactForm = (props) => {
    const onChangeHandler = (elem, value, isValid) => {
      console.log('inside contact container', elem, value, isValid);
      props.handleInputChange(elem, value, isValid);
    };

    const handleBackspacePress = (elem, isValid) => {
      console.log("elem", elem);
      props.backSpacePressed(elem, isValid);
    }

    return (
      <div className="contact-cont">
        <Input
          id="companyName"
          label="Company Name"
          placeholder="(Required)"
          value={props.data.companyName}
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(2)]}
          handleInput={onChangeHandler}
          handleBackspacePress={handleBackspacePress}
          errorText="Company name is required."
        />

        <Input
          id="firstName"
          label="First Name"
          placeholder="(Required)"
          value={props.data.firstName}
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
          handleInput={onChangeHandler}
          handleBackspacePress={handleBackspacePress}
          errorText="First name is required."
        />

        <Input
          id="lastName"
          label="Last Name"
          placeholder="(Required)"
          value={props.data.lastName}
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
          handleInput={onChangeHandler}
          handleBackspacePress={handleBackspacePress}
          errorText="Last name is required."
        />

        <Input
          id="email"
          label="Email"
          placeholder="(Required)"
          value={props.data.email}
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          handleInput={onChangeHandler}
          handleBackspacePress={handleBackspacePress}
          errorText="Email is required. Please enter a valid email."
        />

        <Input
          id="phoneNumber"
          label="Phone Number"
          placeholder="(Optional)"
          value={props.data.phoneNumber}
          validators={[]}
          handleInput={onChangeHandler}
          handleBackspacePress={handleBackspacePress}
          errorText="Please enter valid Phone Number"
        />

      </div>
    );
};

export default contactForm;
