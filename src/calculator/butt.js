import React, { useEffect, useState } from "react";
import {motion} from "framer-motion";
import Variants from "../components/variants";

const Butt =(props)=>{
    var m=Number(props.mkey)
    var m1=props.n1
    const [lel, setlel]=useState({})
     
    return(
        <motion.button
            onClick={()=>{
                props.onClick(m)
            }}
            className={m1===m? "disbg mx-1 bgpupp col-3":"col-3 mx-1"}
        >
            {props.children}
        </motion.button>
    )
}

export default Butt