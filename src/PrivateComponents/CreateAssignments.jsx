import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { MdKeyboardArrowDown } from "react-icons/md";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";

const CreateAssignments = () => {
    const [startDate, setStartDate] = useState(new Date());
    const { user } = useContext(AuthContext)
    const handleCreate = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const marks = form.marks.value;
        const description = form.description.value;
        const thumbnail_url = form.thumbnail_url.value;
        const difficulty_level = form.difficulty.value;
        const creator_email = user.email;
        const due_date = startDate.toLocaleDateString('en-US');
        const createdAssignment = {
            title: title,
            marks: marks,
            description: description,
            thumbnail_url: thumbnail_url,
            difficulty_level: difficulty_level,
            creator_email: creator_email,
            due_date: due_date
        }
        fetch('http://localhost:4444/allAssignments', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(createdAssignment)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                Swal.fire({
                    title: "Success!",
                    text: "Added!",
                    icon: "success"
                });
            })
        console.log(createdAssignment)
    }
    return (
        <div>
            <div className=' border p-6 md:p-20 rounded-lg my-12'>

                <h1 className='text-3xl md:text-6xl mb-8 text-center font-semibold'>Create Assignment</h1>
                <form onSubmit={handleCreate} className="">
                    <div className='md:flex gap-4'>
                        <label className="form-control md:w-1/2">
                            <div className="label">
                                <span className="label-text font-semibold !text-xl">Title</span>
                            </div>
                            <input type="text" name='title' required placeholder="Type here" className="input w-full border-base-300" />

                        </label>
                        <label className="form-control md:w-1/2">
                            <div className="label">
                                <span className="label-text  font-semibold !text-xl">Marks</span>
                            </div>
                            <input type="number" name='marks' required placeholder="Type here" className="  input  w-full border-base-300" />
                        </label>
                    </div>
                    <div className='md:flex gap-4'>
                        <label className="form-control md:w-1/2">
                            <div className="label">
                                <span className="label-text  font-semibold !text-xl">Difficulty</span>
                            </div>
                            <div className="relative">
                                <select name="difficulty" className="input w-full border-base-300 pr-10">
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
                            <input type="text" name='thumbnail_url' required placeholder="Type here" className="input w-full border-base-300" />
                        </label>
                    </div>
                    <br />
                    <div className='md:flex gap-4'>
                        <label className="form-control md:w-1/2">
                            <div className="label">
                                <span className="label-text font-semibold !text-xl">Due date</span>
                            </div>
                            <DatePicker className="w-full input border border-base-300" selected={startDate} onChange={(date) => setStartDate(date)} />
                        </label>
                    </div>
                    <br />
                    <div className='md:flex gap-2 mb-4'>
                        <label className="form-control w-full">
                            <div className="label">
                                <span className="label-text font-semibold !text-xl">Description
                                </span>
                            </div>
                            <textarea className="border bg-base-100 border-base-300 resize-none p-4 w-full rounded-lg " required placeholder="Type here" name="description" rows="4" ></textarea>
                        </label>
                    </div>
                    <div className='w-full'>
                        <button type="submit" className='btn btn-block bg-[#ff6128] font-semibold text-xl'>Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAssignments;