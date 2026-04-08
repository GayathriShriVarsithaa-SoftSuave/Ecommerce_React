import './Product.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { useDispatch,useSelector} from 'react-redux';
import { addCartItem } from '../../features/cartitem/cartitemSlice';
import {Drawer} from '@mui/material';
import Item from '../Item/Item';
import {Dialog} from '@mui/material';
import {DialogActions} from '@mui/material';
import {DialogContent} from '@mui/material';
import {DialogContentText} from '@mui/material';
import {DialogTitle} from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import type {RootState} from '../../app/store'
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
    const [data,setData]=useState<ProductData | null>(null);
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
    const [diaopen,setDiaOpen]=useState(false)
    const addcart=()=>{
        setOpenDrawer(true);
        dispatch(addCartItem({id,item:{title:data?.title || '',price:data?.price || 0,imgval:data?.images?.[0] || ''}}));
    }
    const [opendrawer,setOpenDrawer]=useState(false);
    const [title,setTitle]=useState('');
    const [price,setPrice]=useState(0.0);
    const [des,setDes]=useState('');
    const [category,setCategory]=useState('');

    const updateprod=()=>{
        fetch(`https://dummyjson.com/products/${id}`,{
            method:'PATCH',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
            title:title,
            category:category,
            price:price,
            description: des
        })
        })
        .then(()=>alert("Updated"))
        .catch((e)=>alert(e.message))   
        setDiaOpen(false);
    }
    const { cartitems } = useSelector((state: RootState) => state.cartitem);

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
                <Button variant="contained" className='updatebtn' onClick={()=>{setDiaOpen(true);setTitle(data?.title);setPrice(data?.price);setCategory(data?.category);setDes(data?.description)}}>Update</Button>
            </div>
            
            <Drawer
                anchor="right"
                open={opendrawer}
                onClose={() => setOpenDrawer(false)}
            >
                <div style={{ width: '300px', padding: '20px' }}>
                    <h2>Cart</h2>
                    {
                        Object.keys(cartitems).length===0?<p>No items in Cart</p>:
                        Object.keys(cartitems).map((key)=>(
                            <div>
                                <Item title={cartitems[key].title} price={cartitems[key].price} img={cartitems[key].imgval} id={key}/>
                            </div>
                        ))
                    }
                </div>
            </Drawer>


            <Dialog open={diaopen} onClose={()=>setDiaOpen(false)}>
                <DialogTitle>Edit product details</DialogTitle>
                <DialogContent>
                    <DialogContentText>Edit the product details below</DialogContentText>
                    <form id="editform">
                        <TextField 
                            sx={{ width: '400px' }}
                        variant="standard"
                        value={title}
                        label='Title'
                        margin="dense"
                        onChange={(e)=>setTitle(e.target.value)}
                        /><br></br>
                        <TextField 
                            sx={{ width: '400px' }}
                            margin="dense"
                         variant="standard"
                        value={category}
                        label='Category'
                        onChange={(e)=>setCategory(e.target.value)}/><br />
                        <TextField 
                            sx={{ width: '400px' }}
                            margin="dense"
                        variant="standard"
                        value={price}
                        label='Price'
                        onChange={(e)=>setPrice(Number(e.target.value))}/><br/>
                        <p>Description</p>
                        <Textarea 
                        value={des}
                        onChange={(e)=>setDes(e.target.value)}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button form="editform" onClick={updateprod}>Edit</Button>
                </DialogActions>
            </Dialog>




        </div>);
}
export default Product;