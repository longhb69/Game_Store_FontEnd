import axios from 'axios';
import { useEffect, useState } from 'react'; 
import { baseUrl } from '../shared';
import Slider from '../components/Slider';
import Carousel from '../components/Carousel';
import TopSellers from '../components/TopSellers';
import BrowseSlider from '../components/BrowseSlider';
import { useCart } from '../LoginContext';
import NewRelease from '../components/NewRelease';
import DeveloperSlider from '../components/DeveloperSlider';

//Analogous #5532db #7032db #8F32db  ||Split-Complementary  #db5532 #db8F32   || Tetradic #32db55 #db5532  
//||Split-Tetradic #5532db #db8F32  #32db55  ||#5532db #32db8F #db55db #8F32db, 
//#280f63, #5532db, #3d0e4e    #2a0e4e, #5532db, #4e0e28   #2a0e4e, #5532db, #4e552a   #2a0e4e, #5532db, #4e2a0e
export default function Home() {
    const [games, setGames] = useState();
    const [newfeatured, setNewfeatured] = useState();
    const mostPopularUrl = baseUrl + 'api/most-popular'
    const newRelease = baseUrl + 'api/new-release'
    const DeveloperUrl1 = baseUrl + 'api/developer/electronic-arts';
    const DeveloperUrl2 = baseUrl + 'api/developer/playstation-pc-llc';
    const EAlogo = 'https://res.cloudinary.com/dfo61m8dy/image/upload/v1706551414/Electronic-Arts-Logo.svg_yfzi4s.png';
    const PSlogo = 'https://res.cloudinary.com/dfo61m8dy/image/upload/v1706551730/2560px-PlayStation_logo.svg_j6cdu8.png'

    useEffect(() => {
        const url2 = baseUrl + 'api/newfeatured/'
        axios.get(url2).then((response) => {
            setNewfeatured(response.data)
        });
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
                <div className={`w-full bg-gradient-to-r from-[#0d1042] to-[#792844] mt-8 pb-4`}>
                    <DeveloperSlider 
                        url={DeveloperUrl1}
                        logo={EAlogo}
                    />
                </div>
                <div className={`w-full bg-gradient-to-r from-[#006FCC] to-[#00AC9F] pb-4 mb-4`}>
                    <DeveloperSlider 
                        url={DeveloperUrl2}
                        logo={PSlogo}
                    />
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