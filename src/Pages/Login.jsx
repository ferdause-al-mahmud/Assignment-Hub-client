import { Link, useLocation, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { toast } from "react-toastify";
const Login = () => {
    const { logIn, loginWithGoogle, loginWithGithub } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = e => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const email = form.get("email");
        const password = form.get("password");
        logIn(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                navigate(location?.state ? location.state : "/");
                toast.success("Login success");
                // ...
            })
            .catch((error) => {
                toast.error(error.message, ",Login failed!");
                console.log(error.message);
            });
    }

    //google login

    const hanldeGoogle = () => {
        loginWithGoogle()
            .then((result) => {
                navigate(location?.state ? location.state : "/");
                toast.success("Login success");
                const user = result.user;
                console.log(user)

                // ...
            }).catch((error) => {
                const errorMessage = error.message;
                const email = error.customData.email;
                console.log(errorMessage, email)
                // ...
            });
    }

    //github login

    const hanldeGithub = () => {
        loginWithGithub()
            .then((result) => {

                const user = result.user;
                console.log(user)
                navigate(location?.state ? location.state : "/");
                toast.success("Login success");
                // ...
            }).catch((error) => {
                const errorMessage = error.message;
                const email = error.customData.email;
                console.log(errorMessage, email)
                // ...
            });
    }

    return (
        <div className=''>
            <div className="hero pb-16 bg-login-bg">
                <div className="hero-content md:w-[80%] flex-col">
                    <div className="text-center ">
                        <h1 className="text-2xl md:text-5xl font-bold">Login your account</h1>
                    </div>
                    <div className="card shrink-0 w-full max-w-xl shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
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
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn hover:scale-110   bg-gradient-to-r from-blue-400  to-[#bb18e8]">
                                    Login
                                </button>
                            </div>
                        </form>
                        <div>
                            <p className="text-center mb-3">Or sign up using</p>
                            <div className='flex gap-8 justify-center mb-3'>
                                <button onClick={hanldeGoogle}><FcGoogle className='text-3xl' /></button>
                                <button onClick={hanldeGithub}><BsGithub className='text-3xl' /></button>
                            </div>
                        </div>
                        <div className='mb-3'>
                            <p className="text-center">
                                Don{"'"}t have an account?{" "}

                            </p>
                            <p className="text-center">
                                <Link className="text-blue-500 underline" to="/register">
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default Login;