import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect,useState } from 'react';
import { baseUrl } from '../shared';
import axios from 'axios';


export default function Slider() {
    const [categories, setCategories] = useState();
    useEffect(() => {
        const url_category = baseUrl + 'api/category/'
        axios.get(url_category).then((response) => {
            setCategories(response.data.results)
        })
    }, [])

    const gradientColors = [
        'from-lime-600',
        'from-rose-600',
        'from-fuchsia-600',
        'from-violet-600',
        'from-indigo-600',
        'from-emerald-600',
        'from-amber-600',
        'from-red-600',
        'from-orange-600',
        'from-sky-600',
      ];
      return (
        <>
          {categories ? (
            <div className='flex justify-center	 sm:justify-start gap-4 '>
              <button className='w-30 h-30 mr-10'>
                <FontAwesomeIcon className='text-white text-5xl' icon={faChevronLeft} />
              </button>
              {categories.map((category, index) => (
                <Link className="transition-transform transform transform group hover:scale-105 hover:brightness-110" key={category.id} to={`/category/${category.slug}`}>
                  <div className="relative">
                    <div
                      className={`gradient-overlay absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t ${gradientColors[index % gradientColors.length]} to-white-500`}
                    ></div>
                    <img
                      className="mx-auto w-full h-auto"
                      src={category.image}
                      alt={category.name}
                    />
                    <span className="absolute bottom-2 left-0 right-0 bg-transparent text-white text-center py-3 text-2xl font-medium">
                      {category.name}
                    </span>
                  </div>
                </Link>
              ))}
              <button className='w-30 h-30 ml-10'>
                <FontAwesomeIcon className='text-white text-5xl' icon={faChevronRight} />
              </button>
            </div>
          ) : null}
        </>
      );
};