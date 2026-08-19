import React from "react";

export default function ServiceDetailsSkeleton() {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden animate-pulse space-y-8">
      {/* ================= Hero Section ================= */}

      <div className="grid lg:grid-cols-2 gap-6 p-6">
        {/* Left Image */}

        <div className="space-y-4">
          <div className="h-[50vh] rounded-2xl bg-gray-200" />

          <div className="flex gap-3 overflow-hidden">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="w-28 h-28 rounded-xl bg-gray-200" />
            ))}
          </div>
        </div>

        {/* Right Details */}

        <div className="space-y-6">
          {/* Heading */}

          <div className="flex justify-between">
            <div className="space-y-3">
              <div className="w-60 h-8 bg-gray-200 rounded" />
              <div className="w-28 h-5 bg-gray-200 rounded" />
            </div>

            <div className="w-24 h-8 bg-gray-200 rounded" />
          </div>

          {/* Badges */}

          <div className="flex flex-wrap gap-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="w-28 h-10 rounded-xl bg-gray-200" />
            ))}
          </div>

          {/* Highlights */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="rounded-2xl border p-4 space-y-3">
                <div className="w-10 h-10 rounded-full bg-gray-200 mx-auto" />
                <div className="w-16 h-4 bg-gray-200 rounded mx-auto" />
                <div className="w-12 h-5 bg-gray-200 rounded mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= Service Information ================= */}

      <div className="mx-8 border rounded-2xl p-6">
        <div className="w-60 h-8 bg-gray-200 rounded mb-8" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <div key={item} className="flex gap-4">
              <div className="w-14 h-14 rounded-xl bg-gray-200" />

              <div className="space-y-2">
                <div className="w-20 h-4 bg-gray-200 rounded" />

                <div className="w-24 h-5 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= Inclusion / Exclusion ================= */}

      <div className="grid lg:grid-cols-3 gap-6 px-8">
        {[1, 2, 3].map((card) => (
          <div key={card} className="rounded-3xl border p-6 space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-200" />

              <div className="space-y-2">
                <div className="w-36 h-6 bg-gray-200 rounded" />

                <div className="w-20 h-4 bg-gray-200 rounded" />
              </div>
            </div>

            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-gray-200 mt-1" />

                <div className="w-full h-5 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ================= Store & Executive ================= */}

      <div className="grid md:grid-cols-2 gap-6 p-8">
        {[1, 2].map((card) => (
          <div key={card} className="rounded-3xl border p-6">
            <div className="flex gap-5">
              <div className="w-24 h-24 rounded-full bg-gray-200" />

              <div className="flex-1 space-y-3">
                <div className="w-44 h-7 bg-gray-200 rounded" />

                <div className="w-28 h-5 bg-gray-200 rounded" />

                <div className="w-36 h-4 bg-gray-200 rounded" />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="w-full h-5 bg-gray-200 rounded" />

              <div className="w-full h-5 bg-gray-200 rounded" />

              <div className="w-2/3 h-5 bg-gray-200 rounded" />
            </div>

            <div className="mt-8 h-12 rounded-xl bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
