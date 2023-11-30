import React,{useEffect,useState} from "react";
import Display from "./Display";
import Edit from "./Edit";

export default function Show(){
    const [prop,setProp] = useState([]);
    
    useEffect(()=>{
        let l = localStorage.length;
        let arr =[];
        for(let i=0;i<l;i++){
            let key = localStorage.key(i);
            let data = JSON.parse(localStorage.getItem(key));
            arr[i]={ name:key,
                description:data.description,
                duedate:data.duedate,
                priority:data.priority,
                completed:data.completed
            };
        }
        arr.sort((a,b)=>b.completed-a.completed);
        setProp(previousState=>{
            return arr;
        });
    },[]);

    function handleChange(e){
        let id = e.target.id.split("_");
        id=id[id.length-1];
        
        let obj = prop[id];
        prop.splice(id,1);
        let key = obj.name;
        
        if(obj.completed==1)
        {
            document.getElementById(`completed_${id}`).checked=false;
            obj.completed = 0;
        }
        else
        {
            document.getElementById(`completed_${id}`).checked=true;
            obj.completed = 1;
        }
        const ar = [...prop,obj];
        ar.sort((a,b)=>b.completed-a.completed);
        setProp(ar);
        localStorage.setItem(key,JSON.stringify(obj));
    }

    function deleteTask(e){
        e.stopPropagation();
        let id = e.target.id.split("_");
        id=id[id.length-1];
        let arr = prop;
        let key = prop[id].name;
        localStorage.removeItem(key);
        arr.splice(id,1);
        setProp([...arr]);
    }

    function showDisplay(e){
        document.getElementById("display_title").innerText = prop[e].name;
        document.getElementById("disp_desc").innerText = prop[e].description;
        document.getElementById("default-modal").style.display = "grid";
    }

    function editTask(e){
        e.stopPropagation();
        let id = e.target.id.split("_");
        id=id[id.length-1];
        let key = prop[id].name;
        document.getElementById("authentication-modal").style.display = "grid";
        document.getElementById("oldtname").innerText = key;
    }

    return(
        <main>
            <Display />
            <Edit />
            <table className="container mx-auto my-12 text-center">
                <thead>
                <tr className="bg-green-600 text-white ">
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Priority</th>
                    <th>Due Date</th>
                    <th>Done</th>
                    <th>Modify</th>
                </tr>
                </thead>
                <tbody>
                {prop.length===0?<tr><th>NO TASKS SCHEDULED YET</th></tr>:prop.map((x,i)=>{
                    return ( 
                        <tr key={i} id={i} className={i%2==0?"bg-gray-300 cursor-pointer ":"cursor-pointer "} onClick={()=>{showDisplay(i)}}>
                            <td className={x.completed==1?"line-through":""}>{i}</td>
                            <td className={x.completed==1?"line-through max-md:overflow-hidden":"max-md:overflow-hidden"}>{x.name}</td>
                            <td className={x.completed==1?"line-through":""}>{x.priority}</td>
                            <td className={x.completed==1?"line-through":""}>{x.duedate}</td>
                            <td><input type="checkbox" name={`completed_${i}`} id={`completed_${i}`} checked={x.completed==1?true:false} onChange={handleChange.bind(this)} onClick={(e)=>{e.stopPropagation()}} /></td>
                            <td className="flex justify-around"><button type="button" id={`edit_${i}`} className="bg-sky-600 hover:bg-sky-500 text-white py-2 px-3 rounded-md" onClick={editTask.bind(this)}>Edit</button><button type="button" id={`delete_${i}`} className="bg-red-600 hover:bg-red-500 text-white py-2 px-3 rounded-md" onClick={deleteTask.bind(this)}>Del</button></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </main>
    );
}