import './Thumbnail.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux';
import { addCartItem } from '../../features/cartitem/cartitemSlice';
const Thumbnail=({id,imgval,title,price,des})=>{
   
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const description:string=des.length>90?des.substring(0,90)+"...":des;
    const gotoprod=(id:string)=>{
    navigate(`/product/${id}`);
    }

    const addcart=()=>{
        alert("Added to Cart");
        dispatch(addCartItem({id,item:{title,price,imgval}}));
    }
    return(
        <div className='thumbbody'>
    <div className='thumbnailbody'  onClick={()=>gotoprod(id)} >
        <img src={imgval} alt="Thumbnail" className='thumbimg'/>
        <div className='titleprice'>
            <p className='thumbtitle'>{title}</p>
            <p className='thumbprice'>{price}</p>
        </div>
        <p className='desc'>{description}</p>
       
    </div>
     <button className='addtocart' onClick={addcart}>Add to Cart</button>
        </div>);

}
export default Thumbnail;