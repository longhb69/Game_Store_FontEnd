import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function GameDeatail(props) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>  
            <div className="h-full relative font-normal font-inter transition-transform transform transform group hover:brightness-110" >
                <div className={`absolute -right-10 -top-9 bg-gray-800 text-white text-sm px-3 py-1 rounded ${ isHovered ? 'opacity-100' : 'opacity-0'}`}>
                            Add to Wishlist
                </div>
                <div className='absolute top-0 right-0'>
                    <button className='w-[30px] h-[30px] flex items-center justify-center'
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity fill-rose-300 hover:fill-rose-500">
                        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                    </svg>
                    </button>
                </div>
                <Link to={'/app/' + props.slug}>
                    <img className="w-full h-2/3 object-fit rounded hover:scale-105" src={props.cover}/>
                    <p className="my-4" >{props.name}</p>
                    <p className="text-start">
                        {props.price}<span className="underline">đ</span>
                    </p>
                </Link>
            </div>
        </>
    );
}
