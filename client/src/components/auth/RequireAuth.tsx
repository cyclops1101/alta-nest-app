import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import react from 'react';

export default function RequireAuth({ children }: { children: react.ReactNode }) {
  const token = useAppSelector((state) => state.auth.token);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
