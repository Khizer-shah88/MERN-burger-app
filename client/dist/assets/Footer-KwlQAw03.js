import{r as n,M as S,j as e,b as E,P as T,c as H,d as I,e as D,m as B,L as v}from"./index-D9ekf5Ik.js";import{a as g}from"./createLucideIcon-By_QYWH3.js";import{U as q}from"./utensils-crossed-DqnRKptg.js";class A extends n.Component{getSnapshotBeforeUpdate(c){const s=this.props.childRef.current;if(s&&c.isPresent&&!this.props.isPresent){const o=s.offsetParent,h=o instanceof HTMLElement&&o.offsetWidth||0,r=this.props.sizeRef.current;r.height=s.offsetHeight||0,r.width=s.offsetWidth||0,r.top=s.offsetTop,r.left=s.offsetLeft,r.right=h-r.width-r.left}return null}componentDidUpdate(){}render(){return this.props.children}}function F({children:t,isPresent:c,anchorX:s}){const o=n.useId(),h=n.useRef(null),r=n.useRef({width:0,height:0,top:0,left:0,right:0}),{nonce:f}=n.useContext(S);return n.useInsertionEffect(()=>{const{width:b,height:a,top:m,left:i,right:u}=r.current;if(c||!h.current||!b||!a)return;const x=s==="left"?`left: ${i}`:`right: ${u}`;h.current.dataset.motionPopId=o;const d=document.createElement("style");return f&&(d.nonce=f),document.head.appendChild(d),d.sheet&&d.sheet.insertRule(`
          [data-motion-pop-id="${o}"] {
            position: absolute !important;
            width: ${b}px !important;
            height: ${a}px !important;
            ${x}px !important;
            top: ${m}px !important;
          }
        `),()=>{document.head.removeChild(d)}},[c]),e.jsx(A,{isPresent:c,childRef:h,sizeRef:r,children:n.cloneElement(t,{ref:h})})}const U=({children:t,initial:c,isPresent:s,onExitComplete:o,custom:h,presenceAffectsLayout:r,mode:f,anchorX:b})=>{const a=E(V),m=n.useId(),i=n.useCallback(x=>{a.set(x,!0);for(const d of a.values())if(!d)return;o&&o()},[a,o]),u=n.useMemo(()=>({id:m,initial:c,isPresent:s,custom:h,onExitComplete:i,register:x=>(a.set(x,!1),()=>a.delete(x))}),r?[Math.random(),i]:[s,i]);return n.useMemo(()=>{a.forEach((x,d)=>a.set(d,!1))},[s]),n.useEffect(()=>{!s&&!a.size&&o&&o()},[s]),f==="popLayout"&&(t=e.jsx(F,{isPresent:s,anchorX:b,children:t})),e.jsx(T.Provider,{value:u,children:t})};function V(){return new Map}const w=t=>t.key||"";function _(t){const c=[];return n.Children.forEach(t,s=>{n.isValidElement(s)&&c.push(s)}),c}const se=({children:t,custom:c,initial:s=!0,onExitComplete:o,presenceAffectsLayout:h=!0,mode:r="sync",propagate:f=!1,anchorX:b="left"})=>{const[a,m]=H(f),i=n.useMemo(()=>_(t),[t]),u=f&&!a?[]:i.map(w),x=n.useRef(!0),d=n.useRef(i),j=E(()=>new Map),[R,L]=n.useState(i),[y,$]=n.useState(i);I(()=>{x.current=!1,d.current=i;for(let p=0;p<y.length;p++){const l=w(y[p]);u.includes(l)?j.delete(l):j.get(l)!==!0&&j.set(l,!1)}},[y,u.length,u.join("-")]);const C=[];if(i!==R){let p=[...i];for(let l=0;l<y.length;l++){const k=y[l],M=w(k);u.includes(M)||(p.splice(l,0,k),C.push(k))}return r==="wait"&&C.length&&(p=C),$(_(p)),L(i),null}const{forceRender:N}=n.useContext(D);return e.jsx(e.Fragment,{children:y.map(p=>{const l=w(p),k=f&&!a?!1:i===y||u.includes(l),M=()=>{if(j.has(l))j.set(l,!0);else return;let P=!0;j.forEach(z=>{z||(P=!1)}),P&&(N==null||N(),$(d.current),f&&(m==null||m()),o&&o())};return e.jsx(U,{isPresent:k,initial:!x.current||s?void 0:!1,custom:c,presenceAffectsLayout:h,mode:r,onExitComplete:k?void 0:M,anchorX:b,children:p},l)})})};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]],ne=g("DollarSign",W);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],re=g("MapPin",X);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]],ie=g("Menu",K);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=[["circle",{cx:"8",cy:"21",r:"1",key:"jimo8o"}],["circle",{cx:"19",cy:"21",r:"1",key:"13723u"}],["path",{d:"M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",key:"9zh506"}]],oe=g("ShoppingCart",G);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],ae=g("Trash2",O);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=[["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",key:"wrbu53"}],["path",{d:"M15 18H9",key:"1lyqi6"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",key:"lysw3i"}],["circle",{cx:"17",cy:"18",r:"2",key:"332jqn"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}]],le=g("Truck",J);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],ce=g("X",Q),Y={hidden:{opacity:0},visible:{opacity:1,transition:{duration:1}}},de=()=>e.jsx(B.footer,{className:"border-t border-black bg-yellow-500 text-white font-bold rounded-t-4xl w-full",variants:Y,initial:"hidden",whileInView:"visible",viewport:{once:!0},children:e.jsx("div",{className:"container mx-auto px-4 sm:px-6 py-8 md:py-12 max-w-[95%]",children:e.jsxs("div",{className:"flex flex-col gap-8",children:[e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8",children:[e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx(q,{className:"h-6 w-6"}),e.jsx("span",{className:"text-xl font-bold text-white",children:"BurgerBite"})]}),e.jsx("p",{className:"text-black text-sm sm:text-base",children:"Delicious burgers delivered to your doorstep. Fresh ingredients, amazing taste, and lightning-fast delivery."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-yellow-600",children:"Menu"}),e.jsx("ul",{className:"space-y-2",children:["Burgers","Sides","Drinks"].map(t=>e.jsx("li",{children:e.jsx(v,{to:`/menu/${t.toLowerCase()}`,className:"text-black hover:text-white transition-colors text-sm sm:text-base","aria-label":`${t} Menu`,children:t})},t))})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-yellow-600",children:"Company"}),e.jsx("ul",{className:"space-y-2",children:["About Us","Careers","Contact"].map(t=>e.jsx("li",{children:e.jsx(v,{to:`/${t.toLowerCase().replace(" ","-")}`,className:"text-black hover:text-white transition-colors text-sm sm:text-base","aria-label":t,children:t})},t))})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h4",{className:"font-semibold text-yellow-600",children:"Legal"}),e.jsx("ul",{className:"space-y-2",children:[{text:"Privacy Policy",path:"privacy"},{text:"Terms of Service",path:"terms"}].map(t=>e.jsx("li",{children:e.jsx(v,{to:`/${t.path}`,className:"text-black hover:text-white transition-colors text-sm sm:text-base","aria-label":t.text,children:t.text})},t.path))})]})]}),e.jsxs("div",{className:"flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-yellow-300",children:[e.jsx("p",{className:"text-black text-sm sm:text-base text-center sm:text-left",children:"© 2025 BurgerBite. All rights reserved."}),e.jsx("div",{className:"flex flex-wrap justify-center gap-4",children:["Instagram","Twitter","Facebook"].map(t=>e.jsx(v,{to:`/${t.toLowerCase()}`,className:"text-black hover:text-white transition-colors text-sm sm:text-base","aria-label":t,children:t},t))})]})]})})});export{se as A,ne as D,de as F,re as M,oe as S,le as T,ce as X,ie as a,ae as b};
