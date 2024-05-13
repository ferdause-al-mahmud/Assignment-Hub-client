import axios from "axios";
import { useContext, useEffect, useState } from "react";
import SingleAssignment from "./SingleAssignment";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const Assignments = () => {
    const { user } = useContext(AuthContext);
    const [assignments, setAssignments] = useState([]);
    const [filter, setFilter] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://server-side-eight-topaz.vercel.app/allAssignments`, {
            params: { difficulty: filter } // Pass the difficulty as a query parameter
        })
            .then(res => {
                setAssignments(res.data);
                setLoading(false);

            })
            .catch(error => {
                console.error('Error fetching assignments:', error);
                setLoading(false);

            });
    }, [filter]);


    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        console.log(e.target.value)
    };

    const handleDelete = (id, creator_email) => {
        if (user.email !== creator_email) {
            return Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You are not owner of this assignment",
            });
        }
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            if (result.isConfirmed) {

                fetch(`https://server-side-eight-topaz.vercel.app/allAssignments/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)

                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your coffee has been deleted.",
                                icon: "success"
                            });
                            const remaining = assignments.filter(c => c._id !== id);
                            setAssignments(remaining);
                        }

                    })
            }
        });
        console.log("first")
    }

    return (
        <div>
            {loading ? ( // Display loading spinner if loading is true
                <div className="flex justify-center items-center h-[50vh]">
                    <div className="loading loading-spinner loading-lg"></div>
                </div>
            ) : <>
                <div className="grid grid-cols-1 gap-4 my-12 p-4 lg:p-0">

                    <div className="flex flex-col items-center justify-center mb-4">


                        <label className="text-2xl mb-2 font-bold">Filter by difficulty</label>
                        <select
                            id="difficulty"
                            value={filter}
                            onChange={handleFilterChange}
                            className="p-4 bg-[#32b6e6] rounded-md"
                        >
                            <option value="">All</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>
                    {
                        assignments.map(assignment => <SingleAssignment handleDelete={handleDelete} assignment={assignment} key={assignment._id}></SingleAssignment>)
                    }
                </div>
            </>
            }
        </div>

    );
};

export default Assignments;