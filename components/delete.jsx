import { useRef } from "react";
import React, {useEffect,useState} from React
// import { use } from "react";


const abc=function (){
    const [counter,setcounter]=useState(0);
    const ref=useRef(0);

    useEffect(()=>{
        console.log(counter)
    })

    return (
        <div>
            <h1>Hey there</h1>
            <button onClick={()=>setcounter(counter+1)}>PressMe</button>

        </div>
    )
}