export function LoadingSpinner() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen ">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
        <p className="text-sm">Loading quiz data...</p>
      </div>
    )
  }
  
  