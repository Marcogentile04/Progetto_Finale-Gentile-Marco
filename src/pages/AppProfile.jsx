import { useContext, useEffect, useState } from "react";
import useProfile from "../hooks/useProfile";
import supabase from "../supabase/client";
import { getAvatarUrl } from "../utils/getAvatarUrl";
import SessionContext from "../context/SessionContext";


export default function AppProfile() {
    const session = useContext(SessionContext);
    const { loading, first_name, last_name, username, avatar_url} = useProfile();
    const [ fav, setFav] = useState([]);

    async function readFav() {
        const { user } = session;
        let { data:favourites, error } = await supabase
            .from('favourites')
            .select(`*`)
            .eq('profile_id', session.user.id)
        if (error) {
            console.log(error);
        }
        setFav(favourites);
    }

    useEffect(() => { readFav() }, [])

    if (loading) {
        return <progress></progress>
    }


    return (
        <div className="container">
            <article>
                <header>
                    <h1>Benvenuto {first_name}</h1>
                </header>
                <div className="user_card">
                    <section className="dati_user">
                        <img style={{
                            width: '300px',
                            height: '300px'
                        }} src={avatar_url && getAvatarUrl(avatar_url)} alt={'image profile'} />
                        <p>{first_name}</p>
                        <p>{last_name}</p>
                        <p>{username}</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia et nostrum cupiditate sunt aut. Perspiciatis cumque omnis harum doloribus beatae voluptates, corporis in tempora, architecto ullam, reprehenderit voluptate quas dolor.</p>
                    </section>
                    <section className="info_user">
                        <details>
                            <summary role="button" className="secondary">Giochi favoriti</summary>
                            {fav.length ? fav.map(game => (
                                <li key={game.game_id}>{game.game_name}</li>
                            )): <p>Non hai giochi favoriti</p>}
                        </details>
                        <details>
                            <summary role="button" className="contrast">Contrast</summary>
                            <p>...</p>
                        </details>
                    </section>
                </div>
            </article>
        </div>
    )
};