import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    const bgColor = () => {
        switch (location.pathname) {
            case "/":
                return "bg-borderAndSeparator3";
            case "/cargus":
                return "bg-textColor2";
            case "/pentopixel":
                return "bg-green-500";
            case "/drawguesser":
                return "bg-yellow-500";
            case "/about":
                return "bg-borderAndSeparator3";
            default:
                return "bg-solidColor2";
        }
    }

    const buttonColor = (path) => {
        return location.pathname === path ? "bg-startCargus" : "bg-borderAndSeparator1";
    }

    return (
        <div className={`fixed z-50 navbar ${bgColor()} justify-between`}>
            <Link to="/" className={`btn btn-ghost hover:${buttonColor("/")} normal-case text-xl text-background1`}>HOME</Link>
            <div>
                <Link to="/cargus" className={`btn btn-ghost hover:${buttonColor("/cargus")} normal-case text-xl text-background1`}>Cargus</Link>
                <Link to="/pentopixel" className={`btn btn-ghost hover:${buttonColor("/pentopixel")} normal-case text-xl text-background1`}>PenToPixel</Link>
                <Link to="/drawguesser" className={`btn btn-ghost hover:${buttonColor("/drawguesser")} normal-case text-xl text-background1`}>DrawGuesser</Link>
                <Link to="/about" className={`btn btn-ghost hover:${buttonColor("/about")} normal-case text-xl text-background1`}>About</Link>
            </div>
        </div>
    );
}
export default Navbar;
