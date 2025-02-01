import { useEffect } from "react";
import { useParams } from "react-router";
import GameUI from "../components/GameUI";


export default function AppGenre() {
    const {genre_slug} = useParams();
    const [ genreGames, setGenreGames] = ([]);

    useEffect(()=> {
        async function fetchGenreGames() {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}games?key=${import.meta.env.VITE_API_KEY}&genres=${genre_slug}`);
            const json = await response.json();
            setGenreGames(json.results);
        }
        fetchGenreGames();
    }, []);
    
    return(
        <div className="container">
            <h1>Genere {genre_slug}</h1>
            <small>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores suscipit repellendus dolores libero quidem ipsam molestiae? Quas laboriosam numquam adipisci ipsa consequuntur amet. Iusto tempora necessitatibus libero obcaecati! Aspernatur, dolorum!</small>
            <div className="games_wrapper">
                {genreGames.map((game) => (
                    <GameUI key={game.id} game={game}/>
                ))}
            </div>
            <div aria-busy="true" className="loading"></div>
        </div>
    )
}; 