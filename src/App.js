import React from 'react';
import Navbar from './components/Navbar';
import Pages from './pages/Pages';

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Pages />
    </main>
  );
}

export default App;
