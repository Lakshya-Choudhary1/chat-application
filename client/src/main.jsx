import {  StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client';
import {BrowserRouter} from "react-router-dom"


import './index.css'
import App from './App.jsx'
import Loading from './pages/util/Loading.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <Suspense
        fallback={<Loading/>}>
        <App/>
      </Suspense>
    </StrictMode>
  </BrowserRouter>
)
