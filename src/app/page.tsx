'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [logoPreview, setLogoPreview] = useState('');
  const [companyLogo, setCompanyLogo] = useState('');

  useEffect(() => {
    // Load saved state
    const savedCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    setIsCollapsed(savedCollapsed);

    const savedName = localStorage.getItem('companyName') || '';
    const savedAddress = localStorage.getItem('companyAddress') || '';
    const savedLogo = localStorage.getItem('companyLogo') || '';
    setCompanyName(savedName);
    setCompanyAddress(savedAddress);
    setCompanyLogo(savedLogo);
  }, []);

  const toggleMenu = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    localStorage.setItem('sidebarCollapsed', newCollapsed.toString());
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setLogoPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('companyName', companyName);
    localStorage.setItem('companyAddress', companyAddress);

    if (logoPreview) {
      localStorage.setItem('companyLogo', logoPreview);
      setCompanyLogo(logoPreview);
    }

    closeModal();
    alert('Company information saved! Logo will now appear in the header.');
  };

  return (
    <div className={`min-h-screen bg-gray-100 text-gray-800 transition-all duration-300 ${isCollapsed ? '' : 'ml-0'}`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-blue-500 text-white p-4 flex justify-between items-center z-50 shadow-md">
        <img src="/assets/snappdraft-logo.png" alt="Snappdraft Logo" className="h-10 w-auto" /> {/* Update src as needed */}
        {companyLogo && <img src={companyLogo} alt="Company Logo" className="h-10 max-w-36" />}
        <button
          className="md:hidden flex flex-col p-2 cursor-pointer"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-transform ${isCollapsed ? 'rotate-45 translate-y-1 translate-x-1' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-opacity ${isCollapsed ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-transform ${isCollapsed ? '-rotate-45 -translate-y-1 translate-x-1' : ''}`} />
        </button>
      </header>

      {/* Overlay */}
      {isCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Sidebar */}
      <nav className={`fixed top-20 left-0 h-[calc(100vh-5rem)] w-64 bg-gray-200 p-4 overflow-y-auto transition-transform duration-300 z-40 md:translate-x-0 ${
        isCollapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'
      }`}>
        <ul className="space-y-2">
          <li><a href="#dashboard" className="block p-3 font-bold text-blue-500 hover:bg-blue-500 hover:text-white rounded">Dashboard</a></li>
          <li><a href="#projects" className="block p-3 font-bold text-blue-500 hover:bg-blue-500 hover:text-white rounded">Projects</a></li>
          <li><a href="#proposals" className="block p-3 font-bold text-blue-500 hover:bg-blue-500 hover:text-white rounded">Proposals</a></li>
          <li><a href="#engineers" className="block p-3 font-bold text-blue-500 hover:bg-blue-500 hover:text-white rounded">Engineers</a></li>
          <li><a href="#vendors" className="block p-3 font-bold text-blue-500 hover:bg-blue-500 hover:text-white rounded">Vendors</a></li>
          <li>
            <button
              onClick={() => { openModal(); if (window.innerWidth < 768) toggleMenu(); }}
              className="w-full text-left p-3 font-bold text-blue-500 hover:bg-blue-500 hover:text-white rounded"
            >
              Company Information
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className={`pt-20 p-8 transition-all duration-300 ${isCollapsed ? 'md:ml-0' : 'md:ml-64'}`}>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to Snappdraft</h1>
          <p className="mb-6">Streamline your electrical estimating with simple, powerful tools. Start by adding your company details for branded proposals.</p>
          <button onClick={openModal} className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
            Add Company Information
          </button>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Company Information</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2 font-bold">Company Name:</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
                required
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <label className="block mb-2 font-bold">Address:</label>
              <textarea
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                placeholder="Enter company address"
                rows={3}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <label className="block mb-2 font-bold">Logo:</label>
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="w-full p-2 border border-gray-300 rounded mb-2" />
              {logoPreview && <img src={logoPreview} alt="Preview" className="max-h-24 mx-auto mb-4" />}
              <div className="flex space-x-2">
                <button type="submit" className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                  Save
                </button>
                <button type="button" onClick={closeModal} className="flex-1 bg-gray-300 py-2 rounded hover:bg-gray-400">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
