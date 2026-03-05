import { lazy, Suspense, useEffect } from "react"
import {Routes, Route, Navigate, useLoaderData, useLocation } from "react-router-dom"
import {motion} from "framer-motion";
import toast,{Toaster} from "react-hot-toast";
import Loading from "./pages/util/Loading.jsx"

import { useAuthStore } from "./store/useAuthStore.js";

const ForbiddenPage = lazy(()=>import("./pages/error/ForbiddenPage.jsx"))
const LoginPage = lazy(()=>import("./pages/auth/LoginPage.jsx") )
const SignupPage = lazy(()=>import("./pages/auth/SignupPage.jsx") )
const Home = lazy(()=>import("./pages/Home.jsx"));

const App = () =>{
  
  const {checkAuth , isCheckingAuth , authUser} = useAuthStore();
  useEffect(()=>{
    checkAuth();
  },[])
  

  if(isCheckingAuth){
    return <Loading />;
  }

  return <section  
            onContextMenu={e=>e.preventDefault()}
            className="min-h-screen w-screen overflow-hidden flex justify-center items-center bg-slate-900 relative">
          
          {/* DECORATORS - GRID BG AND GLOW SHAPES */}
          <div className="absolute  inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[14px_21px]" />

          <motion.div className="absolute  top-0 -left-4 size-96 bg-pink-500 opacity-20 blur-[100px]" 
            animate={{
               x: ["0%","30%","0%"],
               y:["0%","30%","0%"],
               rotate: [0,360]
            }}
            transition={{
               duration: 10,
               ease:"linear",
               repeat:Infinity
            }}
            aria-hidden='true'
          />

          <motion.div className="absolute  bottom-0 -right-4 size-96 bg-cyan-500 opacity-20 blur-[100px]" 
            animate={{
               x: ["0%","-30%","0%"],
               y:["0%","-30%","0%"],
               rotate: [0,360]
            }}
            transition={{
               duration: 10,
               ease:"linear",
               repeat:Infinity
            }}
            aria-hidden='true'
          />
          <div />

          <Routes>
            <Route path="/" element={
              <Suspense fallback={<Loading/>}>
                {!authUser ? 
                  <Navigate to={"/login"} /> :
                  <Home/> }
              </Suspense>
              } />
            <Route path="/login" 
              element={<Suspense fallback={<Loading/>}>
                  {!authUser ? 
                    <LoginPage /> :
                    <Navigate to={"/"} />}
                </Suspense>} 
            />
            <Route path="/signup" 
              element={<Suspense fallback={<Loading/>}>
                  {!authUser ? <SignupPage /> : <Navigate to="/" />}
                </Suspense>} 
            />

            <Route path="/loading" 
              element={<Loading />}
            />

            <Route path="/*" 
              element={<Suspense fallback={<Loading/>}>
                  <ForbiddenPage/>
                </Suspense>} 
            />
          </Routes>
          <Toaster />
  </section>
}

export default App
