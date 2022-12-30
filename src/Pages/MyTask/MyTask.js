import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { AuthContext } from "../../contexts/AuthProvider";
import ConfirmationModal from "./ConfirmationModal";
import TaskCard from "./TaskCard";

const MyTask = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const {
        data: tasks = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["tasks", user?.email],
        queryFn: async () => {
            const res = await fetch(`https://task-man-server-rho.vercel.app/tasks/${user?.email}`);
            const data = await res.json();
            return data;
        },
    });

    //console.log("deddedeede", deleting);

    if (isLoading) {
        return <Loading></Loading>
    }

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

