import './Product.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useDispatch} from 'react-redux';
import { addCartItem } from '../../features/cartitem/cartitemSlice';
type Props={
    id:string
}
interface ProductData{
    title:string,
    price:number,
    description:string,
    category:string,
    images:string[]
}
const Product=()=>{
    const dispatch=useDispatch();
    const {id}=useParams<Props>();
    const [data,setData]=useState<ProductData | null>();
    const fetchdata=()=>{
        fetch(`https://dummyjson.com/products/${id}`)
        .then(res=>res.json())
        .then(data=>setData(data))
        .catch(err=>alert(err))
    }
    useEffect(()=>{
        fetchdata();
    },[]);
    const navigate=useNavigate();
    const backfun=()=>{
        navigate('/');
    }
    const delprod=()=>{
        fetch(`https://dummyjson.com/products/${id}`,{
            method:'DELETE'
        })
        .then(res=>res.json())
        .then(()=>alert('Product Deleted'))
        .catch(err=>alert(err))
    };
    const updateprod=()=>{

    }
    const addcart=()=>{
        alert("Added to Cart");
        dispatch(addCartItem({id,item:{title:data?.title || '',price:data?.price || 0,imgval:data?.images?.[0] || ''}}));
    }
    return(
        <div>
            <ArrowBackIcon className='backicon' onClick={backfun}/>
            <button className='cart' onClick={addcart}>Add to Cart</button>
            <div className='prodbody'>
                <div className='prodimage'>
                    <img src={data?.images?.[0]} alt='prod img' className='prodimages'/>
                </div>
                <div className='proddetails'>
                    <h1>{data?.title}</h1>
                    <h3>${data?.price}</h3>
                    <p className='prodes'>{data?.description}</p>
                    <p className='prodcate'>Category :{data?.category}</p>
                </div>
            </div>
            <div className='btns'>
                <Button variant="contained"  className='deletebtn' onClick={delprod}>Delete</Button>
                <Button variant="contained" className='updatebtn' onClick={updateprod}>Update</Button>
            </div>
        </div>);
}
export default Product;