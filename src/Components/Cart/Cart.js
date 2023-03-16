import classes from './Cart.module.css'
import Modal from '../UI/Modal'
const Cart =(props)=>{
const cartItem=<ul className={classes['cart-item']}>
    {[
      {id:'c1',name:'sushi',amount:'2',pirze:'12.44'}, 
    ].map(item=><li>{item.name}</li>)}
</ul>
return (
    <Modal>
    {cartItem}
    <div className={classes.total}></div>
    <span>Total Amount</span>
    <span>68</span>
    <button className={classes['button--alt']}>close</button>
    <button className={classes.button}>order</button>

    <div className={classes.actions}></div>
    </Modal>

)
}
export default Cart
