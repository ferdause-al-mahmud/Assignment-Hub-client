/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

const AssignmentCard = ({ assignment }) => {
    const { _id, title, difficulty_level, thumbnail_url, description, marks, due_date } = assignment;
    let badgeColorClass = '';

    // Determine badge color based on difficulty level
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
            badgeColorClass = 'bg-gray-400'; // Default color if difficulty level is not recognized
    }
    return (
        <div>
            <Link to={`/assignment/${_id}`} className="card border bg-base-100 shadow-xl h-full">
                <figure><img src={thumbnail_url} /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {title}
                        <div className={`badge p-4 text-white ${badgeColorClass}`}>{difficulty_level}</div>
                    </h2>
                    <p>{description}</p>
                    <div className=" flex gap-6">
                        <p className="text-blue-600 font-bold">Marks: {marks}</p>
                        <p className="text-purple-700 font-bold">Due :{due_date}</p>
                    </div>
                </div>
            </Link>
        </div >
    );
};

export default AssignmentCard;