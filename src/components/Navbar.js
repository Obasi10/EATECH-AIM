import { Link } from 'react-router-dom';
import Variants from './variants';
import pic from "../edit (2).png"
import {motion, AnimatePresence} from "framer-motion";
import { useEffect, useState } from 'react';

const svgVariants = {
  hidden: { rotate: -180 },
  visible: { 
    rotate: 0,
    transition: { 
      duration : 10,
      repeat: Infinity
   }
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
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut",
      }
  }
};

const Navbar = ({page, modal, setm, settab}) => {

  return (
    <>
    {(!modal.Ready && !modal.submit && !modal.News && !modal.av && !modal.S && !modal.D &&
     !modal.review && !modal.error && !modal.logpage && !modal.logSub) && 
    (
    <div>
      <div className="container col-lg-10 col-12 mb-0">
        <nav className="navbar fixed-top navbar-expand-md bgcon py-1 d-block">
          <div style={document.documentElement.clientWidth<500?{alignItems: "center", alignContent: "center", alignSelf: "center"}:{alignItems: "center", alignContent: "center", alignSelf: "center", maxWidth:"90%"}
          } className={document.documentElement.clientWidth>650?"ms-lg-2 ms-md-0 container-md fs-5":"container-md"}>
            <Link to="/" className="navbar-brand text-decoration-none fs-4 pt-2 col-md-3 me-md-3">
              <span className="fw-bold motion1 align-items-center">
                <i className="mx-2"> <img className='styleimg2' src={pic} alt=""/></i>
                EATECH
              </span>
            </Link>
            <div className='d-flex text-end textpele justify-content-space-around' style={{fontStyle:"italic"}}>
              Stay Alert, don't get hurt.
            </div>
          </div>

          {page===1 && ( <div className="my-1 col-lg-8 align-items-center table-responsive justify-content-lg-center container-lg stytab">
                <div id="nav-tab" style={document.documentElement.clientWidth<700?{minWidth: "32rem"}:{minWidth: "50rem"}} role="tablist">
                    <ul className="nav nav-pills justify-content-around p-0">
                    <li className={document.documentElement.clientWidth>700?"nav-item fs-5":"nav-item p-0 beginner"}><button className={"nav-link active fw-bold px-2 fst-italic d-flex textpele"} id="nav-full-solution-tab" data-bs-toggle="tab" data-bs-target="#nav-full-solution" type="button"
                        role="tab" aria-controls="nav-full-solution" aria-selected={"false"} onClick={()=>settab(false)}>
                        Report
                        </button>
                    </li>
                    <li className={document.documentElement.clientWidth>700?"nav-item fs-5":"nav-item p-0 beginner"}><button className={"nav-link fw-bold px-2 fst-italic textpele"} id="nav-graph-tab" data-bs-toggle="tab" data-bs-target="#nav-graph" type="button"
                        role="tab" aria-controls="nav-graph" aria-selected={"false"} onClick={()=>settab(true)}>
                        Analysis
                        </button>
                    </li>
                    </ul>
                </div>
            </div>)}
        </nav>
      </div>
    </div>
    )}
    </>

  )
}

export default Navbar