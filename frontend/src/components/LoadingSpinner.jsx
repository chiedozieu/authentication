
const LoadingSpinner = () => {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 flex items-center relative overflow-hidden justify-center">
        <div className="animate-spin rounded-full size-10 border-t-2 border-b-2 border-green-200 border-t-green-500"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
