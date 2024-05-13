import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";

const AttemptedAssigments = () => {
    const { user } = useContext(AuthContext);
    const [assignments, setAssignments] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:4444/attemptedAssignments/${user.email}`)
            .then(res => {
                setAssignments(res.data);
            })
            .catch(error => {
                console.error('Error fetching assignment:', error);
            });
    }, [user.email])

    return (
        <div className="my-12 font-semibold">
            <h1 className="text-2xl md:text-5xl  text-center">My Attempted Assigments {assignments.length}</h1>
            <div className="overflow-x-auto mt-6  shadow-lg border ">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th></th>
                            <th className="text-xl">Title</th>
                            <th className="text-xl">Status</th>
                            <th className="text-xl">Total marks</th>
                            <th className="text-xl">Obtained marks</th>
                            <th className="text-xl">Feedback</th>
                        </tr>
                    </thead>
                    <tbody className="text-[14px]">
                        {
                            assignments.map((assignment, idx) => <tr key={assignment._id}>
                                <th>{idx + 1}</th>
                                <td>{assignment.title}</td>
                                <td className={`${assignment.status === 'pending' ? 'text-yellow-500' : 'text-green-500'}`}>{assignment.status}</td>
                                <td>{assignment.marks}</td>
                                <td>{assignment?.obtained_mark ? assignment?.obtained_mark : 'null'}</td>
                                <td>{assignment?.feedback ? assignment?.feedback : 'null'}</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttemptedAssigments;