import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Persist auth state
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Spanzor Full Stack Demo</h1>
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <Dashboard user={user} />
      )}
    </div>
  );
}
