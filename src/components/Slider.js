import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect,useState } from 'react';
import { baseUrl } from '../shared';
import axios from 'axios';


export default function Slider() {
    const [categories, setCategories] = useState();
    const [next, setNext] = useState(null);
    const [prev, setPrev] = useState(null);
    const [last, setLast] = useState(null);
    const url_category = baseUrl + 'api/category/'

    function request(url) {
        axios.get(url, {
          method: 'GET',
          'Content-Type': 'application/json',
        }).then((response) => {
          setCategories(response.data.results)
          setNext(response.data.links.next)
          setPrev(response.data.links.previous)
          setLast(response.data.total_pages)
        })
        .catch((e) => {
          console.error('Error fetching data:', e);
        })

    }
    const handleNextButtonClick = (url) => {
      url ? request(url) : request(url_category)
    }
    const handlePrevButtonClick = (url) => {
      if(url) {
        request(url)
      } else {
        console.log('last')
        let last_url = `${url_category}?page=${last}`
        request(last_url)
      }
    }

    useEffect(() => {
        request(url_category)
    }, [url_category])

    const gradientColors = [
        'from-[#8B0000] to-[#000000]/[.0]',
        'from-[#00008B] to-[#000000]/[.0]',
        'from-[#B8860B] to-[#000000]/[.0]',
        'from-[#006400] to-[#000000]/[.0]',
      ];
      return (
        <>
          {categories ? (
            <div className='flex justify-center	 sm:justify-start '>
              <div className='flex my-[60px] pl-4 pr-2 mr-2 bg-gradient-to-r from-[#5532db]/[.4] to-[#5532db]/[0] arrow-left items-center cursor-pointer'
                onClick={(e) => {
                  handlePrevButtonClick(prev)
                }}> 
                  <FontAwesomeIcon className='text-white text-5xl' icon={faChevronLeft} />
              </div>
              {categories.map((category, index) => (
                <Link className="w-50 mr-4 transition-transform transform transform group hover:scale-105 hover:brightness-110 my-5" key={category.id} to={`/category/${category.slug}`}>
                  <div className="relative">
                      <div
                        className={`gradient-overlay absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t ${gradientColors[index  % gradientColors.length]}`}
                      ></div>
                      <img
                        className="mx-auto w-full h-auto"
                        src={category.image}
                        alt={category.name}
                        loading='lazy'
                      />
                      <span className="absolute bottom-2 left-0 right-0 bg-transparent text-white text-center py-3 text-2xl font-medium">
                        {category.name}
                      </span>
                          
                  </div>

                </Link>
              ))}
              <div className='flex my-[60px] pl-0 pr-4 mr-2 bg-gradient-to-l from-[#5532db]/[.4] to-[#5532db]/[0] arrow-right items-center cursor-pointer'
                onClick={(e) => {
                  handleNextButtonClick(next)
                }}> 
                  <FontAwesomeIcon className='text-white text-5xl' icon={faChevronRight} />
              </div>
            </div>
          ) : null}
        </>
      );
};