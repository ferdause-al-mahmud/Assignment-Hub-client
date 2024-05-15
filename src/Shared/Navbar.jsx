import { Link, NavLink } from "react-router-dom";
import './Navbar.css';
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const links = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/assignments'>Assignments</NavLink></li>
        {
            user ? <>
                <li><NavLink to='/create'>Create Assignments</NavLink></li>
                <li><NavLink to='/pending'>Pending Assignments</NavLink></li></> : <>
                <li><NavLink to='/login'>Login</NavLink></li>
                <li><NavLink to='/register'>Register</NavLink></li>

            </>
        }

    </>

    const handleLogOut = () => {
        logOut()
            .then(() => {
                toast.success("Log out successfully")
            }).catch((error) => {
                console.log(error)
            });
    }
    return (
        <div>
            <div className="navbar max-w-7xl mx-auto">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost pr-2 md:pr-4 lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {
                                links
                            }
                        </ul>
                    </div>
                    <Link to='/' className="!pl-0 font-bold md:text-2xl">STUDY BUDDY</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-2 md:text-[16px]">
                        {
                            links
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    <label className="cursor-pointer mr-2 grid place-items-center">
                        <input type="checkbox" value="dracula" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                        <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                        <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    </label>
                    {
                        user ? <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className=" w-10 rounded-full">
                                    {
                                        user.photoURL ?
                                            (<div className="rounded-full h-[3rem] w-[3rem] mr-2  flex items-center justify-center bg-blue-500"> <img className="w-10 rounded-full" src={user.photoURL} /></div>)
                                            :
                                            (<div className="rounded-full h-[3rem] w-[3rem] flex items-center justify-center bg-blue-500" data-tip={user.displayName}><FaRegUser /></div>)
                                    }

                                </div>
                            </div>
                            <ul tabIndex={0} className="mt-3 z-[1] p-2 text-pink-600 font-medium shadow menu menu-sm dropdown-content bg-gray-200 rounded-box w-52">
                                <li><Link to='/attemptedAssignments' >Attempted Assignments</Link></li>
                                <li><a onClick={handleLogOut}>Logout</a></li>
                            </ul>
                        </div> : ''
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;