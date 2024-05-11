/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AssignmentDetails = () => {
    const { id } = useParams();
    const [assignment, setAssignment] = useState();
    useEffect(() => {
        axios.get(`http://localhost:4444/assignments/${id}`)
            .then(res => {
                setAssignment(res.data)
            })
    }, [])
    console.log(assignment)
    return (
        <div>
            <p>Details of{id}</p>
        </div>
    );
};

export default AssignmentDetails;