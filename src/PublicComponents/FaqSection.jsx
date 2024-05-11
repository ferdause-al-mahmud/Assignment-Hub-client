
const FaqSection = () => {
    return (
        <div>
            <section className="bg-gray-100 mt-12 mb-12 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
                <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
                    <h2 className="text-2xl font-semibold sm:text-4xl md:text-6xl text-center">Frequently Asked Questions</h2>
                    <p className="mt-4 mb-8 text-gray-600 dark:text-gray-400 text-center text-xl">Get the answers of frequently asked question , your question maybe related to these.</p>
                    <div className="space-y-4 text-xl">
                        <details className="w-full border rounded-lg">
                            <summary className="px-4 py-6 focus:outline-none focus-visible:ring-indigo-600 focus-visible:dark:ring-indigo-400">How can I create assignments on the platform?</summary>
                            <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-gray-600 dark:text-gray-400">To create assignments, simply log in to your account and navigate to the {"'"}Create Assignment{"'"} section. Follow the intuitive prompts to specify the details, requirements, and deadline for your assignment. </p>
                        </details>
                        <details className="w-full border rounded-lg">
                            <summary className="px-4 py-6 focus:outline-none focus-visible:ring-indigo-600 focus-visible:dark:ring-indigo-400">Can I collaborate with other users on assignments?</summary>
                            <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-gray-600 dark:text-gray-400">Yes, collaboration is encouraged! You can invite fellow users to join your assignment as collaborators. Simply share the assignment link or invite them directly through their usernames or email addresses. </p>
                        </details>
                        <details className="w-full border rounded-lg">
                            <summary className="px-4 py-6 focus:outline-none focus-visible:ring-indigo-600 focus-visible:dark:ring-indigo-400">How are assignments graded or marked as completed?</summary>
                            <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-gray-600 dark:text-gray-400">Assignments can be marked as completed either by the creator or by designated evaluators. Once a user completes their assigned task, they can mark it as {"'"}completed.{"'"} Additionally, evaluators can provide feedback and assign grades based on predefined criteria. </p>
                        </details>
                        <details className="w-full border rounded-lg">
                            <summary className="px-4 py-6 focus:outline-none focus-visible:ring-indigo-600 focus-visible:dark:ring-indigo-400"> Is there a way to track the progress of my assignments?</summary>
                            <p className="px-4 py-6 pt-0 ml-4 -mt-4 text-gray-600 dark:text-gray-400">Absolutely! Our platform offers real-time progress tracking for each assignment. Users can monitor the status of their assignments, view submitted work, and track the overall completion percentage to stay on top of their academic goals. </p>
                        </details>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FaqSection;