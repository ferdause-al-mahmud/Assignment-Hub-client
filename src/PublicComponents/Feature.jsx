import axios from "axios";
import { useEffect, useState } from "react";
import AssignmentCard from "./AssignmentCard";

const Feature = () => {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://server-side-eight-topaz.vercel.app/assignments')
            .then(res => {
                setAssignments(res.data)
                setLoading(false)
            })

    }, [])


    return (
        <div>
            {loading ? ( // Display loading spinner if loading is true
                <div className="flex justify-center items-center h-[50vh]">
                    <div className="loading loading-spinner loading-lg"></div>
                </div>
            ) : <>
                <div className="mt-12">
                    <h1 className="text-2xl font-semibold sm:text-4xl md:text-6xl text-center mb-4">Our Featured Assignments</h1>
                    <p className=" mb-8 text-xl text-center" >Elevate your group study sessions with our platform{"'"}s intuitive assignment creation, progress tracking, adjustable difficulty levels, and rich multimedia support.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {
                            assignments.slice(0, 6).map(assignment => <AssignmentCard assignment={assignment} key={assignment._id}></AssignmentCard>)
                        }
                    </div>

                </div>
            </>}
        </div>

    );
};

export default Feature;