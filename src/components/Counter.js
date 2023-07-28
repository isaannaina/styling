import classes from './Counter.module.css';
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  const dispatch=useDispatch()
  const  counter= useSelector(state=>state.counter)
  const incrementhandler=()=>{
    dispatch({type:"INCREMENT"})
  } 
  const decrementhandler=()=>{
    dispatch({type:'DECREMENT'})
  }
  const toggleCounterHandler = () => {

  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div><button onClick={decrementhandler}>decrement by 5</button>
     <button onClick={incrementhandler}>increment by 5</button></div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
