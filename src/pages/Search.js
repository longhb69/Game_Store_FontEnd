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
    const [btnActive, setBtnActive] = useState(false);
    const [loading, setLoading] = useState(true);
    const [tags, setTags] = useState([]);
    const [tagIds, setTagIds] = useState([]);

    let getData = (query='') => {
        setLoading(true)
        const url = tags && tags.length > 0
        ? `${baseUrl}search?q=${query}&tag=${tags}`
        : `${baseUrl}search?q=${query}`;

        axios.get(url).then((response) => {
            setGames(response.data);
            setLoading(false);
        }).catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });;
    }
    let searchData = () => {
        getData(params.q)
    }
    function fetchData()  {
        try {
          axios.get(`${baseUrl}api/category/?page=${currentPage}`).then((response) => {
            setCategories((prevCategories) => [...prevCategories, ...response.data.results]);
            setTotalPages(response.data.total_pages);
            setCurrentPage(response.data.current_page);
          })
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    useEffect(() => {
        fetchData();
    }, [])
    useEffect(() => {
        console.log("current", currentPage);
        console.log("Total", totalPages);
    }, [currentPage, totalPages]);

    useEffect(() => {
        searchData();
    }, [tags,params])

    function fillter(game_name,  id) {
        if(tagIds.includes(id)) {
            console.log("Include" , id)
            setTagIds((prevId) => prevId.filter((tagId) => tagId !== id ))
            setTags((prevTags) => prevTags.filter((name) => name != game_name))
        }
        else {
            console.log("not include")
            setTagIds((prevId) => [...prevId || null, id]);
            setTags((prevTags) => [...prevTags || null, game_name]);
        }
    }
    return (
        <>
            <div className='w-[75%] h-[1450px] mx-auto max-w-[1600px]'>
                <div className='pb-20 '>
                    <section className='h-full'>
                        <div className='flex w-full max-w-[none]'>
                            <div className='flex flex-row-reverse w-full h-full text-base'>
                                <aside className='w-[280px] shrink-0 mt-5'>
                                    <div className='w-full overflow-hidden'>
                                        <div>
                                            <div className='flex h-[54px] justify-between pt-2 flex items-center'>
                                                <div className='px-4'>Fillters ({tagIds.length})</div>
                                                <button className='text-center items-center cursor-pointer flex px-3.5 py-3'>
                                                    <div onClick={() => {
                                                        setTagIds([])
                                                        setTags([])
                                                    }}>RESET</div>
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
                                            <div className='fillter-container'>
                                                <div className='items-center cursor-pointer flex justify-between'>
                                                    <button className={`items-center flex font-medium justify-between opacity-[0.6] px-3.5 py-5 w-full border ${btnActive ? 'border-[#fff]' : 'border-transparent'} hover:opacity-[1] transition`}
                                                        onClick={(e) => {
                                                            setBtnActive(!btnActive);
                                                        }}>
                                                        <div className='text-sm'>GENRE</div>
                                                        <div>
                                                            <span className={`block h-3 w-4 rotate-90 ${btnActive ? 'genre-btn-up' : 'genre-btn-down' }`}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full" viewBox="0 0 7.7 12"><path fill="currentColor" d="M1.7 0L0 1.7 4.3 6 0 10.3 1.7 12l6-6z"></path></svg>
                                                            </span>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className={`${btnActive ? '' : 'hidden'} transition`}>
                                                {categories ? 
                                                    <>
                                                        {categories.map((category, index) => {
                                                            return (
                                                                <div>
                                                                    <div>
                                                                        <div className={`items-center flex font-medium justify-between opacity-[0.6] px-3.5 py-5 mb-2 w-full rounded  ${tagIds.includes(index) ? 'bg-[#fff]/[0.1]' : '' } hover:opacity-[1] cursor-pointer`}
                                                                            onClick={(e) => {
                                                                                fillter(category.name, index)
                                                                            }}>
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
                                <div className='pr-4 w-[calc(100%-280px)]'>
                                    <section className="h-full">
                                        <div className='m-w-[none] h-full mx-auto'>
                                            {loading ? 
                                                <p>Loading</p>
                                            : 
                                                <section className='h-full'>
                                                    {games && games.length > 0 ? <>
                                                        <section className='mb-4 w-full mt-5'>
                                                            <ul className='list-none content-stretch flex flex-wrap w-full items-stretch gap-4'>
                                                                {games.map((game) => {
                                                                    return (
                                                                        <>
                                                                            <li className='mb-[48px] transition ease-in-out duration-[125ms] w-[calc(25%-65px)] max-h-[300px] min-h-[150px] min-w-[112px]'>
                                                                                <div>
                                                                                    <FillterGame
                                                                                        slug={game.slug}
                                                                                        cover={game.cover}
                                                                                        name={game.name}
                                                                                        price={game.price}/>
                                                                                </div>
                                                                            </li>
                                                                        </>
                                                                    );
                                                                })}
                                                            </ul>
                                                        </section>
                                                    </>
                                                    : 
                                                    <>
                                                        <div className='flex flex-col h-full'>
                                                            <div className='flex flex-col items-center justify-center text-center h-auto'>
                                                                <div className='mt-10 text-5xl'>
                                                                    <span>No results found</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                    }
                                                </section>
                                            }
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