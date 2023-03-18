import {Fragment, useState} from 'react';
import Header from './Components/Header/Header'
import Meals from './Components/Meals/Meals';
import Cart from './Components/Cart/Cart';

function App() {
  const[CartIsshown, setCartIsShown]=useState(false);
  const showcarthandler=()=>{
    setCartIsShown(true);
  }
  const hideCartHandler =()=>{
    setCartIsShown(false);
  }
  return (

    <Fragment>
      {CartIsshown &&  <Cart onclose ={hideCartHandler} />}
      <Header onshowCart={showcarthandler}/>
      <main>
        <Meals/>
      </main>
    </Fragment>
  );
}

export default App;
