import axios from 'axios';
import { useEffect, useState } from 'react'; 
import { baseUrl } from '../shared';
import Slider from '../components/Slider';
import Carousel from '../components/Carousel';
import TopSellers from '../components/TopSellers';
import BrowseSlider from '../components/BrowseSlider';
import { useCart } from '../LoginContext';
import NewRelease from '../components/NewRelease';

//Analogous #5532db #7032db #8F32db  ||Split-Complementary  #db5532 #db8F32   || Tetradic #32db55 #db5532  
//||Split-Tetradic #5532db #db8F32  #32db55  ||#5532db #32db8F #db55db #8F32db, 
//#280f63, #5532db, #3d0e4e    #2a0e4e, #5532db, #4e0e28   #2a0e4e, #5532db, #4e552a   #2a0e4e, #5532db, #4e2a0e
export default function Home() {
    const [games, setGames] = useState();
    const [newfeatured, setNewfeatured] = useState();
    const mostPopularUrl = baseUrl + 'api/most-popular'
    const newRelease = baseUrl + 'api/new-release'
    const [itemsInCart, setItemsInCart,getItemInCart, cartQuantity, setCartQuantity, getCartQuantity] = useCart();
    useEffect(() => {
        const url = baseUrl + 'api/game/'
        axios.get(url).then((response) => {
            setGames(response.data)
        });
        const url2 = baseUrl + 'api/newfeatured/'
        axios.get(url2).then((response) => {
            setNewfeatured(response.data)
        });
        getCartQuantity();
    }, [])

    return( 
            <div className='mx-auto w-full relative'>
                <div className='w-[75%] mt-10 mx-auto'>
                    <Carousel
                        newfeatured={newfeatured}
                    />
                </div>
                <div className='mt-5 w-[75%] mx-auto'>
                    <BrowseSlider 
                        url={mostPopularUrl}
                        title={'Popular'}
                        linkable={true}
                        slug={'most-popular'}/>
                </div>
                {/* <div className='mt-5'>
                //     <BrowseSlider 
                //         url={newRelease}
                //         title={'New Release'}
                //         linkable={false}
                //     />
                // </div>*/}
                <div className='mt-8 '>
                        <NewRelease
                            url={newRelease}
                            title={'New Release'}
                            />
                </div>
                <div className='mt-5 w-[75%] mx-auto'>
                    <TopSellers/>
                </div>
                <div className='flex flex-col items-center justify-center mt-5'>
                    <Slider/>
                </div>
                <div className='h-[500px]'>

                </div>
            </div>
    )
}