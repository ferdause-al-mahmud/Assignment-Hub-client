import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PendingAssignment = () => {
    const [assignments, setAssignments] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:4444/pendingAssignments`, {
            params: { status: 'pending' }
        })
            .then(res => {
                setAssignments(res.data);
            })
            .catch(error => {
                console.error('Error fetching assignment:', error);
            });
    }, [])
    return (
        <div className="my-12 font-semibold">
            <h1 className="text-2xl md:text-5xl  text-center">Pending Assigments {assignments.length}</h1>
            <div className="overflow-x-auto mt-6  shadow-lg border ">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th></th>
                            <th className="text-xl">Title</th>
                            <th className="text-xl">Email</th>
                            <th className="text-xl">Total marks</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="text-[14px]">
                        {
                            assignments.map((assignment, idx) => <tr key={assignment._id}>
                                <th>{idx + 1}</th>
                                <td>{assignment.title}</td>
                                <td >{assignment.submitter_email}</td>
                                <td>{assignment.marks}</td>
                                <td><Link to={`/markingAssignment/${assignment._id}`} className="btn bg-[#32b6e6] text-black">Give mark</Link ></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendingAssignment;