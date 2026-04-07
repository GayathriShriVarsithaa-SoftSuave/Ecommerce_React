import './Product.css'
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
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
    const {id}=useParams<Props>();
    const [data,setData]=useState<ProductData | null>();
    useEffect(()=>{
        fetch(`https://dummyjson.com/products/${id}`)
        .then(res=>res.json())
        .then(data=>setData(data))
        .catch(err=>alert(err))
    },[]);
    return(
    <div className='prodbody'>
        <div className='prodimage'>
            <img src={data?.images?.[0]} alt='prod img' className='prodimages'/>
        </div>
        <div className='proddetails'>
            <h1>{data?.title}</h1>
            <h3>${data?.price}</h3>
            <p className='prodes'>{data?.description}</p>
            <p className='prodcate'>Category :{data?.category}</p>
            <button className='cart'>Add to Cart</button>
        </div>

    </div>);
}
export default Product;