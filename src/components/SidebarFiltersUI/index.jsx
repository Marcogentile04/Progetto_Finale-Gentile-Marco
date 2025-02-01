import { useLoaderData, Link } from "react-router";
import style from "../SidebarFiltersUI/styles.module.css";

export default function SidebarFilters() {
    const { genres, platforms } = useLoaderData();
    return (
        <aside>
            <h5>Genere</h5>
            <details className="dropdown">
                <summary>Clicca qui!</summary>
                <ul className={style.visible_filter}>
                    {genres.map((genre)=>(
                        <li key={genre.id}>
                            <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
                        </li>
                    ))}
                </ul>
            </details>
            <h5>Piattaforma</h5>
            <details className="dropdown">
                <summary>Scopri</summary>
                <ul className={style.visible_filter}>
                    {platforms.map((platform)=>(
                        <li key={platform.id}>
                            <Link to={`/platforms/${platform.slug}`}>{platform.name}</Link>
                        </li>
                    ))}
                </ul>
            </details>
        </aside>
    );
}