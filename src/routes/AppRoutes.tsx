import { Suspense } from 'react';
import {Routes, Route} from 'react-router-dom';
import { ROUTES } from './routeslinks';
import Spinner from '@/shared/widgets/Spinner';
import { Homepage, Registerpage, RecoverAccPage, Protected, Feed, Layout, Profile, Create, ErrorPage, Post, SearchResult, EditPost } from '@/routes/LazyComponents';


const AppRoutes= () => {
  const { REGISTER, RECOVER_ACC, FEEDS,PROFILE,CREATE_POST, POST, SEARCH, EDIT_POST }=ROUTES;

  return (
    <Routes>
        <Route element={<Suspense fallback={<Spinner />}><Protected /></Suspense>}>
          <Route index path="/" element={<Suspense fallback={<Spinner />}><Homepage /></Suspense>} />
          <Route path={REGISTER} element={<Suspense fallback={<Spinner />}><Registerpage /></Suspense>} />
          <Route path={RECOVER_ACC} element={<Suspense fallback={<Spinner />}><RecoverAccPage /></Suspense>} />
          <Route path='/user' element={<Suspense fallback={<Spinner />}><Layout /></Suspense>}>
            <Route path={FEEDS} element={<Suspense fallback={<Spinner />}><Feed /></Suspense>} />
            <Route path={POST} element={<Suspense fallback={<Spinner />}><Post /></Suspense>} />
            <Route path={CREATE_POST} element={<Suspense fallback={<Spinner />}><Create /></Suspense>} />
            <Route path={PROFILE} element={<Suspense fallback={<Spinner />}><Profile /></Suspense>} />
            <Route path={SEARCH} element={<Suspense fallback={<Spinner />}><SearchResult /></Suspense>} />
            <Route path={EDIT_POST} element={<Suspense fallback={<Spinner />}><EditPost /></Suspense>} />
          </Route>
        </Route>
        <Route path="*" element={<Suspense fallback={<Spinner />}><ErrorPage /></Suspense>}/> 
    </Routes>
  )
}

export default AppRoutes;