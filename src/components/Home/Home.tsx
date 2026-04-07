import './Home.css'
import Thumbnail from '../Thumbnail/Thumbnail'
import { useEffect,useState } from 'react';
const Home=()=>{
    const [data,setData]=useState([]);
    useEffect(()=>{
        fetch('https://dummyjson.com/products')
        .then(res=>res.json())
        .then(data=>setData(data.products))
        .catch(err=>alert(err))
    },[])
    return(<div className='homeitems'>
        {data.map((item)=>
        <Thumbnail id={item?.id} imgval={item?.thumbnail} title={item?.title} price={"$"+item?.price} des={item?.description}/>)}
    </div>);
}
export default Home;