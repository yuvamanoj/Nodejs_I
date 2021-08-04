import React, { useReducer } from 'react';
import { TextInput, Tooltip, Link } from 'carbon-components-react';

import { validate } from '../../../../utils/validators';

import './input.scss';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      // console.log('Action', action);
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators)
      };
     case 'TOUCH':
       return {
         ...state,
         isTouched: true
       };
    default:
      return state;
  }
};

const Input = (props) => {
    const [inputState, dispatch] = useReducer(inputReducer, { value: '', isTouched: false, isValid: false });

    const onChangeHandler = (event) => {
        if (event.keyCode === 8 || event.keyCode === 46) {
          event.target.value = '';
          dispatch({ type: 'CHANGE', val: event.target.value, validators: props.validators });
          props.handleBackspacePress(event.target.id, inputState.isValid);
        } else {
          if (event.target.id === 'phoneNumber') {
            const re = /^[0-9\b]+$/;
            if (re.test(event.target.value)) {
              dispatch({ type: 'CHANGE', val: event.target.value, validators: props.validators });
              props.handleInput(event.target.id, event.target.value, inputState.isValid);
            }
          } else if (event.target.id === 'firstName' || event.target.id === 'lastName') {
            const re = /^[a-z\-_\s]+$/i;
            if (re.test(event.target.value)) {
              dispatch({ type: 'CHANGE', val: event.target.value, validators: props.validators });
              props.handleInput(event.target.id, event.target.value, inputState.isValid);
            }
          } else {
            dispatch({ type: 'CHANGE', val: event.target.value, validators: props.validators });
            console.log('Valid', inputState.isValid);
            props.handleInput(event.target.id, event.target.value, inputState.isValid);
          }
        }
    };

    const touchHandler = () => {
      dispatch({
        type: 'TOUCH'
      });
    };

    const content = (
      <div className="input-cont">
        <TextInput
          labelText={props.label}
          id={props.id}
          size="xl"
          value={props.value || inputState.value}
          invalidText={props.errorText}
          placeholder={props.placeholder}
          onChange={onChangeHandler}
          onBlur={touchHandler}
          onKeyUp={onChangeHandler}
        />
        {props.isTooltip && (
          <Tooltip
            direction="bottom"
            tabIndex={0}
          >
            <p>This is some tooltip text. This box shows the maximum amount of text that should be displayed inside.
              If more room is needed, use a modal instead.
            </p>
            <div className="bx--tooltip__footer">
              <Link href="https://localhost:5000">Learn more</Link>
            </div>
          </Tooltip>
        )}
        {!inputState.isValid && inputState.isTouched && <p className="input-message--invalid">{props.errorText}</p>}
      </div>
  );
    return content;
};

export default Input;
