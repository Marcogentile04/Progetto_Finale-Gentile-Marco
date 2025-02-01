import { Outlet } from "react-router";
import NavbarUI from "../components/NavbarUI";
export default function AppLayout() {
    return (
        <div className="reset">
            <NavbarUI/>
            <Outlet />
        </div>
    );
}
























{/*             <nav className="container">
                <ul>
                    <li><strong>ReHackTor</strong></li>
                </ul>
                <div style={{
                    width: '60%',
                    display: 'flex',
                    alignItems: 'center',

                }}>
                    <input
                        type="search"
                        name="search"
                        aria-label="Search"
                        style={{
                            margin: '0',
                        }}
                    />
                </div>
                <ul>
                    <li><button className="button">Accedi</button></li>
                    <li><button className="button">Registrati</button></li>
                </ul>
            </nav>
            <main className="container mainset">
                <aside>
                    <h5>Genere</h5>
                    <details className="dropdown">
                        <summary>Clicca qui!</summary>
                        <ul>
                            <li><a href="#">Solid</a></li>
                            <li><a href="#">Liquid</a></li>
                            <li><a href="#">Gas</a></li>
                            <li><a href="#">Plasma</a></li>
                        </ul>
                    </details>
                    <h5>Piattaforma</h5>
                    <details className="dropdown">
                        <summary>Scopri</summary>
                        <ul>
                            <li><a href="#">Solid</a></li>
                            <li><a href="#">Liquid</a></li>
                            <li><a href="#">Gas</a></li>
                            <li><a href="#">Plasma</a></li>
                        </ul>
                    </details>
                </aside>
                <Outlet />
            </main> */}