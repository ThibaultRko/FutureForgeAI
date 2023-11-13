import { Link } from "react-router-dom";

function Navbar() {
    return (
        <div className="navbar bg-solidColor2 justify-between">
            <Link to="/" className="btn btn-ghost normal-case text-xl text-background1">Home</Link>
            <div>
                <Link to="/cargus" className="btn btn-ghost normal-case text-xl text-background1">Cargus</Link>
                <Link to="/pentopixel" className="btn btn-ghost normal-case text-xl text-background1">PenToPixel</Link>
                <Link to="/about" className="btn btn-ghost normal-case text-xl text-background1">About</Link>
            </div>
        </div>
    );
}
export default Navbar