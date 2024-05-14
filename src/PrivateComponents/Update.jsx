import axios from "axios";
import { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const Update = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const { id } = useParams();
    console.log(id)
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`https://server-side-eight-topaz.vercel.app/allAssignments/${id}`, { withCredentials: true })
            .then(res => {
                setAssignment(res.data)
                setLoading(false)
                if (res.data && res.data.due_date) {
                    setStartDate(new Date(res.data.due_date));
                }
            })
    }, [id]);
    console.log(assignment)

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const marks = form.marks.value;
        const description = form.description.value;
        const thumbnail_url = form.thumbnail_url.value;
        const difficulty_level = form.difficulty.value;
        const due_date = startDate.toLocaleDateString('en-US');
        const updatedAssignment = {
            title: title,
            marks: marks,
            description: description,
            thumbnail_url: thumbnail_url,
            difficulty_level: difficulty_level,
            due_date: due_date
        }

        fetch(`https://server-side-eight-topaz.vercel.app/allAssignments/${id}`, {

            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedAssignment),


        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    Swal.fire({
                        title: "Success!",
                        text: "Item added!",
                        icon: "success"
                    });
                }
                navigate("/assignments");
            })



        console.log(updatedAssignment);
    }
    const { title, difficulty_level, thumbnail_url, due_date, description, marks, creator_email } = assignment || {};

    console.log(due_date)
    return (
        <div>
            {
                loading ? ( // Display loading spinner if loading is true
                    <div className="flex justify-center items-center h-[50vh]">
                        <div className="loading loading-spinner loading-lg"></div>
                    </div>
                ) :
                    <>
                        <div className=' border p-6 md:p-20 rounded-lg my-12'>

                            <h1 className='text-3xl md:text-6xl mb-8 text-center font-semibold'>Update Assignment</h1>
                            <form onSubmit={handleUpdate} className="">
                                <div className='md:flex gap-4'>
                                    <label className="form-control md:w-1/2">
                                        <div className="label">
                                            <span className="label-text font-semibold !text-xl">Title</span>
                                        </div>
                                        <input type="text" name='title' defaultValue={title || ""} required placeholder="Type here" className="input w-full border-base-300" />

                                    </label>
                                    <label className="form-control md:w-1/2">
                                        <div className="label">
                                            <span className="label-text  font-semibold !text-xl">Marks</span>
                                        </div>
                                        <input type="number" name='marks' defaultValue={marks || ""} required placeholder="Type here" className="  input  w-full border-base-300" />
                                    </label>
                                </div>
                                <div className='md:flex gap-4'>
                                    <label className="form-control md:w-1/2">
                                        <div className="label">
                                            <span className="label-text  font-semibold !text-xl">Difficulty</span>
                                        </div>
                                        <div className="relative">
                                            <select name="difficulty" defaultValue={difficulty_level || ""} className="input w-full border-base-300 pr-10">
                                                <option value="easy">Easy</option>
                                                <option value="medium">Medium</option>
                                                <option value="hard">Hard</option>
                                            </select>
                                            <MdKeyboardArrowDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                                        </div>
                                    </label>
                                    <label className="form-control md:w-1/2">
                                        <div className="label">
                                            <span className="label-text font-semibold !text-xl">Thumbnail Url</span>
                                        </div>
                                        <input type="text" name='thumbnail_url' defaultValue={thumbnail_url || ""} required placeholder="Type here" className="input w-full border-base-300" />
                                    </label>
                                </div>
                                <br />
                                <div className='md:flex gap-4'>
                                    <label className="form-control md:w-1/2">
                                        <div className="label">
                                            <span className="label-text font-semibold !text-xl">Due date</span>
                                        </div>
                                        <ReactDatePicker
                                            className="w-full input border border-base-300"
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                        />
                                    </label>
                                    <label className="form-control md:w-1/2">
                                        <div className="label">
                                            <span className="label-text font-semibold !text-xl">Creator email</span>
                                        </div>
                                        <input type="text" name='email' readOnly value={creator_email} required className="input w-full border-base-300" />
                                    </label>
                                </div>
                                <br />
                                <div className='md:flex gap-2 mb-4'>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text font-semibold !text-xl">Description
                                            </span>
                                        </div>
                                        <textarea className="border bg-base-100 border-base-300 resize-none p-4 w-full rounded-lg " required placeholder="Type here" defaultValue={description || ""} name="description" rows="4" ></textarea>
                                    </label>
                                </div>
                                <div className='w-full'>
                                    <button type="submit" className='btn btn-block bg-[#ff6128] font-semibold text-xl'>Update</button>
                                </div>
                            </form>
                        </div>
                    </>
            }

        </div>
    );
};

export default Update;