import React, { useState } from 'react';
import { Select, SelectItem } from 'carbon-components-react';
import { VALIDATOR_REQUIRE } from '../../../utils/validators';

import Input from './uiElements/input';
import './toolset.scss';

const Toolset = (props) => {
    const [isToolsetSelected, setToolsetSelected] = useState(false);
    const onChangeHandler = (elem, value, isValid) => {
      props.handleInputChange(elem, value, isValid);
    };

    const selectChangeHandler = (e) => {
      console.log('inside container select', e.target.id, e.target.value);
      if (e.target.value === 'pcc') {
        setToolsetSelected(true);
      }else {
        setToolsetSelected(false);
      }
      props.handleInputChange(e.target.id, e.target.value, true);
    };

    const handleBackspacePress = (elem) => {
      console.log("elem", elem);
      props.backSpacePressed(elem);
    }

    return (
      <div className="tool-set">
        <Select
          defaultValue="pcc"
          id="toolset"
          invalidText="A valid value is required"
          labelText="Toolset"
          onChange={selectChangeHandler}
          disabled={true}
        >
          <SelectItem
            text="Choose an option"
            value="placeholder-item"
          />
          <SelectItem
            text="Prisma Cloud Compute"
            value="pcc"
          />
          {/* <SelectItem
            text="Option 2"
            value="option-2"
          /> */}
        </Select>
 
        { isToolsetSelected && <Input
          id="licenseKey"
          label="License Key"
          placeholder="xxxx-xx-xxxx-xx"
          value={props.data.licenseKey}
          validators={[VALIDATOR_REQUIRE()]}
          handleInput={onChangeHandler}
          handleBackspacePress={handleBackspacePress}
          errorText="License key is required."
        />
        }
        
      </div>
    );
};

export default Toolset;
