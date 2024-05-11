import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div>
            <div className="hero min-h-[80vh] bg-banner-bg" >
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content md:px-16">
                    <div className="flex  flex-col-reverse md:flex-row gap-10">
                        <div className="md:w-[60%] text-left font-bold space-y-5">
                            <h1 className="md:text-3xl text-white">Online Group-Study</h1>
                            <p className="md:text-6xl text-black"><span className="text-blue-500">Share</span> & Learn New Things</p>
                            <p className="text-white font-medium ">Unlock your academic potential with our comprehensive online study platform, where students thrive through interactive assignments and creative projects.</p>
                            <button className="btn bg-[#0d5ff9] border-none  md:!mt-[70px]"><Link to='assignments'>All Assignments</Link></button>
                        </div>
                        <div className="md:flex justify-end">
                            <img src="https://i.ibb.co/n1JBrW8/2149285397.jpg" className="h-[500px] rounded-lg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;