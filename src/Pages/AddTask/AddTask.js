import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const imageHostKey = process.env.REACT_APP_imgbb_key;
    
    const navigate = useNavigate();

    const handleAddTask = data => {
        //console.log('DDDDDDDDDDDDDDDDDDDDDDDDd', data);
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imgData => {
            if(imgData.success){
                console.log(imgData.data.url);
                const doctor = {
                    name: data.name, 
                    TaskDetails: data.text,
                    image: imgData.data.url
                }

                // save doctor information to the database
                fetch('http://localhost:5000/tasks', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json', 
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(doctor)
                })
                .then(res => res.json())
                .then(result =>{
                    console.log(result);
                    toast.success(`${data.name} is added successfully`);
                    navigate('/mytasks')
                })
            }
        })
    }

    return (
        <div className='mt-20 flex justify-center'>
             <div className=' p-10'>
            <h2 className="text-4xl">Add A Task</h2>
            <form onSubmit={handleSubmit(handleAddTask)}>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Task name</span></label>
                    <input type="text" {...register("name", {
                        required: "Name is Required"
                    })} className="shadow appearance-none border rounded input outline-0  w-full " />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                </div>
                <div className="form-control w-full ">
                    <label className="label"> <span className="label-text">Task Details</span></label>
                    <input type="text" {...register("text", {
                        required: true
                    })} className="input shadow outline-0 w-full h-16 rounded" />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label"> <span className="label-text">Photo</span></label>
                    <input type="file" {...register("image", {
                        required: "Photo is Required"
                    })} className="input input-bordered w-full max-w-xs" />
                    {errors.img && <p className='text-red-500'>{errors.img.message}</p>}
                </div>
                <input className='bg-indigo-600 hover:bg-indigo-400 mt-2 text-white font-bold py-2 px-4 rounded cursor-pointer' value="SUBMIT" type="submit" />
            </form>
        </div>
        </div>
    );
};

export default AddTask;