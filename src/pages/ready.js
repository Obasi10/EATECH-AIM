import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }
  const svgVariants = {
    hidden: { rotate: [180,0,-180,0] },
    visible: { 
      rotate: 0,
      transition: { duration : 3, repeat: Infinity}
    },
  }
  
  const pathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      transition: { 
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }
    }
  }; 
  
const Ready =({dim, modal})=>{
    const {w, h}=dim
    const height=h*0.35 +""
    const width=w*0.3+""
    const des=["black","hsl(151, 95%, 24%)","#B7BBBD","#49616E","rgb(34, 34, 212)"]
    var progressStyle, loading
    var barwidth=0

    const animate=()=>{
        barwidth++;
        progressStyle=`${barwidth}%`;
        setTimeout(()=>{
            loading=`${barwidth}% Completed`;
        }, 5000)
    }

    setTimeout(()=>{
        let intervalID=setInterval(()=>{
            if (barwidth === 100){
                clearInterval(intervalID);
            } else {
                animate();
            }
        }, 100)
    },2000)

    return (
        <><AnimatePresence>
          { modal.Ready && (
            <motion.div className="backdroppe"
              variants={backdrop}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              <motion.div className="modale1 col-lg-4 col-7 bg-trans" 
                variants={modal}
                style={w<=700? {marginTop:"30%", height: "fit-content"}:{marginTop:"20%", height: "fit-content"}}
              > 
              <div className="col-md-4 col-3 d-md-block">
              {/* <!-- tooltip --> */}
                <motion.svg height={height} width={width} variants={svgVariants} initial="hidden" animate="visible" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 291.764 291.764">
                  <g>
                    <motion.path variants={pathVariants} className="motion14" d="M36.47,0h218.824c10.066,0,18.235,8.169,18.235,18.235v255.294c0,10.066-8.169,18.235-18.235,18.235
                      H36.47c-10.066,0-18.235-8.169-18.235-18.235V18.235C18.234,8.16,26.404,0,36.47,0z"/>
                    <motion.path variants={pathVariants} className="motion15" d="M45.587,27.353h200.588v63.824H45.587V27.353z"/>
                    <motion.path variants={pathVariants} style={{fill:des[2]}} d="M191.47,45.588v27.353h36.471V45.588H191.47z M218.823,63.824h-18.235v-9.118h18.235V63.824z"/>
                    <motion.path variants={pathVariants} className="motion17" d="M45.587,154.991h36.471V118.52H45.587V154.991z M100.293,154.991h36.471V118.52h-36.471V154.991z
                      M154.999,118.529V155h36.471v-36.471H154.999z M45.587,209.697h36.471v-36.461H45.587V209.697z M100.293,209.697h36.471v-36.461
                      h-36.471V209.697z M154.999,209.697h36.471v-36.461h-36.471V209.697z M45.587,264.403h36.471v-36.471H45.587V264.403z
                      M100.293,264.403h36.471v-36.471h-36.471V264.403z M154.999,264.403h36.471v-36.471h-36.471V264.403z"/>
                    <motion.path variants={pathVariants} className="motion16" d="M209.705,118.529V155h36.471v-36.471H209.705z M209.705,264.403h36.471v-91.167h-36.471V264.403z"/>
                  </g>
                </motion.svg>
                <div>
                  <div className="textpep fs2 text-center my-2">Loading...</div>
                  <div className="col-12 border-2 bgpele py-2">
                    <div style={{width: progressStyle}}></div>
                  </div>

                </div>

              </div>

              </motion.div>
            </motion.div>
          )}
      </AnimatePresence></>
    )
}

export default Ready