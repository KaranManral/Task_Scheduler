import React from "react";

export default function Add(){
    function formSubmit(e){
        e.preventDefault();
        let tname = e.target[0].value;
        let tdesc = e.target[1].value;
        let duedate = e.target[2].value;
        let prior = e.target[3].value;
        if(tname===null||tname===undefined||tname==="")
            alert("Task Name is Required!");
        else{
            let obj = {
                name:tname,
                description:tdesc,
                duedate:duedate,
                priority:prior==0?"High":prior==1?"Medium":"Low",
                completed:0
            };
            if(!localStorage.getItem(tname)){
                localStorage.setItem(tname,JSON.stringify(obj));
                alert("Task Added Successfully");
            }
            else
                alert("TaskName Already Exists!");
        }
    }
    
    return (
        <main>
            <form action="#" id="add_form" method="post" className="max-w-lg mx-auto my-12 border border-gray-500" onSubmit={formSubmit.bind(this)}>
                <h1 className="p-6 bg-gray-500 font-light text-6xl text-white text-center mb-12">Add Task</h1>
                <div className="content p-12">
                <label htmlFor="tname">Task Name</label>
                <input type="text" name="tname" id="tname" className="ml-16 border-2 align-middle p-2" required /><br /><br />
                <label htmlFor="tdesc">Task Description</label>
                <textarea name="tdesc" id="tdesc" className="ml-6 text-ellipsis p-2 border-2 align-middle" ></textarea><br /><br />
                <label htmlFor="dueDate">Due Date</label>
                <input type="date" name="duedate" id="duedate" className="ml-20 p-2 cursor-pointer border-2" /><br /><br />
                <label htmlFor="priority">Priority</label>
                <select name="priority" id="priority" className="ml-24 p-2 cursor-pointer border-2">
                    <option value="0">High</option>
                    <option value="1">Medium</option>
                    <option value="2">Low</option>
                </select><br /><br /><br />
                <div className="buttons flex flex-row justify-around align-middle">
                <button type="submit" className="py-2 px-6 bg-green-600 text-white rounded-md hover:bg-green-500">Add</button>
                <button type="reset" className="py-2 px-6 border rounded-md hover:bg-gray-100">Reset</button>
                </div>
                </div>
            </form>
        </main>
    );
}