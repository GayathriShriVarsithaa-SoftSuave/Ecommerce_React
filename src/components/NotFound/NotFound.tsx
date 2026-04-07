import './NotFound.css'
import { useNavigate } from 'react-router-dom';
const NotFound=()=>{
    const navigate=useNavigate();
    const home=()=>{
        navigate('/');
    };
    return(<div className='notfound'>
        <h1>Not Found!!</h1>
        <button onClick={home} className='homebtn'>Go to Home</button>
    </div>);
}
export default NotFound;