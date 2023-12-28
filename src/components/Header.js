import { useContext, useEffect } from 'react';
import { NavLink,Link } from 'react-router-dom';

export default function Header(props) {
    return (
        <>
            <div className='flex justify-end mx-28 py-8' >
                <Link to={'#'}>
                    <p className='text-white text-xl flex flex-end'>Cart</p>
                </Link>
            </div>
        {props.children}
        </>
    );
}