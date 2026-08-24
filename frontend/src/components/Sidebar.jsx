import {
    FaChartLine,
    FaBox,
    FaUsers,
    FaShoppingCart,
    FaFileAlt,
    FaCog
} from "react-icons/fa";

import "../styles/sidebar.css";
import { Link } from "react-router-dom";

function Sidebar(){

    return(
        <aside className="sidebar">

            <div className="logo">
                <h3>Sales Analytics</h3>
            </div>

            <ul>
                <li>
                    <Link to="/" className="menu-link">
                       <FaChartLine />
                       <span> Dashboard </span>
                    </Link>
                </li>


                <li>
                    <Link to="/productos" className="menu-link">
                      <FaBox />
                      <span> Productos </span>
                    </Link>
                </li>
                

                <li>
                    <Link to="/clientes" className="menu-link">
                       <FaUsers />
                       <span>Clientes</span>
                    </Link>
               </li>

                <li>

                   <Link to="/ventas" className="menu-link">
                      <FaShoppingCart />
                      <span>Ventas</span>

                    </Link>
                </li>

                <li>
                    <Link to="/reportes" className="menu-link">
                      <FaFileAlt/>
                      <span> Reportes </span>
                    </Link>
                </li>

                <li>
                    <FaCog/>
                    <span> Configuraciónes </span>
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;