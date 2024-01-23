import { Link } from 'react-router-dom';
export default function FillterGame(props) {
    return (
        <>
            <div className="h-full w-full font-normal font-inter">
                <Link className='flex flex-col h-full w-full' to={'/app/' + props.slug}>
                    <div className='rounded-md h-full hover-affect relative'>
                        <img className='rounded-md object-cover' src={props.cover} loading='lazy'/> 
                    </div>
                    <div className='text-base flex flex-col font-normal'>
                        <div className='overflow-hidden mt-2'>{props.name}</div>
                        <div className='flex items-center mt-1'>
                            <div>{props.price}<span className="underline">đ</span></div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}