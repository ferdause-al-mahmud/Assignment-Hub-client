/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const AssignmentDetails = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [assignment, setAssignment] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false) // State for managing modal open/close
    const [submissionFile, setSubmissionFile] = useState(null);
    const [submissionNote, setSubmissionNote] = useState('');
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get(`https://server-side-eight-topaz.vercel.app/allAssignments/${id}`, { withCredentials: true })
            .then(res => {
                setAssignment(res.data);
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching assignment:', error);
                setLoading(false);
            });
    }, [id]);


    const { title, difficulty_level, thumbnail_url, description, marks, due_date, creator_email } = assignment || {};
    let badgeColorClass = '';

    switch (difficulty_level) {
        case 'hard':
            badgeColorClass = 'bg-red-600';
            break;
        case 'medium':
            badgeColorClass = 'bg-orange-400';
            break;
        case 'easy':
            badgeColorClass = 'bg-green-400';
            break;
        default:
            badgeColorClass = 'bg-gray-400';
    }


    const handleSubmission = () => {
        console.log("Submitting assignment with file:", submissionFile, "and note:", submissionNote);
        setIsModalOpen(false);

        const submittedAssignment = {
            status: "pending",
            submitter_email: user.email,
            file: submissionFile,
            title: title,
            marks: marks,
            description: description,
            thumbnail_url: thumbnail_url,
            difficulty_level: difficulty_level,
            creator_email: creator_email,
            due_date: due_date,
            note: submissionNote
        }
        fetch(`https://server-side-eight-topaz.vercel.app/attemptedAssignments`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(submittedAssignment)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                Swal.fire({
                    title: "Success!",
                    text: "Submitted!",
                    icon: "success"
                });

            })
    };



    return (
        <div>
            {
                loading ? ( // Display loading spinner if loading is true
                    <div className="flex justify-center items-center h-[60vh]">
                        <div className="loading loading-spinner loading-lg"></div>
                    </div>
                ) :
                    <>

                        <div className="p-4 md:p-0">
                            <div className="flex items-center border border-blue-500 my-12 shadow-lg">
                                <div className="p-4 ">
                                    <div className="flex flex-col md:flex-row  gap-8">
                                        <div className="md:w-1/2 space-y-2">
                                            <img src={thumbnail_url} alt="" className="block max-h-[500px] object-cover object-center w-full rounded-md" />
                                        </div>
                                        <div className="md:w-1/2 space-y-6">
                                            <a rel="noopener noreferrer" href="#" className="block">
                                                <h3 className="text-xl md:text-3xl font-semibold text-indigo-600">{title}</h3>

                                            </a>
                                            <p className=" md:text-xl font-medium">{description}</p>
                                            <div className=" flex gap-6 md:gap-12">
                                                <p className="text-blue-600 text-xl font-bold">Marks: {marks}</p>
                                                <p className="text-purple-700 text-xl font-bold">Due :{due_date}</p>

                                            </div>
                                            <div className={`badge font-semibold md:text-xl p-4 md:p-5  ${badgeColorClass}`}>Difficulty: {difficulty_level}</div>
                                            <div>
                                                <p className="text-xl">Created By : <span className="font-bold">{creator_email}</span></p>
                                            </div>
                                            <div>
                                                <div onClick={() => setIsModalOpen(true)} className="btn btn-secondary md:text-xl">Take assignment</div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {isModalOpen && (
                                <div className="fixed top-0 left-0 w-full h-full flex items-center z-10 justify-center bg-gray-800 bg-opacity-75">
                                    <form onSubmit={handleSubmission} className="bg-base-100 p-8 rounded-lg">
                                        <h2 className="text-2xl font-semibold mb-4">Assignment Submission</h2>
                                        <div className="mb-4">
                                            <label htmlFor="submissionFile" className="block mb-2">PDF/doc File Link:</label>
                                            <input required type="text" id="submissionFile" onChange={(e) => setSubmissionFile(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="submissionNote" className="block mb-2">Quick Note:</label>
                                            <textarea required id="submissionNote" value={submissionNote} onChange={(e) => setSubmissionNote(e.target.value)} rows="4" className="w-full px-4 py-2  resize-none border border-gray-300 rounded-md"></textarea>
                                        </div>
                                        <div className="text-right">
                                            <button type="submit" className="btn btn-primary" >Submit</button>
                                            <button className="btn btn-secondary ml-2" onClick={() => setIsModalOpen(false)}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>

                    </>}
        </div>
    );
};

export default AssignmentDetails;