import axios from 'axios';
import { useEffect, useState } from 'react'; 
import Game from '../components/Game';
import { baseUrl } from '../shared';
import Swiper from 'swiper';
import CategorySlider from '../components/CategorySlider';
import Slider from '../components/Slider';
import SwiperTest from '../components/SwiperTest';
import Carousel from '../components/Carousel';
import TopSellers from '../components/TopSellers';
import MostPopular from '../components/MostPopular';
// <div className='flex  items-center justify-center'>
// <SwiperTest/>
// </div>
//Analogous #5532db #7032db #8F32db  ||Split-Complementary  #db5532 #db8F32   || Tetradic #32db55 #db5532  
//||Split-Tetradic #5532db #db8F32  #32db55  ||#5532db #32db8F #db55db #8F32db, 
//#280f63, #5532db, #3d0e4e    #2a0e4e, #5532db, #4e0e28   #2a0e4e, #5532db, #4e552a   #2a0e4e, #5532db, #4e2a0e
export default function Home() {
    const [games, setGames] = useState();
    const [newfeatured, setNewfeatured] = useState();
    useEffect(() => {
        const url = baseUrl + 'api/game/'
        axios.get(url).then((response) => {
            setGames(response.data)
        });
        const url2 = baseUrl + 'api/newfeatured/'
        axios.get(url2).then((response) => {
            setNewfeatured(response.data)
        });
    }, [])

    return( 
            <div className='mx-auto w-[75%]'>
                <Carousel
                    newfeatured={newfeatured}
                />
                <div className='mt-5'>
                    <MostPopular/>
                </div>
                <div className='mt-5'>
                    <TopSellers/>
                </div>
                <div className='flex items-center justify-center mt-5'>
                    <Slider/>
                </div>
                <div className='h-[500px]'>

                </div>
            </div>
            
    )
}