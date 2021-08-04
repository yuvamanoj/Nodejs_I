import React from 'react';
import { Checkbox } from 'carbon-components-react';

import './termsAndCond.scss';

const TermAndCond = (props) => {
    const checkBoxHandler = (e) => {
      if (e === true) {
        props.handleInputChange("tncCheck", e, true);
      }else {
        props.handleInputChange("tncCheck", e, false);
      }
    };

    return (
      <div className="tandc-cont">
        <p>Legal copy will be supplied through the General Legal Approval. Visit <br />
          <a href="localhost:8080">w3.ibm.com/developer/appservices/get-started/ibm-clearances</a>
        </p>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to make a type specimen book. It has survived not
          only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        </p>

        <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>

        <p>It is a long established fact that a reader will be distracted by the readable content of a page
          when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal
          distribution of letters, as opposed to using Content here, content here, making it look like readable
          English.
        </p>

        <div className="checkbox-cont">
          <fieldset className="bx--fieldset">
            <legend className="bx--label">Terms and Conditions</legend>
            <Checkbox
              labelText="I accept the Terms and Conditions"
              id="tncCheck"
              name="tncCheck"
              onChange={checkBoxHandler}
            />
          </fieldset>
        </div>
      </div>
    );
};

export default TermAndCond;
