import { useParams } from "react-router-dom"
export default function CategoryGame() {
    const slug = useParams().slug;
    return (
            <p>{slug} Game</p>
    )
}