import React, {useEffect, useState, useRef} from "react";
import {motion, AnimatePresence} from "framer-motion";
import {Tooltip} from "bootstrap";
import Copyright from "../components/copyright";
import Plot from "react-plotly.js";
import * as math from "mathjs";
import html2pdf from 'html2pdf.js';
import Variants from "../components/variants";
import Ready from "../pages/ready";

const tooltips = document.querySelectorAll('.tt')
tooltips.forEach(t => {
  new Tooltip(t)
})


const Solution3=({ modal, setm, setp, setdim, dim, setErrorr, D, d, tab,
    t, ts, setd, setD, sett, setts, wrap, setwrap, Ldefect, Ti, Td,  
    setTi, setTd, setLdefect, Type, metal, tlife, setType, setmetal, settlife,
    method, Class, setClass, setmethod, Pd, setPd, shape, setshape,
    contact, setContact, ys, setys, pModulus, setpModulus, grade, setgrade,
    spec, setspec, width, setwidth, Po, setPo, email, setemail, project, setproject, 
    projectID, setprojectID, rType, setrType, OD, setOD, nps, setnps, sch, setsch, as, setas
}) =>{
    var x1, y1, x2, y2,w

    useEffect(()=>{
        if(typeof window?.MathJax !== "undefined"){
            window.MathJax.typeset()
        }
        setp(1)
    },[])

    const [h1, seth1]=useState(dim.w<=1280?((1280-dim.w))*(22/1000)+"%":"0%")

    useEffect(()=>{
        sett(Number(t))
        setts(Number(ts))
        setd(Number(d))
        settlife(Number(tlife))
        setTi(Number(Ti))
        setTd(Number(Td))
        setPd(Number(Pd))
        settlife(Number(tlife))
        if (D===math.round((406.4/25.4)*100)/100){
            setD(406.4)
        }
        if (Ldefect===math.round((200/25.4)*100)/100){
            setLdefect(200)
        }
    },[])

    const thermowrap ={
        Tg: 176.67,
        ac:0.00000486,
        aa:0.00000967,
        v: 0.37,
        Ec: 21374,
        Ea: 9653,
        tau: 19,
        tlay: 0.8382
    }

    const Example ={
        Tg: 80,
        ac:-0.000001,
        aa:-0.000001,
        v: 0.27,
        Ec: 36000,
        Ea: 36000,
        tau: 15,
        tlay: 1.25
    }

    const wrapp=()=>{
        if (wrap==1){
            return thermowrap
        } else return Example
    }
    const Tg=wrapp().Tg
    const Ec=wrapp().Ec
    const Ea=wrapp().Ea
    const tau=wrapp().tau
    const aa=wrapp().aa
    const ac=wrapp().ac
    const Tm=Tg - 20
    const tlay=wrapp().tlay
    const v=wrapp().v        

    const Arrange=[
        "Long-term measured strain to failure data are not available",
        `Thermal property requirement (Table 5 ISO 24817): \n
        Class 3, ${tlife} year life requires Tg ≥ (${Td}+20) = ${Td+20}°C \n \t
        \b Service temperature limit for repair  (Table 6 ISO 24817): Tm= Tg - 30 = ${Tg} - 20 = ${Tg-20}°C`,
        `Calculate ${"\\(\\epsilon_{c0}\\ \\  and\\ \\epsilon_{a0}\\)"} using Table 9 (ISO 24817)`,
        `Calculate derating factor and design allowable strains, ${"\\(f_{T1},\\epsilon_{c} \\ and \\ \\epsilon_{a}\\)"}, \n
            ${"\\(f_{T1} = 0.0000625(T_m-T_d)^2 + 0.00125(T_m-T_d) + 0.7\\)"} \n
            ${"\\(\\epsilon_{c} = f_{T1}\\epsilon_{c0} - |\\Delta T(\\alpha_s - \\alpha_c)|\\), \n"}
            ${"\\(\\epsilon_{a} = f_{T1}\\epsilon_{a0} - |\\Delta T(\\alpha_s - \\alpha_a)|\\)"}
        `,
        `Apply de-rating factors - no factors need to be applied`,
        "The defect is not through wall, i.e. the defect is Type A",
        `A defect assessment has been performed based on the remaining 
        wall thickness of the steel pipe to calculate the MAWP, \n 
            ${"\\(P_s = \\frac{2t_s\\sigma_s}{D-t_s}\\)"}
        `,
        `Calculate repair thickness ${method==2?"(limited by allowable strain in laminate)":"(Ignore Substrate, Limited Strain)"} \n
            ${method==2?"\\(t_{min,c} = \\frac{D}{2\\epsilon_cE_c}(P_{eq} - P_s)\\)":"\\(t_{min,c} = \\frac{1}{\\epsilon_c}(\\frac{P_{eq}D}{2E_c} + \\frac{F_{eq}v}{\\pi DE_c})\\)"} \n
            \n
                ${"\\(t_{min,a} = \\frac{1}{\\epsilon_a}(\\frac{F_{eq}}{2\\pi DE_a} - \\frac{P_{eq}Dv}{2E_c})\\)"}
        ` ,
        `Calculate final repair thickness noting that component type is a 
        straight pipe, ${"\\(f_{th,stress}\\)"} = 1 (Table 11) and no restriction on axial 
        extent, ${"\\(f_{th,overlay}\\)"} = 1 \n. Calculate the number of layers required: \\(n = \\frac{t_{design}}{t_{layer}}\\)`,
        `Calculate extent of repair, ${"\\(L_{over}\\)"}: \n
                    ${d<0.5*math.sqrt(D*(t-ts))?"\\(L_{over} = 4d\\)":"\\(L_{over} = 2\\sqrt{Dt_s}\\). \n" }
         Also calculated are the taper length (5:1 ratio on design repair thickness) and total 
        length of repair`,
         `Checks on design: \ \ \ \n
           ${"\b Length of Repair \\(L_{over} \\gt \\frac {3E_a\\epsilon_a t_{design}}{\\tau}\\)."} \n 
                    ${"\b Thickness of Repair -from Table 2 (ISO 24817)"} \n
                    ${"\b Interfracial stress"} \n
                    ${"\b Pressure area "}
                    `, 
    ]

    const ea0=()=>{
        if (Ea>=Ec){
            return 0.003061*10**(-0.0044*tlife)
        } return 0.001
    }
    const ec0=0.003061*10**(-0.0044*tlife)
    const fT1=0.0000625*(Tm-Td)**2 + 0.00125*(Tm-Td) + 0.7
    const deltaT=Td-Ti
    const ec=fT1*ec0-math.abs(deltaT*(as-ac))
    const ea=fT1*ea0()-math.abs(deltaT*(as-aa))
    const Ps=(2*(t-ts)*ys)/(D-(t-ts))
    const tminc=()=>{
        if (method==3){
            return (Pd*D/(ec*Ec*2))*(1-v/2)
        } else {
            return (D/(2*ec*Ec))*(Pd-Ps)
        }
    }
    const tmina=(Pd*D/(ea*Ec*2))*(0.5-v)
    const tdesign=()=>{
        if (tminc()>tmina){
            return tminc()
        } else return tmina
    }
    const Lover=()=>{
        if (d<0.5*math.sqrt(D*(t-ts))){
            return 4*d
        } else return 2*math.sqrt(D*(t-ts))
    }

    const Ltaper= 5*tdesign()
    const L=2*Ltaper+Ldefect+2*Lover()
    const ne=()=>{
       let k9= math.round((tdesign()/tlay))
        if (k9>(tdesign()/tlay)){
            return k9
        } else return k9 + 1
    }
    const R2=(S)=>math.round(S*100)/100
    const R4=(S)=>math.round(S*10000)/10000

    const Arrange1=[
        "",
        "",
        `${"\\(\\epsilon_{c0} = \\)"+R4(ec0)}, \n
        ${"\\(\\epsilon_{a0} = \\)"+R4(ea0())}
        `,
        `${"\\(f_{T1} = \\)"+R2(fT1)}, \n
            ${"\\(\\epsilon_{c} = \\)"+R4(ec)}, \n
            ${"\\(\\epsilon_{a} = \\)"+R4(ea)}
        `,
        "",
        "",
        `${"\\(P_s =\\)" +R2(Ps) +" MPa"}
        `,
        `${"\\(t_{min,c} =\\)" +R2(tminc()) +"mm"}, \n
        ${"\\(t_{min,a} =\\)" +R2(tmina) +"mm"} 
        `,
        `${"\\(t_{design} =\\)" +R2(tdesign())+"mm"} \n
            n= ${ne()}
        `,
        `${"\\(L_{over}= \\)"+R2(Lover())+"mm"}, \n
        ${"\\(L_{taper}= \\)"+R2(Ltaper)+"mm"}, \n
        ${"\\(L_{total}= \\)"+R2(L)+"mm"}
        `,
        `${"\\(L_{min}= \\)"+R2(3*Ea*ea*tdesign()/tau)+"mm"}, ${((3*Ea*ea*tdesign())/tau)<Lover()?"which is less than calculated value of "+R2(Lover())+"mm - check ok":"which is greater than or equal to the calculated value of "+R2(Lover())+"mm - check not ok"}: \n
        D/6= ${R2(D/6)}mm ${(D/6)>tdesign()?"which is greater than repair thickness of "+R2(tdesign())+" mm - check ok":"which is less than the repair thickness of "+R2(tdesign())+" mm - check not ok"}: \n
        Plive = 0 no check required: \n
        Component is not a tee therefore check not required
        `,
    ]

    const damP=math.round((((t-ts)/t)*Ps))

    x1= []
    y1= []
    y2= []
    for (let i = 0; i < (2*0.999/0.001)+1; i++) {
        x1[i]=-0.999+0.001*i;
        y1[i]=x1**2
        y2[i]=x1**3
    }

    var data1={
        x: x1,
        y: y1,
        name: 'graph',
        line: {
            color:'rgb(238, 66, 238)',
            width: 3,
        }
    }
    var data2={
        x: x1,
        y: y2,
        name: 'graph',
        line: {
            color:'rgb(238, 66, 238)',
            width: 3,
        }
    }

    const [data01, setdat01]=useState({
        x: [-0.999],
        y: [0],
        name: 'graph',
        line: {
            color:'rgb(238, 66, 238)',
            width: 3
        }
    })

    const [data02, setdat02]=useState({
        x: [-0.999],
        y: [0],
        name: 'graph',
        line: {
            color:'rgb(238, 66, 238)',
            width: 3,
        }
    })
    
    const simulation=()=>{
        let get=setTimeout(()=>{
            if((data01.x[data01.x.length-1]<1 && tab)){
                setdat01({
                    ...data01,
                    x: [...data01.x, data01.x[data01.x.length-1]+0.02],
                    y: [...data01.y, 0]
                })
                setdat02({
                    ...data02,
                    x: [...data02.x, data01.x[data01.x.length-1]+0.02],
                    y: [...data02.y,0]
                })
            } else {
                setdat01({
                    ...data01,
                    x: [-0.999],
                    y: [0]
                })
                setdat02({
                    ...data02,
                    x: [-0.999],
                    y: [0]
                })
            }
            if (!tab){clearTimeout(get)}
        }, 1000)
    }
    

    const widt=dim.w<700? dim.w*0.94: dim.w*0.45
    const height=widt*0.8
    var layout1={
        title:{
            text: '<span>Graph of((1-x^2)^'+(1)+')*P</span><span style="font-size: 0.7em"></span><span>(x,) for -1<x<1<\span>'
        },
        xaxis:{
            title:{
                text: '<span>x<\span>',
                font:{
                    color:'rgb(238, 66, 238)'
                }
            },
            range:[-1,1],
            gridcolor: 'white',
            gridwidth: 0.2,
            griddash:'dash',
            zerolinewidth: 1,
            showgrid: true,
            showline: true,
            tickmode: 'linear',
            tick0: 0,
            dtick: 0.25,
        },
        yaxis:{
            title:{
                text: '<span>((1-x^2)^'+(1)+')*P</span><span style="font-size: 0.7em"></span><span>(x,)<\span>',
                font:{
                    color:'rgb(238, 66, 238)'
                }
            },
            gridcolor: 'white',
            gridwidth: 0.2,
            griddash:'dash',
            zerolinewidth: 1
        },
        paper_bgcolor:'linear-gradient(to top left, darkblue 0%, rgb(0, 0, 12) 16.6%, rgb(7, 0, 0) 33.3%, rgb(7, 0, 0) 50%, rgb(7, 0, 0) 66.6%, rgb(0, 0, 12) 83.3%, darkblue 100%)',
        plot_bgcolor: 'rgb(12, 3, 12)', 
        font:{
            color: 'rgb(236, 221, 236)',
            family: 'Courier New, monospace'
        },
        height: height,
        width: widt
    }
    

    var layout11={
        title:{
            text: '<span>Graph of ((1-x^2)^'+(1)+')*P</span><span style="font-size: 0.7em"></span><span>(x,) for -1<x<1<\span>'
        },
        xaxis:{
            title:{
                text: '<span>x<\span>',
                font:{
                    color:'rgb(238, 66, 238)'
                }
            },
            range:[-1,1],
            gridcolor: 'white',
            gridwidth: 0.2,
            griddash:'dash',
            zerolinewidth: 1,
            showgrid: true,
            showline: true,
            tickmode: 'linear',
            tick0: 0,
            dtick: 0.25,
        },
        yaxis:{
            title:{
                text: '<span>((1-x^2)^'+(1)+')*P</span><span style="font-size: 0.7em"></span><span>(x,)<\span>',
                font:{
                    color:'rgb(238, 66, 238)'
                }
            },
            gridcolor: 'white',
            gridwidth: 0.2,
            griddash:'dash',
            zerolinewidth: 1
        },
        paper_bgcolor:'linear-gradient(to top left, darkblue 0%, rgb(0, 0, 12) 16.6%, rgb(7, 0, 0) 33.3%, rgb(7, 0, 0) 50%, rgb(7, 0, 0) 66.6%, rgb(0, 0, 12) 83.3%, darkblue 100%)',
        plot_bgcolor: 'rgb(12, 3, 12)', 
        font:{
            color: 'rgb(236, 221, 236)',
            family: 'Courier New, monospace'
        },
        height: height,
        width: width
    }
    var layout2={
        title:{
            text: '<span>Graph of ((1-x^2)^'+(1)+')*Q</span><span style="font-size: 0.7em"></span><span>(x,) for -1<x<1<\span>',
            font:{
                color:'rgb(236, 221, 236)',
                autosize: true
            }
        },
        xaxis:{
            title:{
                text: '<span>x<\span>',
                font:{
                    color:'rgb(238, 66, 238)'
                }
            },
            range:[-1,1],
            gridcolor: 'white',
            gridwidth: 0.2,
            griddash:'dash',
            zerolinewidth: 1,
            showgrid: true,
            showline: true,
            tickmode: 'linear',
            tick0: 0,
            dtick: 0.25,
            font:{
                color:'rgb(236, 221, 236)'
            }
        },
        yaxis:{
            title:{
                text: '<span>((1-x^2)^'+(1)+')*Q</span><span style="font-size: 0.7em"></span><span>(x,)<\span>',
                autosize: true,
                font:{
                    color:'rgb(238, 66, 238)'
                }
            },
            gridcolor: 'white',
            gridwidth: 0.2,
            griddash:'dash',
            zerolinewidth: 1,
            font:{
                color:'rgb(236, 221, 236)'
            }
        },
        paper_bgcolor:'linear-gradient(to top right, darkblue 0%, rgb(0, 0, 12) 16.6%, rgb(7, 0, 0) 33.3%, rgb(7, 0, 0) 50%, rgb(7, 0, 0) 66.6%, rgb(0, 0, 12) 83.3%, darkblue 100%)',
        plot_bgcolor: 'rgb(12, 3, 12)', 
        font:{
            color: 'rgb(236, 221, 236)',
            family: 'Courier New, monospace'
        },
        height: height,
        width: width
    }

    var layout22={
        title:{
            text: '<span>Graph of ((1-x^2)^'+(1)+')*Q</span><span style="font-size: 0.7em"></span><span>(x,) for -1<x<1<\span>',
            font:{
                color:'rgb(236, 221, 236)',
                autosize: true
            }
        },
        xaxis:{
            title:{
                text: '<span>x<\span>',
                font:{
                    color:'rgb(238, 66, 238)'
                }
            },
            range:[-1,1],
            gridcolor: 'white',
            gridwidth: 0.2,
            griddash:'dash',
            zerolinewidth: 1,
            showgrid: true,
            showline: true,
            tickmode: 'linear',
            tick0: 0,
            dtick: 0.25,
            font:{
                color:'rgb(236, 221, 236)'
            }
        },
        yaxis:{
            title:{
                text: '<span>((1-x^2)^'+(1)+')*Q</span><span style="font-size: 0.7em"></span><span>(x,)<\span>',
                autosize: true,
                font:{
                    color:'rgb(238, 66, 238)'
                }
            },
            gridcolor: 'white',
            gridwidth: 0.2,
            griddash:'dash',
            zerolinewidth: 1,
            font:{
                color:'rgb(236, 221, 236)'
            }
        },
        paper_bgcolor:'linear-gradient(to top right, darkblue 0%, rgb(0, 0, 12) 16.6%, rgb(7, 0, 0) 33.3%, rgb(7, 0, 0) 50%, rgb(7, 0, 0) 66.6%, rgb(0, 0, 12) 83.3%, darkblue 100%)',
        plot_bgcolor: 'rgb(12, 3, 12)', 
        font:{
            color: 'rgb(236, 221, 236)',
            family: 'Courier New, monospace'
        },
        height: height,
        width: widt
    }

    let config={
        responsive: true,
        staticPlot: true,
        scale: 1
    }


    const element=document.getElementById('pdf');

    const opt={
        margin: 0.08,
        filename: 'EATECH Calculator.pdf',
        image: {type: 'jpeg', quality:0.98},
        html2canvas: {scale:1},
        jsPDF: {
            unit: 'in',
            format: 'a4',
            orientation: 'p'
        },
        pagebreak: {
        avoid: ['#pic1', '#pic2', "#pic3", "#pic4"]
        }
    };
    const [f, setf]=useState(window.screen.availHeight)

    useEffect(()=>{
        function handle(){
        setdim({
            w: document.documentElement.clientWidth,
            h: document.documentElement.clientHeight
        })
        seth1(dim.w<=1280?((1280-dim.w))*(34/1000)+"%":"0%")
        setf(window.screen.availHeight)
        }
        window.addEventListener('resize', handle)
        
        return _=>{
          window.removeEventListener('resize', handle)
        }
    });
    useEffect(()=>{
        if(typeof window?.MathJax !== "undefined"){
            window.MathJax.typeset()
        }
        setm({...modal, Ready:false})
        console.log(ys,Pd,D,Ec,Ps,ec,((tdesign()/tlay)))
    },[])

    return (
        <>
        <div className="d-block m-0 p-1"  style={w<=1280?{minHeight: 1.1*f+"px", paddingTop:0+"%"}:{minHeight: 1.1*f+"px",paddingTop:"0%"}}>
        <div className="tab-content justify-content-center col-lg-8 col-12" id="nav-tabContent" style={{margin: "auto", marginTop: h1}}>
            <AnimatePresence >
            <motion.div className="tab-pane fade show active" id="nav-full-solution" role="tabpanel"
                key="full"
                aria-labelledby="nav-full-solution-tab">
                <section>
                    <table>

                        <thead className="text-center">

                            Step by Step Design
                        </thead>
                        <tbody >
                                <tr>
                                    <td></td>
                                    <td>Procedure</td>
                                    <td>Outcome</td>
                                </tr>  
                            {
                                Arrange.map((i,k)=>(
                                    <tr key={k}>
                                        <td>{"Step "+(k+1)}</td>
                                        <td>{i}</td>
                                        <td>{Arrange1[k]}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </section>
            </motion.div>
                <motion.div className="tab-pane fade" id="nav-graph" role="tabpanel"
                    key="graph"
                aria-labelledby="nav-graph-tab">
                <section>
                    <div className="justify-content-center container-lg align-items-center">
                    <div style={{margin:"auto", justifyContent:"center", display:"flex"}}>
                        <Plot
                            id="p_graph"
                            data={[data01]}
                            layout={layout1}
                            config={config}
                            style={{textAlign: "center", marginBottom: "5%", marginTop: "5%", alignItems: "center"}}
                        />
                    </div>
                    <div style={{margin:"auto", justifyContent:"center", display:"flex"}}>
                        <Plot
                            id="q_graph"
                            data={[data02]}
                            layout={layout2}
                            config={config}
                            style={{textAlign: "center", marginBottom: "5%", marginTop: "5%", alignItems: "center"}}
                        />
                    </div>
                    </div>
                </section>
            </motion.div>
            </AnimatePresence>
        </div>
        </div>
        </>
    )
}

export default Solution3