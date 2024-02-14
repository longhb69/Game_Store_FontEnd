import { Link, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import CategoryPageSlider from "../components/CategoryPageSlider";
import axios from 'axios';
import { baseUrl } from "../shared";
import SaleSection from "../components/SaleSection";
import useFetchData from "../useFetchData";

export default function CategoryGame() {
    const slug = useParams().slug;
    const [games, setGames] = useState();
    const [loading, setLoading] = useState(true);
    const [next, setNext] = useState();
    const [pre, setPre] = useState();
    const url = baseUrl + `api/category/${slug}/`;
    useEffect(() => {
        axios.get(url).then(response => {
            setGames(response.data.results);
            setNext(response.data.next);
            setPre(response.data.pre);
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    function showMore() {
        axios.get(next).then(response => {
            setGames(prevComments => [...prevComments, ...response.data.results]);
            setNext(response.data.next);
            setPre(response.data.pre);
        })
    }
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
                        count={games.length}
                    />
                    <div className="mx-auto mb-5 w-[60%] mt-[90px] z-[99] max-w-[950px]">
                        <SaleSection 
                            games={games}
                            showMore={showMore}
                            next={next?.length > 0}
                        />
                    </div>
                </div>
            }
        </>
    )
}