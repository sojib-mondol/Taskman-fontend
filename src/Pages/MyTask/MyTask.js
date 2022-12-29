import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";
import TaskCard from "./TaskCard";

const MyTask = () => {
    const navigate = useNavigate();

    const {
        data: tasks = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["tasks"],
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/tasks");
            const data = await res.json();
            return data;
        },
    });

    //console.log("deddedeede", deleting);

    // if (isLoading) {
    //     return <Loading></Loading>
    // }

    return (
        <div className="mt-28 mx-10">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {tasks.map((task) => (
                    <TaskCard key={task._id} task={task} refetch={refetch} />
                ))}
            </div>
        </div>
    );
};

export default MyTask;

