import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Stage from "./_canvas";
import Text from "./_canvas/shapes/text";
import { EventNames } from "./_canvas/types";
function App() {
  const canvasRef = useRef(null);
  const [textValue,setTextValue] =useState('即使设计');
  const inputRef = useRef<any>(null);
  const stageRef = useRef<any>(null);
  useEffect(() => {
    if (!canvasRef.current) return;
    const stage = new Stage(canvasRef.current);
    stageRef.current = stage;
    const defaultTextValue = {
      text: "即使设计",
      fontFamily: "Inter",
      fontSize: 42,
      fill: "#000",
      stroke: "#000",
      lineHeight: 12,
      letterSpace: 1,
      x: 50,
      y: 100,
    };
    const text = new Text(defaultTextValue);
    text.on(EventNames.mousedown,(e)=>{});
    stage.add(text);
    stage.render();
    stage.renderLoop();
  }, [canvasRef.current]);

  useEffect(()=>{
    //启动requestAnimationFrame;
    
  },[])

  const createTextHandle = ()=>{
  const val =  inputRef.current?.value || '';
  let id = stageRef.current?.getCurrentSelectId();
    stageRef.current.change(id,{
      text: val
    })
  }
  return (
    <>
      <div id="app" className="app">
        <div className="canvasContainer">
        <canvas id="mainCanvas" style={{width:'900px',height:'500px'}} ref={canvasRef}></canvas>
        </div>
        <div className="toolbar">
          <input ref={inputRef} type="text" value={textValue} onChange={e=>setTextValue(e.target.value)} />
          <button onClick={createTextHandle}>create</button>
        </div>
      </div>
    </>
  );
}

export default App;
