// import Slider from 'react-slick';
// import { Link } from 'react-router-dom';
// import React, { Component } from "react";

// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// function RightArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         className={className}
//         style={{ ...style, display: "block", background: "red" }}
//         onClick={onClick}
//       />
//     );
// }

// export default function CategorySlider({categories}) {
//     const gradientColors = [
//       'from-lime-600',
//       'from-rose-600',
//       'from-fuchsia-600',
//       'from-violet-600',
//       'from-indigo-600',
//       'from-emerald-600',
//       'from-amber-600',
//       'from-red-600',
//       'from-orange-600',
//       'from-sky-600',
//     ]
//     if (!categories) {
//         return null; // CategorySlider component is initially rendered, and categories is not yet defined or set.
//     }
//     const Swiper = ({ categories }) => {
//       const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 4,
//         slidesToScroll: 4,
        
//       };
//     return (
//           <div className="relative w-full max-w-screen-xl mx-auto">
//           <Slider {...settings}>
//             {categories.map((category, index) => (
//               <div key={index} className="h-64 overflow-hidden">
//                 {/* Your slide content goes here */}
//                 <img
//                   src={category.image}
//                   alt={category.name}
//                   className="object-cover w-full h-full"
//                 />
//               </div>
//             ))}
//           </Slider>
//         </div>     
//       );
//   }
// }
// CustomSwiper.js
import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';



function Arrow({onClick, direction }) {
      return (
        <div
          className={`${direction === 'right' ? 'next' : 'pre'} slick`}
          onClick={onClick}
        >
        <FontAwesomeIcon className='red' icon={direction === 'right' ? faChevronRight : faChevronLeft} />
        </div>
      );
  }

const CategorySlider = ({ categories }) => {
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
        ]
  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    variableWidth: true,
    nextArrow: <Arrow direction="right"/>,
    prevArrow: <Arrow direction="left" />,
  };

  return (
    <div className="relative w-full max-w-screen-xl mx-auto">
        {categories ? (
              <Slider {...settings}>
                    {categories.map((category, index) => (
                    <Link to={`/category/${category.slug}`}>
                      <div className="max-w-[150px] min-w-[150px] relative group mx-2">
                        <div
                          className={`gradient-overlay absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t ${gradientColors[index % gradientColors.length]} to-white-500`}
                        ></div>
                        <img
                          className="mx-auto w-full h-auto"
                          src={category.image}
                          alt={category.name}
                        />
                        <span className="absolute bottom-0 left-0 right-0 bg-transparent text-white text-center py-2 font-bold">
                          {category.name}
                        </span>
                        </div>
                    </Link>
                ))}
              </Slider>
        ): null}
    </div>     
  );
};

export default CategorySlider;