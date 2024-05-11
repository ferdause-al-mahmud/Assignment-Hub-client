import axios from "axios";
import { useEffect, useState } from "react";
import SingleAssignment from "./SingleAssignment";

const Assignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:4444/assignments`, {
            params: { difficulty: filter } // Pass the difficulty as a query parameter
        })
            .then(res => {
                setAssignments(res.data);
            })
            .catch(error => {
                console.error('Error fetching assignments:', error);
            });
    }, [filter]);


    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        console.log(e.target.value)
    };
    return (
        <div className="grid grid-cols-1 gap-4 my-12">
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
                assignments.map(assignment => <SingleAssignment assignment={assignment} key={assignment._id}></SingleAssignment>)
            }
        </div>
    );
};

export default Assignments;