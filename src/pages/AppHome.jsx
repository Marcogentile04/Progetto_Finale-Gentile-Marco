import { useState, useEffect } from "react";
import { useAsyncList } from 'react-stately'
import { useInView } from 'react-intersection-observer';
import GameUI from "../components/GameUI";
/* import SidebarFiltersUI from "../components/SidebarFiltersUI" */
import ModalSearchUI from "../components/ModalSearchUI";

export default function AppHome() {
    const [focus, setFocus] = useState(false);

    let games = useAsyncList({
        async load({ signal, cursor }) {
            let res = await fetch(cursor || `${import.meta.env.VITE_BASE_API_URL}games?key=${import.meta.env.VITE_API_KEY}&dates=2023-01-01,2025-01-01&page=1`, {
                signal,
            }
            );
            let json = await res.json();
            return {
                items: json.results,
                cursor: json.next,
            };
        }
    });

    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (games.items.length && inView && !games.isLoading) {
            games.loadMore();
        }
    }, [inView, games]);

    const handleFocus = () => {
        setFocus(true);
    };


    const handleClickOverlay = () => {
        setFocus(false);
    };

    return (
        <main className="container">
            {<ModalSearchUI focus={focus} handleClickOverlay={handleClickOverlay} />}
            {/* <SidebarFiltersUI /> */}
            <div className="game_container">
                <h1> Trend e novità sui principali videogiochi</h1>
                <label htmlFor="search">
                    Cerca qui il tuo prossimo gioco!
                </label>
                <input
                    type="search"
                    name="search"
                    aria-label="search"
                    onFocus={handleFocus} />
                <div className="games_wrapper">
                    {games.items.map((game) => (
                        <GameUI key={game.id} game={game} />
                    ))}
                </div>
                <div ref={ref} aria-busy="true" className="Loading"></div>
            </div>

        </main>
    );
}









/*         <div className="gamesWrapper">
            <h1>Esplora tutta la vasta gamma dei giochi del momento</h1>
            <div className="gameList">
                {games.map(game => (
                    <article className="game" key={game.id}>
                        <img src={game.background_image} />
                        {game.name}
                    </article>
                ))}
            </div>
            <div aria-busy="true" className="loading"></div>
        </div> */