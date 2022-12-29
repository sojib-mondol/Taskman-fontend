import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const TaskCard = ({ task, refetch }) => {
    const { name, TaskDetails, _id, image } = task;

    const [deleting, setDeleting] = useState(false);

    // for delete
    const deleteTask = () => {
        fetch(`http://localhost:5000/tasks/${task._id}`, {
            method: "DELETE",
            headers: {
                //authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${task.name} deleted successfully`);
                }
            });
    };

    function handleDelete() {
        console.log("hello");
        confirmAlert({
            title: "Confirm to submit",
            message: "Are you sure to do this.",
            buttons: [
                {
                    label: "Yes",
                    onClick: () => deleteTask(),
                },
                {
                    label: "No",
                },
            ],
        });
    }

    return (
        <div>
            <div class="max-w-sm rounded overflow-hidden shadow-lg">
                <img class="w-full" src={image} alt="Sunset in the mountains" />
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{name}</div>
                    <p class="text-gray-700 text-base">{TaskDetails}</p>
                </div>
                <div class="px-6 py-4 grid gap-2 grid-flow-col">
                    <button className="bg-indigo-600 hover:bg-indigo-400 mt-2 text-white font-bold py-2 px-2 rounded">
                        UPDATE
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-indigo-600 hover:bg-indigo-400 mt-2 text-white font-bold py-2 px-2 rounded">
                        DELETE
                    </button>
                    <button className="bg-indigo-600 hover:bg-indigo-400 mt-2 text-white font-bold py-2 px-2 rounded">
                        COMPLETE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
