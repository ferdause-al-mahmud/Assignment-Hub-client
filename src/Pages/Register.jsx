import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { auth } from "../Firebase/firebase.config";

const Register = () => {
    const { createUser, logOut } = useContext(AuthContext);
    const [eye, setEye] = useState(false);
    const navigate = useNavigate();
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])/;


    const handleEye = () => {
        setEye(!eye)
    }
    const handleRegister = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const password = form.get("password");
        const name = form.get("name");
        const url = form.get("photourl");
        if (!passwordRegex.test(password)) {
            return (toast.error("Password must have at least an uppercase and an lowercase letter"));
        }
        if (password.length < 6) {
            return (toast.error("Password Length must be at least 6 character"));
        }
        createUser(email, password)
            .then((result) => {
                console.log(result.user)
                updateProfile(auth.currentUser, { displayName: name, photoURL: url })
                    .then(() => {
                        toast.success("Registered successfully");

                    })
                navigate("/login");
                logOut()
                    .then(() => {
                        console.log("Log out successfully")
                    }).catch((error) => {
                        console.log(error)
                    });
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage)
                // ..
            });
    }
    return (
        <div>
            <div className="hero pb-16 bg-login-bg">
                <div className="hero-content md:w-[80%] flex-col">
                    <div className="text-center ">
                        <h1 className="text-3xl md:text-5xl font-bold">Register</h1>
                    </div>
                    <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
                        <form onSubmit={handleRegister} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Photo URL"
                                    name="photourl"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control ">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className="relative">
                                    <input

                                        type={eye ? "text" : "password"}
                                        placeholder="password"
                                        name="password"
                                        className="input w-full input-bordered"
                                        required
                                    />
                                    <div onClick={handleEye} className="absolute top-3 text-xl right-2">{eye ? <IoEyeOff /> : <IoEye />}</div>
                                </div>

                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn hover:scale-110   bg-gradient-to-r from-blue-400  to-[#bb18e8]">
                                    Register
                                </button>
                            </div>
                        </form>
                        <p className="text-center mb-3">
                            Already have an account?{" "}
                            <Link className="text-blue-500 underline" to="/login">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;