import './Home.css'
import Thumbnail from '../Thumbnail/Thumbnail'
import Fab from '@mui/material/Fab';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, Drawer, TextField} from '@mui/material';
import { useEffect,useState } from 'react';
import Item from '../Item/Item';
import { useSelector} from 'react-redux';
import type { RootState } from '../../app/store';
import {Dialog} from '@mui/material';
import {DialogActions} from '@mui/material';
import {DialogContent} from '@mui/material';
import {DialogContentText} from '@mui/material';
import {DialogTitle} from '@mui/material';
import Textarea from '@mui/joy/Textarea';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import {TablePagination} from '@mui/material';
const Home=()=>{
    const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
    const fetchdata=()=>{
        fetch('https://dummyjson.com/products')
        .then(res=>res.json())
        .then(data=>setData(data.products))
        .catch(err=>alert(err))
    }

    const [data,setData]=useState([]);

    const [opendrawer,setOpenDrawer]=useState(false);
    const [opendia,setOpenDia]=useState(false);

    const[title,setTitle]=useState("");
    const[des,setDes]=useState("");
    const[category,setCategory]=useState("");
    const[price,setPrice]=useState(0.0);
    const[stock,setStock]=useState(0);
    const[brand,setBrand]=useState("");
    const[imgurl,setImgUrl]=useState("");
    const[rating,setRating]=useState(0);
    


    const addproduct=(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(rating===0){
            alert("Give rating")
            return
        }
        fetch('https://dummyjson.com/products/add', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                title:title,
                description:des,
                category:category,
                price:price,
                stock:stock,
                brand:brand,
                thumbnail:imgurl,
                rating:rating
            })
        })
        .then(()=>alert("Product added!"))
        .catch((e)=>alert(e.message))
    }

    useEffect(()=>{
        fetchdata();
    },[])
    const { cartitems } = useSelector((state: RootState) => state.cartitem);
    return(
        <div>
          <div className='homehead'>  
            <div className='prodhead'>
                <p>PRODUCTS</p>
                <ShoppingCartIcon className='carticon' onClick={()=>setOpenDrawer(true)}/>
            </div>

            <div className='btnsearch'>
                <Fab variant='extended' onClick={()=>setOpenDia(true)} sx={
                    {
                        position:'fixed',
                        top:'4%',
                        left:'5%',
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
                    {
                        Object.keys(cartitems).length!=0 && (<Button variant="contained" color="secondary" sx={{ml:'10px'}}>Proceed to Buy</Button>)
                    }
                </div>
            </Drawer>

            <Dialog open={opendia} onClose={()=>setOpenDia(false)}>
                <DialogTitle>Add a Product</DialogTitle>
                <DialogContentText sx={{textIndent:25}}>Enter details for the product to add</DialogContentText>
                <DialogContent>
                            
                    <form id='addform' onSubmit={addproduct}>
                
                        <TextField placeholder='Enter title of product' label='Title' sx={{ width: '400px' }} margin="dense" required onChange={(e)=>setTitle(e.target.value)}/><br />
                        <TextField placeholder='Enter category of the product' label='Category' sx={{ width: '400px' }} margin="dense" required onChange={(e)=>setCategory(e.target.value)}/><br />
                        <TextField placeholder='Enter price of the product' type='number' label='Price' sx={{ width: '400px' }} margin="dense" required onChange={(e)=>setPrice(Number(e.target.value))}/><br />
                        <p>Description</p>
                        <Textarea placeholder='Enter description of the product' maxRows={5} required onChange={(e)=>setDes(e.target.value)}/>
                        <TextField placeholder='Enter product stock' type='number' label='Stock' sx={{ width: '400px' }} margin="dense" required onChange={(e)=>setStock(Number(e.target.value))}/><br />
                        <TextField placeholder='Enter brand of the product' label='Brand' sx={{ width: '400px' }} margin="dense" required onChange={(e)=>setBrand(e.target.value)}/><br />
                        <TextField placeholder='Enter image url of the product' type='url' label='Image URL' sx={{ width: '400px' }} margin="dense" required onChange={(e)=>setImgUrl(e.target.value)}/><br />
                        <p>Rating for the Product:</p>
                        <RadioGroup orientation='horizontal' sx={{gap:2}} onChange={(e)=>setRating(Number(e.target.value))}>
                            <Radio value="1" label='1'  variant='outlined' />
                            <Radio value="2" label="2"  variant='outlined'/>
                            <Radio value="3" label="3"  variant='outlined'/>
                            <Radio value="4" label="4"  variant='outlined'/>
                            <Radio value="5" label="5"  variant='outlined'/>
                        </RadioGroup>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button form='addform' type='submit'>Add Product</Button>
                </DialogActions>
            </Dialog>
            



            <div className='homeitems'>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item)=>
                    <Thumbnail id={item?.id} imgval={item?.thumbnail} title={item?.title} price={"$"+item?.price} des={item?.description}/>
                )}
            </div>
            <div className='page'>
                <TablePagination
                    sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                    count={data.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />  
            </div>
        </div>
);
}
export default Home;