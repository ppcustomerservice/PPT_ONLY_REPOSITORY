export default function PropertyPageSkeleton() {
    return (
      <div className="animate-pulse space-y-4 p-4">
        <div className="h-16 bg-gray-200 rounded"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
        <div className="grid grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }