import React, { useState } from "react";

const LoadingUI = (WrappedComponent) => {
  return function WithLoadingComponent(props) {
    const [loading, setLoading] = useState(false);

    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    return (
      <>
        {loading && (
          <div className="fixed inset-0 bg-white z-[9999] overflow-hidden">
            <div className="animate-pulse">
              {/* Header */}
              <div className="h-16 border-b border-gray-100 px-6 flex items-center justify-between">
                <div className="h-8 w-36 rounded-md shimmer"></div>

                <div className="flex gap-4">
                  <div className="h-8 w-8 rounded-full shimmer"></div>
                  <div className="h-8 w-8 rounded-full shimmer"></div>
                </div>
              </div>

              {/* Hero */}
              <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="grid lg:grid-cols-2 gap-10">
                  {/* Left */}
                  <div>
                    <div className="h-10 w-3/4 rounded shimmer mb-4"></div>
                    <div className="h-5 w-2/3 rounded shimmer mb-8"></div>

                    <div className="space-y-4">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-20 rounded-xl shimmer" />
                      ))}
                    </div>
                  </div>

                  {/* Right */}
                  <div className="h-[380px] rounded-2xl shimmer"></div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden">
                      <div className="h-44 shimmer"></div>
                      <div className="p-4">
                        <div className="h-5 w-3/4 shimmer rounded mb-3"></div>
                        <div className="h-4 w-1/2 shimmer rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <WrappedComponent
          {...props}
          startLoading={startLoading}
          stopLoading={stopLoading}
        />
      </>
    );
  };
};

export default LoadingUI;
