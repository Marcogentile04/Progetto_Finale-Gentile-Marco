import { useState, useEffect } from "react";
import AutoCompleteCardUI from "../AutoCompleteCardUI"

export default function ModalSearchUI({focus, handleClickOverlay}) {

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [games, setGames] = useState([]);


    useEffect(() => {
        const timeoutAPI = setTimeout(() => {
            async function fetchSearchedGames() {
                if (!search) return;
                setGames([]);
                setLoading(true)
                const response = await fetch(
                    `${import.meta.env.VITE_BASE_API_URL}games?key=${
                        import.meta.env.VITE_API_KEY
                    }&page=1&search=${search}`
                );
                const json = await response.json();
                setGames(json.results);
                setLoading(false)
            }
            fetchSearchedGames();
        }, 500);
        return () => {
            clearTimeout(timeoutAPI);
        }
    }, [search]);




    return (
        <dialog open={focus}>
            <article>
                <header>
                    <button
                        aria-label="Close"
                        rel="prev"
                        onClick={handleClickOverlay}
                    ></button>
                    <h3>Cerca qui il tuo gioco</h3>
                </header>
                <form >
                    <input
                        type="search"
                        name="search"
                        value={search}
                        placeholder="Search"
                        aria-label="Search"
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </form>
                <div className="autoSuggestedWrapper">
                    {loading && <article aria-busy="true"></article>}
                    {games && games.map((game) => (
                        <AutoCompleteCardUI key={game.id} game={game} />
                    ))}
                </div>

                <footer>
                    <button>Cerca!</button>
                </footer>
            </article>
        </dialog>
    )
}