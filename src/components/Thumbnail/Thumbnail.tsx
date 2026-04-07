import './Thumbnail.css'
import { useNavigate } from 'react-router-dom';
const Thumbnail=({id,imgval,title,price,des})=>{
    const navigate = useNavigate();

    const description:string=des.length>90?des.substring(0,90)+"...":des;
    const gotoprod=(id:string)=>{
    navigate(`/product/${id}`);
    }

    return(<div className='thumbnailbody' onClick={()=>gotoprod(id)}>
        <img src={imgval} alt="Thumbnail" className='thumbimg' />
        <div className='titleprice'>
            <p className='thumbtitle'>{title}</p>
            <p className='thumbprice'>{price}</p>
        </div>
        <p className='desc'>{description}</p>
        <button className='addtocart'>Add to Cart</button>
    </div>);

}
export default Thumbnail;