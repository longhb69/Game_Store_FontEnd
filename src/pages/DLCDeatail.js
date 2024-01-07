import { useRef, useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../shared';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { LoginContext } from '../App';
import { useLogin } from '../LoginContext';

export default function DLCDeatail() {
    const slug = useParams().slug
    console.log(slug)
    return (
        <>
            <div>
                <p className='text-white'>DLC {slug}</p>
            </div>
        </>
    );
}