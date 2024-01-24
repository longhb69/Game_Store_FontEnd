import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAccount, useCart, useLogin } from "../LoginContext";
import { baseUrl } from "../shared";

export default function SaleSection(props) {
    const [loggedIn, setLoggedIn] = useLogin()
    const [itemsInCart, setItemsInCart,getItemInCart, cartQuantity, setCartQuantity, getCartQuantity] = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const url = baseUrl + 'cart/'

    function addCart(game_id) {
        const data = {type:'game', base_game_id: game_id}
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
            getCartQuantity();
            getItemInCart();
            navigate('/cart')
            return response.json();
        })
    }

    return (
        <div className="bg-gradient-to-t from-[#2C3037] to-[#505F6E]  mt-6">
            <div className="">
                <div className="flex px-[16px] py-[4px] w-full items-center text-[#c6d4df]">
                    <div className="border-b-2 p-[4px] mb-[4px] mr-[8px] whitespace-nowrap cursor-pointer text-[#fff]">All ITEMS</div>
                    <div className='p-[4px] mb-[4px] mr-[8px] ml-[8px] whitespace-nowrap cursor-pointer'>TOP SELLERS</div>
                    <div className='p-[4px] mb-[4px] mr-[8px] ml-[8px] whitespace-nowrap cursor-pointer'>TOP RATED</div>
                    <div className='p-[4px] mb-[4px] mr-[8px] ml-[8px] whitespace-nowrap cursor-pointer'>POPULAR UPCOMING</div>
                </div>
                <div className="px-[16px] mt-3 relative">
                    {props.games ? 
                        <>
                            {props.games.map((game) => {
                                return (
                                    <>
                                    <div className="mb-[4px] relative">
                                        <div className="text-[#c6d4df] text-xs">
                                            <div className="h-[115px] relative">
                                                <div className="category-game-containter overflow-hidden absolute top-0 bottom-0 flex left-0 right-0 bg-gradient-to-tl from-[#42454c99] to-[#25282e66]">
                                                   <div className="basis-[24%]">
                                                        <Link to={`/app/${game.slug}`} > 
                                                            <img className="p-1 w-full h-full" src={game.image}/>
                                                        </Link>
                                                   </div>
                                                   <div className="relative basis-[75%] px-2 py-2 flex flex-col overflow-hidden">
                                                        
                                                        <div className="text-base flex justify-between z-1">
                                                            <Link to={`/app/${game.slug}`} className="text-[#fff]"> 
                                                                <div className="uppercase hover:underline">
                                                                    {game.name}
                                                                </div>
                                                            </Link>
                                                        </div>
                                                        <div className="flex flex-ccol">
                                                            <div className="my-2 h-[22px] overflow-hidden text-left block ">
                                                                {game.category.map((category) => {
                                                                    return (
                                                                        <a target='_blank' href={`/category/${category.slug}`}
                                                                            className="inline-block px-2 py-0.5 text-[#a5b0b6] bg-[#708189]/[.15] mr-2 rounded max-w-[200px] whitespace-nowrap overflow-hidden hover:text-[#32db8F]">
                                                                            {category.name}
                                                                        </a>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-start items-center shrink-0">
                                                            <div className="flex text-left items-center mr-3 shrink-0 text-[#a5b0b6]">
                                                                {game.year}
                                                            </div>
                                                        </div>
                                                        <div className="z-1 mt-auto absolute right-[1px] bottom-[5px] flex flex-wrap justify-end grow-1 items-end min-h-[60px] text-base">
                                                            <div className="flex flex-end flex-row-reverse items-center text-sm">
                                                                <div className="bg-[#5532db] flex basis-1/2 grow-1 items-center justify-center w-auto px-[30px] py-[12px] h-[38px] text-[#fff] text-center rounded overflow-hidden whitespace-nowrap self-center hover:brightness-110 cursor-pointer"
                                                                    onClick={(e) => {
                                                                        e.preventDefault()
                                                                        addCart(game.id)
                                                                    }}
                                                                >
                                                                    <span>Add to Cart</span>
                                                                </div>
                                                                <div className="flex h-[40px]">
                                                                    <div className="m-1 mr-0 bg-[#000000]/[.1] px-3 py-2 text-[14px] items-center flex whitespace-nowrap">
                                                                        {game.price}<span className="underline">đ</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                   </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </>
                                );
                            })}
                        </>
                    : null}
                </div>
            </div>
            
        </div>
    );
}