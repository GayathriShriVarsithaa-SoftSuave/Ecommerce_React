import { lazy, Suspense } from 'react';
import './App.css'
import { Routes,Route } from 'react-router-dom';
const LazyHome = lazy(() => import("./components/Home/Home"));
const LazyProduct=lazy(() => import("./components/Product/Product"));
import Loading from './components/Loading/Loading';
const LazyNotFound=lazy(() => import("./components/NotFound/NotFound")); 
function App() {
  return (
    <div>
      <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<LazyHome />} />
        <Route path='/product/:id' element={<LazyProduct />} />
        <Route path='*' element={<LazyNotFound />} />
      </Routes>
      </Suspense>
    </div>
  )
}
export default App
