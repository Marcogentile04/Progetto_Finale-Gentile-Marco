import { useEffect } from "react";
import { useParams } from "react-router";
import GameUI from "../components/GameUI";


export default function AppPlatform() {
    const {platform_slug} = useParams();
    const [ platformGames, setPlatformGames] = ([]);

    useEffect(()=> {
        async function fetchPlatformGames() {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_BASE_API_URL}games?key=${import.meta.env.VITE_API_KEY}&genres=${genre_slug}`);
            const json = await response.json();
            setPlatformGames(json.results);
        }
        fetchPlatformGames();
    }, []);
    
    return(
        <div className="container">
            <h1>Genere {platform_slug}</h1>
            <small>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores suscipit repellendus dolores libero quidem ipsam molestiae? Quas laboriosam numquam adipisci ipsa consequuntur amet. Iusto tempora necessitatibus libero obcaecati! Aspernatur, dolorum!</small>
            <div className="games_wrapper">
                {platformGames.map((game) => (
                    <GameUI key={game.id} game={game}/>
                ))}
            </div>
            <div aria-busy="true" className="loading"></div>
        </div>
    )
}; 
