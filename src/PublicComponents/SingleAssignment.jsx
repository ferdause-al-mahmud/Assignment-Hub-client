/* eslint-disable react/prop-types */

const SingleAssignment = ({ assignment }) => {
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
            <div className="card lg:card-side border max-h-[400px] bg-base-100 shadow-xl">
                <figure className="w-1/2"><img src={thumbnail_url} alt="Album" /></figure>
                <div className="w-1/2 card-body space-y-4">
                    <h2 className="card-title">
                        {title}
                        <div className={`badge p-4 text-white ${badgeColorClass}`}>{difficulty_level}</div>
                    </h2>
                    <div><p>{description}</p></div>
                    <div className=" flex gap-6">
                        <p className="text-blue-600 font-bold">Marks: {marks}</p>
                        <p className="text-purple-700 font-bold">Due :{due_date}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleAssignment;

// to={`/assignment/${_id}`}