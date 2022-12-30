import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const ComplitedTask = () => {
    const { user } = useContext(AuthContext);
    const {
        data: tasks = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["tasks", user?.email],
        queryFn: async () => {
            const res = await fetch(`https://task-man-server-rho.vercel.app/tasksComplete/${user?.email}`);
            const data = await res.json();
            return data;
        },
    });

    return (
        <div className="mt-28 mx-10">
            
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {tasks.map((task) => (
                    <ComplitedTask key={task._id} task={task} refetch={refetch} />
                ))}
            </div>
        </div>
    );
};

export default ComplitedTask;