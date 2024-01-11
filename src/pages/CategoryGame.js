import { Link, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import CategoryPageSlider from "../components/CategoryPageSlider";
import axios from 'axios';
import { baseUrl } from "../shared";
import SaleSection from "../components/SaleSection";

export default function CategoryGame() {
    const slug = useParams().slug;
    const [games, setGames] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const url = baseUrl + `api/category/${slug}/`
        axios.get(url).then((response) => {
            setGames(response.data)
            setLoading(false)
        })
    }, [])
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
                    <div className="mx-auto mb-5 w-[60%] mt-[100px]">
                        <SaleSection 
                            games={games}
                        />
                    </div>
                </div>
            }
        </>
    )
}