import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import "../styles/navbar.css";

function Navbar() {

    return (

        <nav className="navbar-custom">

            <div className="search-box">

                <FaSearch />

                <input
                    type="text"
                    placeholder="Buscar..."
                />

            </div>

            <div className="navbar-right">

                <FaBell className="icon" />

                <div className="user-info">

                    <FaUserCircle className="user-icon" />

                    <div>

                        <strong>Duvian Yepes</strong>

                        <small>Administrador</small>

                    </div>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;