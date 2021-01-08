import React, {useContext, useState} from 'react';
import ModalDessin from './ModalDessin'
import { UserContext } from "../providers/userProvider";
import { storage } from '../firebase';

const Dessin = ({setDessinFalse,currentContent, setCurrentContent, currentLecon, submitDessin}) => {
    const [spanR, setSpanR] = useState(10)
    const [spanG, setSpanG] = useState(10)
    const [spanB, setSpanB] = useState(10)
    const [spanRadius, setSpanRadius] = useState(10)
    const [titleDessin, setTitleDessin] = useState("")
    const user = useContext(UserContext)
    const lecon = currentLecon.cours
    const getXY = (canvas, evt) => {
      const rect = canvas.getBoundingClientRect();
      const x = evt.clientX - rect.left;
      const y = evt.clientY - rect.top;
      return {x, y};
    }
    const componentToHex = (c) => {
      const hex = Number(c).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }
    const rgbToHex = (r, g, b) => {
      return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
    const canvasDraw = (evt0) =>{
    const canvas_draw = document.getElementById('canvas_draw')
      // get brush parameters from range elements
      const r = Number(spanR);
      const g = Number(spanG);
      const b = Number(spanB);
      const color = rgbToHex(r, g, b);
      const radius = Number(spanRadius);

      // get canvas context and initial position
      const ctx = canvas_draw.getContext("2d");
      let p0 = getXY(canvas_draw, evt0);

      canvas_draw.onmousemove = function(evt1) {
        // draw a line from previous position to current position
        const p1 = getXY(canvas_draw, evt1);
        ctx.beginPath();
        ctx.strokeStyle = color
        ctx.fillStyle = color;
        ctx.lineWidth = 2 * radius;
        ctx.lineCap = "round";
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.fill();
        ctx.stroke();
        // update position 
        p0 = p1;
      };
    };
    const canvasUp = () =>{
      const canvas_draw = document.getElementById('canvas_draw')
      canvas_draw.onmousemove = {};
    }
    const btnClear = () =>{
      const canvas_draw = document.getElementById('canvas_draw')
      const width = canvas_draw.clientWidth;
      const height = canvas_draw.clientHeight;
      const ctx = canvas_draw.getContext("2d");
      ctx.beginPath();
      ctx.clearRect(0, 0, width, height);
      ctx.stroke();
    }

    const convertCanvasToImage = async (e) => {
      e.preventDefault()
      
      const canvas_draw = document.getElementById('canvas_draw')

      await canvas_draw.toBlob( async (blob) =>{
        const response = await storage
              .ref()
              .child(`${user.displayName}-${user.uid}`)
              .child(lecon.matiere)
              .child(lecon.title)
              .child(titleDessin)
              .put(blob)
        const url = await response.ref.getDownloadURL(); 
        const newContentDraw = `${currentContent}<br><figure class="image ck-widget" contenteditable="false"><img src="${url}" alt="${titleDessin}"/></figure>`
        submitDessin(newContentDraw)
        setCurrentContent(newContentDraw)
        setDessinFalse()
      }, 'image/png' )
    }  

    return (
    <ModalDessin>
      <form onSubmit={convertCanvasToImage}>
        <div className="colorTailleDessin">
            <p> Rouge <input type="range" min="0" max="255" id="input_r" value={spanR} onChange={(e) => setSpanR(e.target.value)}/>
                <span id="span_r">{spanR}</span> </p>
            <p> Vert <input type="range" min="0" max="255" id="input_g"  value={spanG} onChange={(e) => setSpanG(e.target.value)}/>
                <span id="span_g">{spanG}</span> </p>
            <p> Bleu <input type="range" min="0" max="255" id="input_b"  value={spanB} onChange={(e) => setSpanB(e.target.value)} />
                <span id="span_b">{spanB}</span> </p>
            <p> Taille <input type="range" min="2" max="50" id="input_radius" value={spanRadius} onChange={(e) => setSpanRadius(e.target.value)}/>
                <span id="span_radius">{spanRadius}</span> </p>
        </div>
            <input vtype="text" className="titleDessin" value={titleDessin} onChange={(e) => setTitleDessin(e.target.value)} placeholder="Titre du Schéma" required/>
            <canvas id="canvas_draw" width="1000" height="590" style={{border: '1px solid black'}} onMouseDown={canvasDraw} onMouseUp={canvasUp}> </canvas>
            <div className="btnsDessin">
              <button id="button_clear" onClick={btnClear}>Effacer tout</button>
              <button onClick={setDessinFalse}>Annuler</button>
              <input type="submit" value="Confirmer" />
            </div>
      </form>
    </ModalDessin>
  );
};

export default Dessin;