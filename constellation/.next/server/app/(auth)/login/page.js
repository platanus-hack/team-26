(()=>{var e={};e.id=665,e.ids=[665],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},7790:e=>{"use strict";e.exports=require("assert")},7702:e=>{"use strict";e.exports=require("events")},2048:e=>{"use strict";e.exports=require("fs")},2615:e=>{"use strict";e.exports=require("http")},8791:e=>{"use strict";e.exports=require("https")},9801:e=>{"use strict";e.exports=require("os")},5315:e=>{"use strict";e.exports=require("path")},6162:e=>{"use strict";e.exports=require("stream")},4175:e=>{"use strict";e.exports=require("tty")},7360:e=>{"use strict";e.exports=require("url")},1764:e=>{"use strict";e.exports=require("util")},1568:e=>{"use strict";e.exports=require("zlib")},8611:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>a.a,__next_app__:()=>p,originalPathname:()=>d,pages:()=>c,routeModule:()=>g,tree:()=>u}),r(3272),r(5866),r(2029);var s=r(3191),o=r(8716),n=r(7922),a=r.n(n),l=r(5231),i={};for(let e in l)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(i[e]=()=>l[e]);r.d(t,i);let u=["",{children:["(auth)",{children:["login",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,3272)),"/home/amonio/Code/constellationhub/constellation/src/app/(auth)/login/page.tsx"]}]},{}]},{"not-found":[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,2029)),"/home/amonio/Code/constellationhub/constellation/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,5866,23)),"next/dist/client/components/not-found-error"]}],c=["/home/amonio/Code/constellationhub/constellation/src/app/(auth)/login/page.tsx"],d="/(auth)/login/page",p={require:r,loadChunk:()=>Promise.resolve()},g=new s.AppPageRouteModule({definition:{kind:o.x.APP_PAGE,page:"/(auth)/login/page",pathname:"/login",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:u}})},4539:(e,t,r)=>{Promise.resolve().then(r.t.bind(r,2994,23)),Promise.resolve().then(r.t.bind(r,6114,23)),Promise.resolve().then(r.t.bind(r,9727,23)),Promise.resolve().then(r.t.bind(r,9671,23)),Promise.resolve().then(r.t.bind(r,1868,23)),Promise.resolve().then(r.t.bind(r,4759,23))},3163:(e,t,r)=>{Promise.resolve().then(r.bind(r,4242))},5123:()=>{},6226:(e,t,r)=>{"use strict";r.d(t,{default:()=>o.a});var s=r(9029),o=r.n(s)},434:(e,t,r)=>{"use strict";r.d(t,{default:()=>o.a});var s=r(9404),o=r.n(s)},9029:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return i},getImageProps:function(){return l}});let s=r(1174),o=r(3078),n=r(2481),a=s._(r(6820));function l(e){let{props:t}=(0,o.getImgProps)(e,{defaultLoader:a.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];return{props:t}}let i=n.Image},4242:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>p});var s=r(326),o=r(7577),n=r(5047),a=r(6402),l=r(5884),i=r(434),u=r(96),c=r(6226);let d=()=>{let[e,t]=(0,o.useState)(""),[r,d]=(0,o.useState)(""),[p,g]=(0,o.useState)(""),h=(0,n.useRouter)(),{login:m,isAuthenticated:x}=(0,u.Z)();(0,o.useEffect)(()=>{x()&&h.push("/graph")},[x]);let f=async t=>{t.preventDefault(),await m(e,r,g)&&h.push("/graph")};return(0,s.jsxs)("div",{className:"flex flex-col items-center justify-center min-h-screen gap-4 font-sans font-thin",children:[s.jsx(c.default,{src:"logo.svg",width:200,height:200,alt:"constellation logo",className:"h-32 w-auto",priority:!0}),s.jsx("h1",{className:"text-5xl",children:"Login"}),(0,s.jsxs)("form",{onSubmit:f,className:"flex flex-col gap-4",children:[(0,s.jsxs)("div",{children:[s.jsx("label",{htmlFor:"email",children:"Email"}),s.jsx(a.Z,{id:"email",value:e,onChange:e=>t(e.target.value)})]}),(0,s.jsxs)("div",{children:[s.jsx("label",{htmlFor:"password",children:"Password"}),s.jsx(a.Z,{id:"password",type:"password",value:r,onChange:e=>d(e.target.value)})]}),p&&s.jsx("p",{style:{color:"red"},children:p}),s.jsx(l.Z,{label:"Login",type:"submit",onClick:()=>{}})]}),(0,s.jsxs)("label",{children:["Don't have an account?"," ",s.jsx(i.default,{href:"/register",className:"text-blue-500",children:"Register"})]})]})};function p(){return s.jsx("div",{children:s.jsx(d,{})})}},5884:(e,t,r)=>{"use strict";r.d(t,{Z:()=>o});var s=r(326);r(7577);let o=({label:e,icon:t,onClick:r,type:o="button",disabled:n=!1,className:a=""})=>s.jsx("button",{type:o,onClick:r,disabled:n,className:`relative px-0.5 py-0.5 rounded-full font-semibold transition duration-200 ease-in-out
        text-white 
                ${n?"bg-gray-500 cursor-not-allowed":"bg-blue-500"}
                focus:outline-none hover:opacity-75 active:scale-95 ${a}`,children:(0,s.jsxs)("span",{className:`flex items-center justify-center w-full h-full bg-gray-900 rounded-full px-4 py-2 ${e?"":"justify-center"}`,children:[t&&s.jsx("span",{className:`${e?"mr-2":""}`,children:t}),e]})})},6402:(e,t,r)=>{"use strict";r.d(t,{Z:()=>o});var s=r(326);r(7577);let o=({value:e,id:t,onChange:r,placeholder:o="",disabled:n=!1,type:a="text"})=>s.jsx("input",{type:a,id:t,value:e,onChange:r,disabled:n,placeholder:o,className:`px-4 py-2 rounded-lg w-full bg-gray-800 text-white placeholder-gray-500
        transition duration-200 ease-in-out 
        ${n?"bg-gray-500 cursor-not-allowed":"focus:bg-gray-700"}
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`})},96:(e,t,r)=>{"use strict";r.d(t,{Z:()=>a});var s=r(7577),o=r(4099),n=r(5047);let a=()=>{let[e,t]=(0,s.useState)(null),r=(0,n.useRouter)();return(0,s.useEffect)(()=>{let e=localStorage.getItem("token"),r=localStorage.getItem("username");e&&r&&t({username:r})},[]),{user:e,login:async(e,r,s)=>{try{let s=await o.Z.post("https://tensor.zapto.org/constellation/v1/users/login",{username:e,password:r}),n=s.data.access,a=s.data.refresh;return localStorage.setItem("token",n),localStorage.setItem("refreshToken",a),localStorage.setItem("username",e),t({username:e}),!0}catch(e){return s(o.Z.isAxiosError(e)&&e.response&&(400===e.response.status||401===e.response.status)?"Invalid credentials":"An unexpected error occurred"),!1}},logout:()=>{localStorage.removeItem("token"),localStorage.removeItem("refreshToken"),localStorage.removeItem("username"),t(null),r.push("/login")},isAuthenticated:()=>!!localStorage.getItem("token")}}},3272:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});let s=(0,r(8570).createProxy)(String.raw`/home/amonio/Code/constellationhub/constellation/src/app/(auth)/login/page.tsx#default`)},2029:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n,metadata:()=>o});var s=r(9510);r(5023);let o={title:"Constellation Hub",description:"A hub for all academic articles and papers"};function n({children:e}){return s.jsx("html",{lang:"en",children:s.jsx("body",{children:e})})}},5023:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[819,555,162],()=>r(8611));module.exports=s})();