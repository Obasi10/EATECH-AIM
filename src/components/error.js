import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Variants from "../components/variants";

const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
}
const modal1 = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: {
      margin: "auto",
      y: "100px", 
      opacity: 1,
      transition: { delay: 0.5 }
    },
}
  
  
const Error =({dim, modal, setm, setErrorr, error,lock})=>{
    const {w, h}=dim

    const handleSubmit=()=>{
      setm({...modal, error: false})
      setErrorr('')
    }

    useEffect(()=>setm({...modal, Ready: false}), [])
    return (
        <AnimatePresence>
          {(modal.error) && (
            <motion.div className="backdroppe"
              variants={backdrop}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div className="modale1 beginner col-lg-5 col-10" 
                variants={modal1}
                initial="hidden"
                animate="visible"
                style={w<=700?{marginTop:"30%", height: "fit-content"}:{marginTop:"15%", height: "fit-content"}}
              >
                <p className={w<=700?"beginner text-center fw-bolder text-danger":"fs-5 fw-bolder text-danger"}>{error}</p>
                <motion.button variants={Variants} whileHover="hover" className="btn bgpupp textpele p-2"
                    onClick={handleSubmit}
                >Ok</motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    )
}

export default Error