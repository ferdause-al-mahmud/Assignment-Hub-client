import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
const MarkingPage = () => {
    const { id } = useParams();
    const [assignmentData, setAssignmentData] = useState(null);
    const [obtainedMark, setObtainedMark] = useState('');
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://server-side-eight-topaz.vercel.app/pendingAssignments/${id}`, {
            withCredentials: true
        })
            .then(res => {
                setAssignmentData(res.data);
                setLoading(false)
            })
            .catch(error => {
                console.error('Error fetching assignment:', error);
                setLoading
            });
    }, [id]);
    const handleSubmit = (e) => {

        e.preventDefault();
        const submittedMarking = {
            status: "completed",
            obtained_mark: obtainedMark,
            feedback: feedback
        }
        console.log(submittedMarking)
        fetch(`https://server-side-eight-topaz.vercel.app/pendingAssignments/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(submittedMarking)

        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        title: "Success!",
                        text: "Marked Assignment!",
                        icon: "success"
                    });
                }
            })
    }
    return (
        <div>
            {loading ? ( // Display loading spinner if loading is true
                <div className="flex justify-center items-center h-[60vh]">
                    <div className="loading loading-spinner loading-lg"></div>
                </div>
            ) : <>
                <div className="md:w-1/2 mx-auto text-center my-12 px-4">
                    {assignmentData ? (
                        <>
                            <div className="card bg-base-100 shadow-xl border">
                                <form action="" onSubmit={handleSubmit}>

                                    <div className="flex items-center justify-center text-3xl font-semibold"><h2>{assignmentData.title}</h2></div>
                                    <div className="card-body !text-left">
                                        <div>
                                            <p><span className="text-xl font-semibold">Note: </span></p><br />
                                            <p className="break-words">{assignmentData.note}</p>
                                        </div>
                                        <div>
                                            <p className="text-xl font-semibold">PDF/Docs Link:</p>
                                            <br />
                                            <a target="_blank" className="hover:underline break-all hover:text-blue-400" href={assignmentData.file}>{assignmentData.file}</a>
                                        </div>
                                        <br />
                                        <div className="flex flex-col">
                                            <label htmlFor="marks" className="text-xl font-medium">Marks:</label>
                                            <input type="number" onChange={(e) => setObtainedMark(e.target.value)} required id="marks" placeholder="Enter marks" className="border border-gray-400  rounded-md p-4 mx-1" />
                                        </div>
                                        <div className="flex flex-col">
                                            <label htmlFor="feedback" className="text-xl font-medium">Feedback:</label>
                                            <textarea name="feedback" onChange={(e) => setFeedback(e.target.value)} rows={5} required placeholder="Enter feedback" className="border border-gray-400 resize-none rounded-md p-4 mx-1"></textarea>
                                        </div>
                                        <br />
                                        <button type="submit" className="btn btn-primary mt-2">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </>
                    ) : (
                        ''
                    )}
                </div>
            </>}
        </div>

    );
};

export default MarkingPage;