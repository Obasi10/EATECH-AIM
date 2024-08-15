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
  
  
const Submit =({dim, modal, setm})=>{
    const {w, h}=dim
    useEffect(()=>setm({...modal, Ready: false}), [])
    return (
        <AnimatePresence>
          { (modal.submit || modal.alert || modal.D || modal.logSub || modal.signed || modal.logged
            || modal.delete || modal.saved
          ) && (
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
                style={w<=700? {marginTop:"30%", height: "fit-content"}:{marginTop:"15%", height: "fit-content"}}
              >
                {modal.alert && (<p className="text-danger">{`x must be within the range of -1 < x < 1.`}</p>)}
                {modal.submit && (<p className="text-dark">It has been submitted successfully.</p>)}
                {modal.logged && (<p className="text-dark">Log in successful.</p>)}
                {modal.signed && (<p className="text-dark">Sign up successful.</p>)}
                {modal.logSub && (<p className="text-danger">Please, you will have to log in before you can get in touch with us, this is so we can keep track of your query.</p>)}
                {modal.D && (<p className="text-dark">It has been downloaded successfully. Please check your download folder.</p>)}
                {modal.delete && (<p className="text-dark">Deleted successfully.</p>)}
                {modal.saved && (<p className="text-dark">Saved successfully.</p>)}
                {!modal.logSub && (<motion.button variants={Variants} whileHover="hover" className="btn bgpupp textpele p-2"
                    onClick={()=>setm({...modal, logpage:false, alert:false, submit:false, D: false, logged: false, signed: false, saved: false, delete: false})}
                >Ok</motion.button>)}
                {(modal.logSub && (<motion.button variants={Variants} whileHover="hover" className="btn bgpupp textpele p-2"
                    onClick={()=>setm({...modal, logSub: false, logpage: true})}
                >Ok</motion.button>))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    )
}

export default Submit