import classes from './MealForm.module.css'
import Input from '../UI/Input';
const MealsForm=(props)=>{
    return (
        <form className={classes.form}>
            <Input label="amount" input={{
                id:'amount',
                type:'number',
                min:'1',
                max:'4',
                step:'1',
                defaultValue:'1'
            }} />
            <input/>
            <button>Add</button>
        </form>
    )
}
export default MealsForm;