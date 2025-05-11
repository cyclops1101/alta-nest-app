import { Outlet } from 'react-router-dom';

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded">
        <Outlet />
      </div>
    </div>
  );
}
