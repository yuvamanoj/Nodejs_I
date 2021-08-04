import React, { useState, Fragment } from 'react';
import { Select, SelectItem } from 'carbon-components-react';
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../../utils/validators';

import Input from './uiElements/input';
import './cloud-env.scss';

const CloudEnvironment = (props) => {
    const [isPlatformSeleted, setPlatformSelected] = useState(false);
    const onChangeHandler = (elem, value, isValid) => {
      // eslint-disable-next-line no-console
      // console.log('inside container', elem, value);
      props.handleInputChange(elem, value, isValid);
    };

    const selectChangeHandler = (e) => {
      // console.log('inside container select', e.target.id, e.target.value);
      if (e.target.value === 'ibmCloudRoks') {
        setPlatformSelected(true);
      } else {
        setPlatformSelected(false);
      }
      props.handleInputChange(e.target.id, e.target.value, true);
    };

    const handleBackspacePress = (elem) => {
      console.log("elem", elem);
      props.backSpacePressed(elem);
    }

    return (
      <div className="cloud-env">
        <Select
          defaultValue="placeholder-item"
          id="platform"
          invalidText="A valid value is required"
          labelText="Platform"
          onChange={selectChangeHandler}
        >
          <SelectItem
            text="Choose an option"
            value="placeholder-item"
          />
          <SelectItem
            text="IBM Cloud - ROKS"
            value="ibmCloudRoks"
          />
          {/* <SelectItem
            text="Option 2"
            value="option-2"
          /> */}
        </Select>

        { isPlatformSeleted && <Fragment>
          <Input
            id="apiKey"
            label="API Key"
            placeholder="(Required)"
            isTooltip="true"
            value={props.data.apiKey}
            validators={[VALIDATOR_REQUIRE()]}
            handleInput={onChangeHandler}
            handleBackspacePress={handleBackspacePress}
            errorText="API key is required."
          />

          <Input
            id="region"
            label="Cloud Region"
            placeholder="(Required)"
            isTooltip="true"
            value={props.data.region}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(3)]}
            handleInput={onChangeHandler}
            handleBackspacePress={handleBackspacePress}
            errorText="Cloud Region is required."
          />

          <Input
            id="resourceGroup"
            label="Cloud Resource Group"
            placeholder="(Required)"
            isTooltip="true"
            value={props.data.resourceGroup}
            validators={[VALIDATOR_REQUIRE()]}
            handleInput={onChangeHandler}
            handleBackspacePress={handleBackspacePress}
            errorText="Resource group is required."
          />

          <Input
            id="clusterId"
            label="Cloud Cluster ID"
            placeholder="(Required)"
            isTooltip="true"
            value={props.data.clusterId}
            validators={[VALIDATOR_REQUIRE()]}
            handleInput={onChangeHandler}
            handleBackspacePress={handleBackspacePress}
            errorText="Cluster ID is required."
          />
        </Fragment>
        }
      </div>
    );
};

export default CloudEnvironment;
