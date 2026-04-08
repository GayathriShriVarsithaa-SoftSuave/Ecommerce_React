import './Item.css'
import { Button } from '@mui/material';
import { useDispatch} from 'react-redux';
import { deleteCartItem } from '../../features/cartitem/cartitemSlice';
const Item=({title,price,img,id})=>{
    const dispatch = useDispatch();
    const deleteitem=()=>{
        dispatch(deleteCartItem(id));
    }
    return(
    <div className='itembody'>
            <p>{title}</p>
            <p>{price}</p>
             <img src={img} alt='prod img' className='itemimg'/>
            <Button variant="contained" className='delitem' onClick={deleteitem}>Delete</Button>
    </div>
    );
}
export default Item;