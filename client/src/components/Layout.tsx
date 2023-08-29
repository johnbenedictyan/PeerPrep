import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer";

const Layout = () => {
    return (
        <div className="min-h-full">
            <div className="py-0">
                <header>
                    <Navbar />
                </header>
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default Layout;