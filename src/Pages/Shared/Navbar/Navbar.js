import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';
import Button from './Button';

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    // const handleLogOut = () => {
    //     logOut()
    //         .then(() => { })
    //         .catch(err => console.log(err));
    // }
    function handleLogOut() {
        console.log("Button clicked")
        logOut()
            .then(() => {})
            .catch(err => console.log(err));
    }



    let Links =[
        {name:"ADD TASK",link:"/"},
        {name:"MY TASKS",link:"/mytasks"},
        {name:"COMPLITED TASKS",link:"/complitedtasks"},
      ];
      
      let [open,setOpen]=useState(false);

    return (
        <>
            <div className=' w-full fixed top-0 left-0'>
                <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
                    <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
                    text-gray-800'>
                        <span className='text-3xl text-indigo-600 mr-1 pt-2'>
                        <ion-icon name="logo-ionic"></ion-icon>
                        </span>
                        Task Man
                    </div>
                    
                    <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
                        <ion-icon name={open ? 'close':'menu'}></ion-icon>
                    </div>

                    <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
                        {
                        Links.map((link)=>(
                            <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
                            {/* <a href={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a> */}
                            <Link to={link.link}>{link.name}</Link>
                            </li>
                        ))
                        }
                        {user?.uid ?
                            <>
                                <li><button className='mx-4 btn btn-ghost text-black border-none  rounded' onClick={handleLogOut}>Sign out</button></li>
                            </>
                            : <li><Link className='mx-4 btn btn-ghost text-black border-none rounded' to="/login">Login</Link></li>
                        }
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Navbar;