import React from 'react'
import './passwordValidation.css'



export const validationNames = [
    { id: 'lowercase', name: 'Lower-case' },
    { id: 'uppercase', name: 'Upper-case' },
    { id: 'number', name: 'Number' },
    { id: 'minChar', name: 'More than 8 characters' },
    { id: 'specialChar', name: 'One Special Character' },
  ];
  
  export const validationObj = {
    lowercase: false,
    uppercase: false,
    number: false,
    minChar: false,
    specialChar:true
   };
  
   export const validationReducer = (state, action) => {
    switch (action.type) {
      case 'lowercase':
        return { ...state, lowercase: action.payload };
      case 'uppercase':
        return { ...state, uppercase: action.payload };
      case 'number':
        return { ...state, number: action.payload };
      case 'minChar':
        return { ...state, minChar: action.payload };
      case 'specialChar':
        return { ...state, specialChar: action.payload };
      default:
        return state;
    }
  };
  
  
  export const ValidationIcon = ({ isDone }) => {
    return isDone ? (
      <svg width="14" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polyline
          className="check"
          points="1,7 5,11 13,1"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2px"
          strokeLinecap="round"
        />
      </svg>
    ) : (
        <svg width="12" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 6A6 6 0 110 6a6 6 0 0112 0z" fill="#5B9A78" />
        </svg>
      );
  };
  
 export const ValidationItems = ({ state }) => (
    <ul className="validation-box">
      {validationNames.map((item) => (
        <li
          className={
            state[item.id] === true ? `done validation-item` : 'validation-item'
          }
          key={item.id}>
          <span className="validation-icon">
            <ValidationIcon isDone={state[item.id]} />
          </span>
          {item.name}
        </li>
      ))}
    </ul>
  );
  
  export const FormField = ({ handleChange }) => {
    return (
      <div className="form-field">
        <input
          className="form-input"
          id="password"
          type="password"
          onChange={handleChange}
        />
      </div>
    );
  };
  
  
  
  