import { Link } from "react-router-dom";

function Navbar() {
    return (
        <>
            <div className="navbar flex items-center justify-between bg-mountbattenPink px-5 py-5 font-sans shadow-xl">
                <div className="navbar-start">
                    <Link
                        to={"/"}
                        className="logo cursor-pointer text-xl font-bold text-columbiaBlue"
                    >
                        Learning-Do
                    </Link>
                </div>

                <div className="navbar-end flex items-center gap-5 p-1">
                    <Link
                        to={"/"}
                        className="cursor-pointer text-columbiaBlue brightness-110"
                    >
                        Home
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Navbar;
