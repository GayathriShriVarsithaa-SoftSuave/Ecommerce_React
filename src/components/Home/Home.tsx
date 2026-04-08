import './Home.css'
import Thumbnail from '../Thumbnail/Thumbnail'
import Fab from '@mui/material/Fab';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Drawer, TextField} from '@mui/material';
import { useEffect,useState } from 'react';
import Item from '../Item/Item';
import { useSelector} from 'react-redux';
const Home=()=>{
    const fetchdata=()=>{
        fetch('https://dummyjson.com/products')
        .then(res=>res.json())
        .then(data=>setData(data.products))
        .catch(err=>alert(err))
    }

    const [data,setData]=useState([]);

    const [opendrawer,setOpenDrawer]=useState(false);

    useEffect(()=>{
        fetchdata();
    },[])
    const cartitems=useSelector((state:any)=>state.cartitem.cartitems);
    return(
        <div>
            
            <div className='prodhead'>
                <p>PRODUCTS</p>
                <ShoppingCartIcon className='carticon' onClick={()=>setOpenDrawer(true)}/>
            </div>

            <div className='btnsearch'>
                <Fab variant='extended' sx={
                    {
                        position:'fixed',
                        top:'85%',
                        right:'5%',
                        backgroundColor:'#02e7d0',
                        color:'black',
                        '&:hover': {
                            backgroundColor: ' #26a69a',
                            cursor:'pointer'},
                            '&:active': {
                        backgroundColor:'#02e7d0',

                            }
                    }
                }>
                Add
                </Fab>

                <TextField id="prodsearch" placeholder="Search Products.." variant="outlined" size='small' className='searchbar'
                sx={
                    {
                        '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            border: 'none',
                        },
                        '&:hover fieldset': {
                            border: 'none',
                        },
                        '&.Mui-focused fieldset': {
                            border: 'none',
                        },
                    },
                    }   
                }
                InputProps={{
                    endAdornment: (
                        <SearchIcon />
                    )
                }}/>
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

            <div className='homeitems'>
                {data.map((item)=>
                    <Thumbnail id={item?.id} imgval={item?.thumbnail} title={item?.title} price={"$"+item?.price} des={item?.description}/>
                )}
            </div>

        </div>
);
}
export default Home;