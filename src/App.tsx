import { lazy, Suspense } from 'react';
import './App.css'
// import Home from './components/Home/Home'
// import Product from './components/Product/Product';
import { Routes,Route } from 'react-router-dom';
const LazyHome = lazy(() => import("./components/Home/Home"));
const LazyProduct=lazy(() => import("./components/Product/Product"));
import Loading from './components/Loading/Loading';
function App() {
  
  return (
    <div>
      <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<LazyHome />} />
        <Route path='/product/:id' element={<LazyProduct />} />
      </Routes>
      </Suspense>
    </div>
  )
}

export default App
