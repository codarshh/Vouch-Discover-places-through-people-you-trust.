export default function Landing() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to FriendPlace</h1>
      <p className="text-gray-600 mb-8">Discover places your friends actually like.</p>
      <div className="flex gap-4">
        <a href="/login" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Login</a>
        <a href="/register" className="px-6 py-2 bg-gray-200 text-gray-900 rounded-md hover:bg-gray-300">Register</a>
      </div>
    </div>
  );
}
