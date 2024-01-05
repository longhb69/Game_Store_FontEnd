import { LoginContext } from '../App';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLogin } from '../LoginContext';
import { baseUrl } from '../shared';


//from-[#6164654D] to-[blue-500]    #E2F4FF4D
export default function GameDLC(props) {

    const navigate = useNavigate();
    const location = useLocation();
    const [loggedIn, setLoggedIn, cartQuantity, setCartQuantity, getCartQuantity] = useLogin()

    function addCart(game_id) {
        const url = baseUrl + 'cart/'
        const data = {type: "dlc", base_game_id: game_id}
        fetch(url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('access'), 
            },
            body: JSON.stringify(data),
        }).then((response) => {
            if (response.status === 403 || response.status === 401) {
                setLoggedIn(false);
                navigate('/login', {
                    state: {
                        previousUrl: location.pathname
                    }
                });
            }
            else if(!response.ok) {
                throw new Error('Something went wrong')
            }
            getCartQuantity()
            return response.json();
        })
    }

    return (
        <>
        <div className='flex flew-row'>
            <div className='block bg-gradient-to-r from-[#6164654D] to-blue-600 basis-3/4 rounded-lg mb-5'>
                <div className="flex flex-row">
                    <div className="basis-1/3 shrink">
                        <div className="w-full h-full">
                            <Link className='block h-full w-full' to={'/app/dlc/' + props.slug} key={props.id}>
                                <img className="w-full h-full object-fit block" src={props.image} alt={props.name}/>
                            </Link>
                        </div>
                    </div>
                    <div className="right">
                        <div>
                            <Link className='block' to={'/app/dlc/' + props.slug} key={props.id}>
                                <h3>
                                    <span>{props.name}</span>
                                </h3>
                            </Link>
                        </div>
                        <div>
                            <div>
                                <div>   
                                    <span>{props.price}<span className='underline'>đ</span></span>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault()
                                            addCart(props.id)
                                        }}>
                                        <span>ADD TO CART</span>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <button>
                                        <span>ADD TO WISHLIST</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='space'>
            </div>
        </div>
        </>
    );
} 