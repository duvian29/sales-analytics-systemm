import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Layout({ children }) {
    return(
        <div className="d-flex">

            <Sidebar/>

            <div className="flex-grow-1"
            style={{marginLeft:"260px"}}>

                <Navbar/>

                <main className="container-fluid py-4"
                style={{
                    paddingLeft:"20px",
                    paddingRight:"20px"
                }}>

                    {children}

                </main>
           
            </div>
        </div>
    );
}

export default Layout;