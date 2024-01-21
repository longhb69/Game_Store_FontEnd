import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../shared';
import FillterGame from '../components/FillterGame';

export default function Search() {
    const params = useParams();
    const [games, setGames] = useState();
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    let getData = (query='') => {
        axios.get(`${baseUrl}search?q=${query}&tag=Action`).then((response) => {
            setGames(response.data)
        })
    }
    let searchData = () => {
        getData(params.q)
    }
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${baseUrl}api/category/?page=${currentPage}`);
            setCategories(prevCategories => [...(prevCategories || []), ...response.data.results]);
            setTotalPages(response.data.total_pages);
            handleLoadMore();
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        if (currentPage <= totalPages) {
          fetchData();
        }
    }, [currentPage, totalPages]);

    const handleLoadMore = () => {
        setCurrentPage(prevPage => prevPage + 1);
      };
    useEffect(() => {
        console.log("Use effect")
        searchData();
    }, [params])
    return (
        <>
            <div className='w-[75%] mx-auto max-w-[1600px]'>
                <div className='pb-20 '>
                    <section className='h-full'>
                        <div className='flex w-full max-w-[none]'>
                            <div className='flex flex-row-reverse w-full h-full text-base'>
                                <aside className='w-[245px] shrink-0 mt-5'>
                                    <div className='w-full overflow-hidden'>
                                        <div>
                                            <div className='flex h-[54px] justify-between pt-2 flex items-center'>
                                                <div className='px-4'>Fillters</div>
                                                <button className='text-center items-center cursor-pointer flex px-3.5 py-3'>
                                                    <div>RESET</div>
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='px-3.5 mb-4'>
                                                <div className='relative'>
                                                    <span className='absolute left-[10px] block top-[13px] w-3 h-3 z-1'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" viewBox="0 0 21 20" preserveAspectRatio="xMidYMid meet"><g transform="scale(1 -1) rotate(-45 -11.93502884 -2)" stroke="currentColor" stroke-width="1.65" fill="none" fill-rule="evenodd"><circle cx="7.70710678" cy="7.70710678" r="7"></circle><path d="M15.2071068 8.62132034h5.6923881" stroke-linecap="square"></path></g></svg>
                                                    </span>
                                                    <input type="text" placeholder='Keywords' className='pr-[30px] pl-[40px] rounded bg-none outline-none w-full h-[40px] bg-[#202020]'>
                                                    </input>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className='items-center cursor-pointer flex justify-between'>
                                                <button className='items-center flex font-medium justify-between opacity-[0.6] px-3.5 py-5 w-full border border-transparent	hover:opacity-[1]'>
                                                    <div className='text-sm'>GENRE</div>
                                                    <div>
                                                        <span className='block h-3 w-4 rotate-90 genre-btn'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" viewBox="0 0 7.7 12"><path fill="currentColor" d="M1.7 0L0 1.7 4.3 6 0 10.3 1.7 12l6-6z"></path></svg>
                                                        </span>
                                                    </div>
                                                </button>
                                            </div>
                                            <div>
                                                {categories ? 
                                                    <>
                                                        {categories.map((category) => {
                                                            return (
                                                                <div>
                                                                    <div>
                                                                        <div className='items-center flex font-medium justify-between opacity-[0.6] px-3.5 py-5 w-full border border-transparent	hover:opacity-[1]'>
                                                                            <div>
                                                                                {category.name}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </>
                                                : null}
                                            </div>
                                        </div>
                                    </div>
                                </aside>
                                <div className='pr-4 w-[calc(100%-245px)]'>
                                    <section>
                                        <div className='m-w-[none] h-full mx-auto'>
                                            <section className='h-full'>
                                                {games ? <>
                                                    <section className='mb-4 w-full mt-5'>
                                                        <ul className='list-none content-stretch flex flex-nowrap w-full gap-4'>
                                                            {games.map((game) => {
                                                                return (
                                                                    <>
                                                                        <li className='mb-[48px] transition ease-in-out duration-[125ms] w-[calc(25%-65px)] max-h-[300px] min-h-[150px] min-w-[112px]'>
                                                                            <div>
                                                                                <FillterGame
                                                                                    slug={game.slug}
                                                                                    cover={game.cover}
                                                                                    name={game.name}
                                                                                    price={game.price}
                                                                                    />
                                                                            </div>
                                                                        </li>
                                                                    </>
                                                                );
                                                            })}
                                                        </ul>
                                                    </section>
                                                </>
                                                : null}
                                            </section>
                                        </div>
                                        
                                    </section>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}