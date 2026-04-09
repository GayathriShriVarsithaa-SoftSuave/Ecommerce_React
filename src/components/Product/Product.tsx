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
interface Dimension{
    width:number,
    height:number,
    depth:number
}
interface Review{
    rating:number,
    comment:string,
    date:string,
    reviewerName:string,
    reviewerEmail:string
}
interface Meta{
    createdAt:string,
    updatedAt:string,
    barcode:string,
    qrCode:string
}
interface ProductData{
    title:string,
    price:number,
    discountPercentage:number,
    rating:number,
    stock:number,
    tags:string[],
    brand:string,
    weight:number,
    dimensions:Dimension,
    warrantyInformation:string,
    shippingInformation:string,
    availabilityStatus:string,
    reviews:Review[],
    returnPolicy:string,
    minimumOrderQuantity:number,
    meta:Meta,
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
        .then((data) => {
            setData(data);
            setTitle(data.title);
            setCategory(data.category);
            setPrice(data.price);
            setActualPrice(data.discountPercentage);
            setDes(data.description);
            setRating(data.rating);
            setBrand(data.brand);
            setWeight(data.weight);
            setMinOrder(data.minimumOrderQuantity)
        })
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
        .then(()=>{navigate('/')})
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
    const [actualprice,setActualPrice]=useState(0.0);
    const [rating,setRating]=useState(0.0);
    const [brand,setBrand]=useState("");
    const [weight,setWeight]=useState(0);
    const [minorder,setMinOrder]=useState(0);

    const updateprod=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        fetch(`https://dummyjson.com/products/${id}`,{
            method:'PATCH',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
            title:title,
            category:category,
            price:price,
            description: des,
            discountPercentage:actualprice,
            rating:rating,
            brand:brand,
            weight:weight,
            minimumOrderQuantity:minorder
        })
        })
        .then(()=>alert("Updated"))
        .then(()=>setDiaOpen(false))
        .catch((e)=>alert(e.message))   
        
    }
    const { cartitems } = useSelector((state: RootState) => state.cartitem);

    return(
        <div>
            <ArrowBackIcon className='backicon' onClick={backfun}/>
            <button className='cart' onClick={addcart}>Add to Cart</button>
            <h1>{title}</h1>
            <p className='destxt'>Description:</p>
            <p className='prodes'>{des}</p>

            
            <div className='prodbody'>
                <div className='prodimage'>
                    <img src={data?.images?.[0]} alt='prod img' className='prodimages'/>
                    <div className='pricebody'>
                        <h3>Price: ${price}</h3>
                        <p>Actual Price: <span style={{textDecoration:"line-through"}}>${actualprice}</span></p>
                    </div>
                </div>

                <div className='proddetails'>
                    <p><span className='txttitle'>Category : </span>{category}</p>
                    <p><span className='txttitle'>Rating : </span>{rating}</p>
                    <p><span className='txttitle'>Stock : </span>{data?.stock}</p>
                    <div>
                        <p className='txttitle'>Tags:</p>
                        <ul>
                        {data?.tags?.map((tag)=>
                        <li><span>{tag}</span></li>
                        )} 
                        </ul>
                    </div>
                    <p><span className='txttitle'>Brand : </span>{brand}</p>
                    <p><span className='txttitle'>Weight : </span>{weight} g</p>
                </div>
                
            </div>


            <div className='body2'>

                <div>
                    
                    <p className='destxt'>Dimensions:</p>
                    <ul>
                    <li><span className='txttitle'>Width : </span>{data?.dimensions?.width}</li><br />
                    <li><span className='txttitle'>Height : </span>{data?.dimensions?.height}</li><br/>
                    <li><span className='txttitle'>Depth : </span>{data?.dimensions?.depth}</li>
                    </ul><br/>
                    <p><span className='txttitle'>Waranty :</span> {data?.warrantyInformation}</p>
                    <p><span className='txttitle'>Shipping :</span> {data?.shippingInformation}</p>
                    <p><span className='txttitle'>Availability :</span> {data?.availabilityStatus}</p>
                    <p><span className='txttitle'>Return Policy :</span> {data?.returnPolicy}</p>
                    <p><span className='txttitle'>Minimum Order Quantity :</span> {data?.minimumOrderQuantity}</p>
                    <br/>
                    <div>
                        <p className='destxt'>Meta Data:</p>
                        <p><span className='txttitle'>Created At :</span> {data?.meta?.createdAt}</p>
                        <p><span className='txttitle'>Updated At :</span> {data?.meta?.updatedAt}</p>
                        <p><span className='txttitle'>Barcode :</span> {data?.meta?.barcode}</p>
                        <br/>
                        <p className='txttitle'>Scan here for more details:</p>
                        <img src={data?.meta?.qrCode} style={{height:'150px', width:'150px', margin:'20px'}} alt='qrcode'/>
                    </div>
                </div>
                
                <div>
                    <p className='destxt'>Reviews:</p>
                    <table>
                    {
                        data?.reviews?.map((review)=>
                        <tr><td>
                        <div>
                            <p className='txttitle'>Rating : {review.rating}</p>
                            <p>Comment : {review.comment}</p>
                            <p>Date : {review.date}</p>
                            <p>ReviewerName : {review.reviewerName}</p>
                            <p>ReviewerMail : {review.reviewerEmail}</p>
                        </div>
                        </td>
                        </tr>)
                    }
                    </table>
                </div>


            </div>
            

            <div>
                
            </div>



            <div className='btns'>
                <Button variant="contained"  className='deletebtn' onClick={delprod}>Delete</Button>
                <Button variant="contained" className='updatebtn' onClick={()=>{setDiaOpen(true);setTitle(title);setPrice(price);setCategory(category);setDes(des);
                    setActualPrice(actualprice);setBrand(brand);setRating(rating);setWeight(weight);setMinOrder(minorder);
                }}>Update</Button>
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
                    <form id="editform" onSubmit={updateprod}>
                        <TextField 
                            sx={{ width: '100%' }}
                        variant="standard"
                        value={title}
                        required
                        label='Title'
                        margin="dense"
                        onChange={(e)=>setTitle(e.target.value)}
                        /><br></br>
                        <TextField 
                            sx={{ width: '100%' }}
                            margin="dense"
                            required
                         variant="standard"
                        value={category}
                        label='Category'
                        onChange={(e)=>setCategory(e.target.value)}/><br />
                        <TextField 
                            sx={{ width: '100%' }}
                            margin="dense"
                        variant="standard"
                        required
                        value={price}
                        label='Price'
                        onChange={(e)=>setPrice(Number(e.target.value))}/><br/>
                        <TextField
                        sx={{width:'100%'}}
                        margin="dense"
                        required
                        variant="standard"
                        value={actualprice}
                        label='Actual Price'
                        onChange={(e)=>setActualPrice(Number(e.target.value))}
                        />
                        <p>Description</p>
                        <Textarea 
                        value={des}maxRows={5}
                        onChange={(e)=>setDes(e.target.value)}
                        sx={{width:'100%'}}
                        required
                        />
                        <TextField
                        sx={{width:'100%'}}
                        required
                        margin="dense"
                        variant="standard"
                        inputProps={{ min: 1.0, max: 5.0, step:0.01}} 
                        value={rating}
                        label='Rating'
                        type='Number'
                        onChange={(e)=>setRating(Number(e.target.value))}
                        />
                        <TextField
                        sx={{width:'100%'}}
                        margin="dense"
                        variant="standard"
                        required
                        value={brand}
                        label="Brand"
                        onChange={(e)=>setBrand(e.target.value)}
                        />
                        <TextField
                        sx={{width:'100%'}}
                        margin="dense"
                        required
                        variant="standard"
                        value={weight}
                        label="Weight"
                        type='Number'
                        onChange={(e)=>setWeight(Number(e.target.value))}
                        />
                         <TextField
                        sx={{width:'100%'}}
                        margin="dense"
                        value={minorder}
                        label="Minimum Order"
                        variant="standard"
                        type='Number'
                        inputProps={{min:1}}
                        required
                        onChange={(e)=>setMinOrder(Number(e.target.value))}
                        />
                        
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button form="editform" type='submit'>Edit</Button>
                </DialogActions>
            </Dialog>




        </div>);
}
export default Product;