import { Link, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import CategoryPageSlider from "../components/CategoryPageSlider";
import axios from 'axios';
import { baseUrl } from "../shared";
import SaleSection from "../components/SaleSection";
import useFetchData from "../useFetchData";

export default function CategoryGame() {
    const slug = useParams().slug;
    const url = baseUrl + `api/category/${slug}/`;
    const {data : games, loading, error} = useFetchData(url);
    if(error) console.log(error )
    return (
        <>
            {loading ? (
                <p>Loading</p>
            ) 
            :
                <div className="mx-auto flex flex-col relative bg-[#0e141bcc]">
                    <CategoryPageSlider 
                        name={slug}
                        games={games}
                    />
                    <div className="mx-auto mb-5 w-[60%] mt-[90px] z-[99] max-w-[950px]">
                        <SaleSection 
                            games={games}
                        />
                    </div>
                </div>
            }
        </>
    )
}