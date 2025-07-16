'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { isTokenExpired, setIsAuthenticated } from '../store/slices/clientSlice';

export default function NavigationMiddleware() {
  const { isAuthenticated, loading } = useSelector((state: any) => state.auth);
  const router = useRouter();
  console.log(isAuthenticated);


  const dispatch = useDispatch();
const [initialLoad, setInitialLoad] = useState(true);


  const token: string | null = typeof window !== 'undefined' ? localStorage.getItem('client_session') : null;

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      localStorage.removeItem('client_session');
      dispatch(setIsAuthenticated(false));
    } else if (token) {
      dispatch(setIsAuthenticated(true));
    } else {
      dispatch(setIsAuthenticated(false));
    }
  }, [dispatch, token]);

useEffect(() => {
  const timer = setTimeout(() => {
    setInitialLoad(false); // After 2 seconds, allow loading to control initialLoad
  }, 2000);

  return () => clearTimeout(timer);
}, []);

useEffect(() => {
  if (!initialLoad) { // Only update from loading AFTER initial 2 seconds have passed
    setInitialLoad(loading);
  }
}, [loading, initialLoad]);



  useEffect(() => {
    if (initialLoad) return;

    if (isAuthenticated && window.location.pathname === '/') {
      router.replace('/dashboard');
    } else if (!isAuthenticated && window.location.pathname.startsWith('/dashboard')) {
      router.replace('/');
    }
  }, [initialLoad, isAuthenticated, router]);

  
  if (initialLoad || loading ) {
    return <div className="fixed top-0 left-0 z-[9999] bg-black w-screen h-screen flex justify-center items-center">
      Loading
    </div>
  }

  return null;
}
