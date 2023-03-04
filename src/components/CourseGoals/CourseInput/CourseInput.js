import React, { useState } from 'react';
import Button from '../../UI/Button/Button';
import './CourseInput.css';

const CourseInput = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [inputIsValid, setInputIsValid] = useState(false);

  const goalInputChangeHandler = event => {
    setEnteredValue(event.target.value);
    setInputIsValid(event.target.value.trim().length > 0);
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    if (inputIsValid) {
      props.onAddGoal(enteredValue);
      setEnteredValue('');
      setInputIsValid(false);
    }
  };

  const formControlClasses = `form-control ${inputIsValid ? '' : 'invalid'}`;

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={formControlClasses}>
        <label>Course Goal</label>
        <input type="text" onChange={goalInputChangeHandler} value={enteredValue} />
      </div>
      <Button type="submit" style={{ backgroundColor: inputIsValid ? 'red' : 'lightcoral' }}>Add Goal</Button>
    </form>
  );
};

export default CourseInput;
