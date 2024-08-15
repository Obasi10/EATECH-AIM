import React, {useEffect, useState, useRef} from "react";
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';
import pipe from "./Parameters/Pipe-Wall-Thickness.csv";
import steel from "./Parameters/Strength-of-steel.csv";
import {convertCSVToArray} from "convert-csv-to-array"
import converter from "convert-csv-to-array"
import me from "./Parameters/me.csv"


// pages & components
import Solution3 from './solution/solution3';
import Navbar from './components/Navbar';
import Ready from './pages/ready';
import Home from "./calculator/home";
import Copyright from "./components/copyright";
import Submit from "./pages/submit";
import Error from "./components/error";
import { set } from "date-fns";



const App =()=>{

  function csvToArr(stringVal, splitter) {
    const [keys, ...rest] = stringVal
      .trim()
      .split("\n")
      .map((item) => item.split(splitter));
  
    const formedArr = rest.map((item) => {
      const object = {};
      keys.forEach((key, index) => (object[key] = item.at(index)));
      return object;
    });
    return formedArr;
  }

  
  const w=document.documentElement.clientWidth;
  const h=document.documentElement.clientHeight;
  
  // const pipeProp = convertCSVToArray(pipe, {
  //   type: 'array',
  //   separator: ','
  // })
  const pipo=csvToArr(me,",")
  // const piper = convertCSVToArray(pipo,{type:"array"})
  // const steelProp = convertCSVToArray(steel, {
  //   type: 'array',
  //   separator: ','
  // })
  console.log(pipo)
  

  const [dim, setdim]=useState({w,h})
  const [page, setp]=useState(0)
  const [tab, settab]=useState(false)
  const [error, setErrorr]= useState('')
  const [modal, setm]=useState({logpage: false, logOutpage: false, News: false, Ready: false, D: false, S:false, av: false, submit: false, alert: false, logSub: false, review: false, error: false,
                              logged: false, signed: false, offcanvas: false, saved: false, delete: false})
  const location =useLocation()
  const [D, setD]=useState(10.75)
  const [t, sett]=useState(1.125)
  const [d, setd]=useState(33.76)
  const [Ldefect, setLdefect]=useState("15.0")
  const [Ti, setTi]=useState(20)
  const [Td, setTd]=useState(82)
  const [Type, setType]=useState("Type A Defect")
  const [metal, setmetal]=useState("Carbon Steel")
  const [wrap, setwrap]=useState(1)
  const [tlife, settlife]=useState(10)
  const [method, setmethod]=useState(3)
  const [Class, setClass]=useState(3)
  const [ts, setts]=useState(0.675)
  const [Pd, setPd]=useState(345)
  const [as, setas]=useState(0.000006)
  const [shape, setshape]=useState('Straight pipe')
  const [contact, setContact]=useState("")
  const [ys, setys]= useState(30000)
  const [pModulus, setpModulus]=useState(30000000)
  const [grade, setgrade]=useState("")
  const [spec, setspec]=useState("")
  const [width, setwidth]=useState(33.76)
  const [Po, setPo] =useState("")
  const [email, setemail]=useState("")
  const [project, setproject] = useState("")
  const [projectID, setprojectID] = useState("")
  const [rType, setrType]= useState("Structural Reinforcement")
  const [nps, setnps]=useState("")
  const [sch, setsch]=useState("")
  const [OD, setOD]=useState("")

  useEffect(()=>{
    function handle(){
      setdim({
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
      })
    }
    window.addEventListener('resize', handle)
    
    return _=>{
      window.removeEventListener('resize', handle)
    }
  });
  useEffect(()=>{
    if (error){
      setm({...modal, error: true})
    }
  },[error])
  useEffect(()=>{
    if(typeof window?.MathJax !== "undefined"){
        window.MathJax.typeset()
    }
  },[])

  return(
    <>
      <Error modal= {modal} dim={dim} setm={setm} setErrorr={setErrorr} error={error}/>
      <Ready modal={modal} setm={setm} dim={dim}/>
      <Navbar page={page} dim={dim} setm={setm} modal={modal} tab={tab} settab={settab}/>
        <AnimatePresence onExitComplete={()=>{
          setm({...modal, News: false, D: false, S:false, av:false, submit: false, alert: false, logSub: false, review:false, error:false})
        }
        }>
          <Routes location={location} key={location.key}>
            <Route 
              path="/"
              element={<Home setp={setp} dim={dim} modal={modal} setm={setm} setdim={setdim} setErrorr={setErrorr}
              D={D} setD={setD} t={t} sett={sett} d={d} setd={setd} Ldefect={Ldefect} setLdefect={setLdefect}
              Ti={Ti} setTi={setTi} Td={Td} setTd={setTd} Type={Type} metal={metal} wrap={wrap} setType={setType} setmetal={setmetal} setwrap={setwrap}
              tlife={tlife} method={method} Class={Class} settlife={settlife} setmethod={setmethod} setClass={setClass} ts={ts} setts={setts}
              Pd={Pd} setPd={setPd} as={as} setas={setas} shape={shape} setshape={setshape} contact={contact} setContact={setContact} 
               pModulus={pModulus} setpModulus={setpModulus} grade={grade} setgrade={setgrade} setspec={setspec} 
              spec={spec} width={width} setwidth={setwidth} Po={Po} setPo={setPo} email={email} setemail={setemail} project={project} setproject={setproject} 
              projectID={projectID} setprojectID={setprojectID} rtype={rType} setrType={setrType} nps={nps} setnps={setnps} sch={sch} setsch={setsch}
              OD={OD} setOD={setOD} ys={ys} setys={setys}
              />}
            />
            <Route
              path="/solution3"
              element={
                <Solution3 dim={dim} setm={setm} setp={setp} modal={modal} setdim={setdim} setErrorr={setErrorr}
                D={D} setD={setD} t={t} sett={sett} d={d} setd={setd} Ldefect={Ldefect} setLdefect={setLdefect}
                Ti={Ti} setTi={setTi} Td={Td} setTd={setTd} Type={Type} metal={metal} wrap={wrap} setType={setType} setmetal={setmetal} setwrap={setwrap}
                tlife={tlife} method={method} Class={Class} settlife={settlife} setmethod={setmethod} setClass={setClass} ts={ts} setts={setts}
                Pd={Pd} setPd={setPd} as={as} setas={setas} shape={shape} setshape={setshape} contact={contact} setContact={setContact} 
                ys={ys} setys={setys} pModulus={pModulus} setpModulus={setpModulus} grade={grade} setgrade={setgrade} setspec={setspec} 
                spec={spec} width={width} setwidth={setwidth} Po={Po} setPo={setPo} email={email} setemail={setemail} project={project} setproject={setproject} 
                projectID={projectID} setprojectID={setprojectID} rtype={rType} setrType={setrType} nps={nps} setnps={setnps} sch={sch} setsch={setsch}
                OD={OD} setOD={setOD}
                />
              }
            />
          </Routes>
          {<footer className='mb-3 row col-12'>
            <Copyright dim={dim}/>
          </footer>}
        </AnimatePresence>
    </>
  )
}

export default App;
