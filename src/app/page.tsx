export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Snappdraft</h1>
        <p className="text-lg text-gray-600 mb-8">Streamline electrical estimating with conversational workflows. Add clients, gather project details, and generate proposals effortlessly.</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          Get Started – Add a Project
        </button>
        <p className="text-sm text-gray-500 mt-4">Responsive on any device – Desktop, tablet, or mobile.</p>
      </div>
    </main>
  );
}
