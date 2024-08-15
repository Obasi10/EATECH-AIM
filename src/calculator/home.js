import { AnimatePresence, motion } from "framer-motion"
import { e } from "mathjs"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import * as math from "mathjs"

const Home = ({ modal, setm, setp, setdim, dim, setErrorr, D, d,
              t, ts, setd, setD, sett, setts, wrap, setwrap, Ldefect, Ti, Td,  
              setTi, setTd, setLdefect, Type, metal, tlife, setType, setmetal, settlife,
              method, Class, setClass, setmethod, Pd, setPd, tlayer, settlayer, shape, setshape,
              contact, setContact, pModulus, setpModulus, grade, setgrade,
              spec, setspec, width, setwidth, Po, setPo, email, setemail, project, setproject, 
              projectID, setprojectID, rType, setrType, OD, setOD, nps, setnps, sch, setsch, ys, setys,
              as, setas
}) => {
  const w=document.documentElement.clientWidth
  const handleSubmit=()=>{
    setm({...modal, Ready: true})
    if (pModulus && ys){
      setpModulus(math.round((pModulus/145)*100)/100)
      setys(ys/145)
    }
    setLdefect(Ldefect*25.4)
    setd(d*25.4)
    setD(D*25.4)
    setts(ts*25.4)
    sett(t*25.4)
    setPd(Pd/10)
  }

  useEffect(()=>{
    if(typeof window?.MathJax !== "undefined"){
        window.MathJax.typeset()
    }
    setwrap(1)
  },[])
  
  const Array=[
    "Ignore substrate, limited strain",
    "Limited by allowable strain in laminate",
    "Thermowrap",
    "SampleWrap"
  ]
  const changer=()=>{
    if (method==2){
      setmethod(3)
    }  else setmethod(2)
  }

  const changer1=()=>{
    if (wrap==2){
      setwrap(1)
    }  else setwrap(2)
  }
  useEffect(()=>{
    if (wrap==2){
      setas(0.000012)
      setys(161.66*145)
      setpModulus(30000000)
      setTi(20)
      setPd(50)
      setTd(60)
      setLdefect(15)
      setts(math.round((12.7/25.4)*0.8*100)/100)
      settlife(10)
      sett(math.round((12.7/25.4)*100)/100)
      setD(math.round((406.4/25.4)*100)/100)
      setLdefect(math.round((200/25.4)*100)/100)
      setd(5)
    } else {
      setas(0.000006)
      setD(10.75)
      setys(30000)
      setpModulus(30000000)
      setTi(20)
      setPd(345)
      setTd(82)
      setLdefect(15)
      setd(33.76)
      setts(0.675)
      settlife(10)
      sett(1.125)
    }
  },[wrap])

  return (
    <>
    <section>
      <div className="container-lg mt-1">
      <div className="text-center">
        <h2 className="textpop fw-bold fs-1">PipeWrap Calculator</h2>
        <p className="beginner text-center lead text-muted">Pipe input parameters ...</p>
      </div>
      <div className="row justify-content-center mb-1">
        <div className="col-lg-7 col-md-9 col-11"> 
          <div
            className={w<700?"beginner justify-content-center":"fs-5 justify-content-center"}
            >
            <label htmlFor="email" className="form-label textpop textpap">Contact Name:</label>
            <div className="input-group">
              <input type="text" id="name" onChange={(e)=>setContact(e.target.value)} value={contact}
              className="form-control bgliter" />
              
              <span className="input-group-text bgbtn">
                <span className="tt" data-bs-placement="bottom" title="Name of contact">
                  <i className="bi bi-question-circle text-muted"></i>
                </span>
              </span>
            </div>
            <label htmlFor="email" className="form-label textpop textpap">Contact Email:</label>
            <div className="input-group">
              <input type="text" id="name" onChange={(e)=>setemail(e.target.value)} value={email}
              className="form-control bgliter" placeholder="e.g. dean234@gmail.com" />  
              <span className="input-group-text bgbtn">
                <span className="tt" data-bs-placement="bottom" title="Working email">
                  <i className="bi bi-question-circle text-muted"></i>
                </span>
              </span>
            </div>
            <div className="my-2 form-floating">
              <textarea className="form-control bgliter" id="query" onChange={(e)=>setproject(e.target.value)} value={project}
                style={{height: "80px"}} placeholder="Brief description on the project..."></textarea>
              <label htmlFor="query">Brief description on the project...</label>
            </div>
            <label className="form-label textpop textpap">Project ID:</label>
            <div className="input-group">
              <input type="text" id="project description" onChange={(e)=>setprojectID(e.target.value)} value={projectID}
              className="form-control bgliter"/>
            </div>
            <div className="row d-flex">
              <div className="col-6">
                <label className="form-label textpop textpap">Type:</label>
                <div className="input-group">
                  <input type="text" onChange={(e)=>setType(e.target.value)} value={Type}
                  className="form-control bgliter"/>
                </div>
                <label className="form-label textpop textpap">Repair Type:</label>
                <div className="input-group">
                  <input type="text" onChange={(e)=>setrType(e.target.value)} value={"Structural Reinforcement"}
                  className="form-control bgliter" />
                </div>
              </div>
              <div className="col-6">
                  <label className="form-label textpop textpap">Repair System:</label>
                  <div className="input-group">
                    <div className="form-control bgliter">{wrap==2?Array[3]:Array[2]}</div>
                    <button className="btn btn-secondary bgpupp textpele" onClick={changer1}>
                      Change
                  </button>
                  </div>
                  <label className="form-label textpop textpap">Intended Service Life:</label>
                  <div className="input-group">
                    <input type="number" id="project description" onChange={(e)=>settlife(e.target.value)} value={tlife}
                    className="form-control bgliter" />
                  <span className="input-group-text bgbtn textpele">
                      years
                  </span>
                  </div>
              </div>
            </div>
            <div className="row d-flex align-items-center">
              <div className="col-6">
                  <label className="form-label textpop textpap">Design Methodology:</label>
                <div className="input-group">
                  <div className="form-control bgliter">{method==3?Array[0]:Array[1]}</div>
                  <button className="btn btn-secondary bgpupp textpele" onClick={changer}>
                      Change
                  </button>
                </div>
              </div>
              <div className="col-6">
                  <label className="form-label textpop textpap">Design Standard:</label>
                  <div className="input-group">
                    <input type="text" id="project description" value="ISO 24817"
                    className="form-control bgliter"/>
                  </div>
              </div>
            </div>
            <AnimatePresence>
            <p className="text-center fw-bold my-2">Substrate Material</p>
              <motion.div>
              <div className="row col-12 d-flex align-items-center">
                <div className="col-6">
                  <label className="form-label textpop textpap">Pipe Material:</label>
                  <div className="input-group">
                    <input type="text" id="project description" onChange={(e)=>setmetal(e.target.value)} value={metal}
                    className="form-control bgliter"/>
                  </div>
                  </div>
                  <div className="col-6">
                  <label className="form-label textpop textpap">Thermal Expansivity:</label>
                  <div className="input-group">
                    <input type="number" id="" onChange={(e)=>setas(e.target.value)} value={as}
                    className="form-control bgliter"/>
                  </div>
                  </div>
                  </div>
                <div className="row d-flex align-items-center">
                    <div className="col-6">
                      <label className="form-label textpop textpap">Pipe Grade SMYS:</label>
                      <div className="input-group">
                        <input type="number" id="project description" onChange={(e)=>setys(e.target.value)} value={ys}
                        className="form-control bgliter" />
                      <span className="input-group-text bgbtn textpele">
                          psi
                      </span>
                      </div>
                    </div>
                    <div className="col-6">
                      <label className="form-label textpop textpap">Pipe Tensile Modulus:</label>
                      <div className="input-group">
                        <input type="number" id="project description" onChange={(e)=>setpModulus(e.target.value)} value={pModulus}
                        className="form-control bgliter" />
                      <span className="input-group-text bgbtn textpele">
                            psi
                      </span>
                      </div>
                    </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <p className="text-center fw-bold my-2">Pipe Information</p>
            <AnimatePresence>
              <motion.div>
              <div className="row d-flex align-items-center">
              <div className="col-6">
                <label className="form-label textpop textpap">Actual Pipe Diameter:</label>
                <div className="input-group">
                  <input type="number" id="project description" onChange={(e)=>setD(e.target.value)} value={D}
                  className="form-control bgliter" />
                <span className="input-group-text bgbtn textpele">
                    inches
                </span>
                </div>
                <label className="form-label textpop textpap">Original Wall Thickness:</label>
                <div className="input-group">
                  <input type="number" id="project description" onChange={(e)=>setprojectID(e.target.value)} value={t}
                  className="form-control bgliter" />
                  <span className="input-group-text bgbtn textpele">
                      inches
                  </span>
                </div>
              </div>
              <div className="col-6">
                <label className="form-label textpop textpap">Component Shape:</label>
                  <div className="input-group">
                    <input type="text" id="project description" value={shape}
                    className="form-control bgliter" />
                  </div>
                  <label className="form-label textpop textpap">Product in Pipe:</label>
                  <div className="input-group">
                    <input type="text" id="project description" value={"Hydrocarbons"}
                    className="form-control bgliter" />
                  </div>

              </div>
            </div>
              </motion.div>
              <motion.div>

              </motion.div>
            </AnimatePresence>
            <p className="text-center fw-bold my-2">Information on Defect</p>
            <div className="row d-flex align-items-center">
              <div className="col-6">
                <label className="form-label textpop textpap">Defect Length:</label>
                <div className="input-group">
                  <input type="number" id="project description" onChange={(e)=>setLdefect(e.target.value)} value={Ldefect}
                  className="form-control bgliter" />
                <span className="input-group-text bgbtn textpele">
                    inches
                </span>
                </div>
                <label className="form-label textpop textpap">Defect Width:</label>
                <div className="input-group">
                  <input type="number" id="project description" onChange={(e)=>setd(e.target.value)} value={d}
                  className="form-control bgliter" />
                  <span className="input-group-text bgbtn textpele">
                      inches
                  </span>
                </div>
              </div>
              <div className="col-6">
                <label className="form-label textpop textpap">Defect Depth:</label>
                  <div className="input-group">
                    <input type="number" id="project description" onChange={(e)=>setts(e.target.value)} value={ts}
                    className="form-control bgliter" />
                    <span className="input-group-text bgbtn textpele">
                        inches
                    </span>
                  </div>
                  <label className="form-label textpop textpap">Defect Type:</label>
                  <div className="input-group">
                    <input type="text" id="project description" value={"External Corrosion"}
                    className="form-control bgliter" />
                  </div>
              </div>
            </div>
            <p className="text-center fw-bold my-2">Design conditions</p>
            <div className="row d-flex align-items-center">
              <div className="col-6">
                <label className="form-label textpop textpap">Operating Pressure:</label>
                <div className="input-group">
                  <input type="number" id="project description" onChange={(e)=>setPo(e.target.value)} value={Po}
                  className="form-control bgliter" />
                <span className="input-group-text bgbtn textpele">
                    bar
                </span>
                </div>
                <label className="form-label textpop textpap">System Design Pressure:</label>
                <div className="input-group">
                  <input type="number" id="project description" onChange={(e)=>setPd(e.target.value)} value={Pd}
                  className="form-control bgliter" />
                  <span className="input-group-text bgbtn textpele">
                      bar
                  </span>
                </div>
              </div>
              <div className="col-6">
                <label className="form-label textpop textpap">Installation Temperature:</label>
                <div className="input-group">
                  <input type="number" id="project description" onChange={(e)=>setTi(e.target.value)} value={Ti}
                  className="form-control bgliter" />
                <span className="input-group-text bgbtn textpele">
                    \(^oC\)
                </span>
                </div>
                <label className="form-label textpop textpap">Design Temperature:</label>
                  <div className="input-group">
                    <input type="number" id="project description" onChange={(e)=>setTd(e.target.value)} value={Td}
                    className="form-control bgliter" />
                    <span className="input-group-text bgbtn textpele">
                        \(^oC\)
                    </span>
                  </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Link to={"/solution3"}><button className="btn btn-secondary textpele bgpupp" onClick={handleSubmit}>Submit</button></Link>
            </div>
          </div>
        </div>
      </div>
      </div>
  </section>
    </>
  )
}

export default Home