import React from 'react'

// مصفوفة وهمية لتمثيل 8 منتجات أثناء التحميل
const skeletonItems = Array.from({ length: 8 });

function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-8 lg:px-16 py-12 ">
      {/* 1. محاكاة الهيدر (العنوان والمسار) */}
      <div className="mb-10 space-y-4">
        <div className="h-6 w-50 bg-gray-200 animate-pulse rounded-full" />
        <div className="h-10 w-48 bg-gray-200 animate-pulse rounded-lg" />
      </div>

      {/* 2. شبكة المنتجات (Grid) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mt-20">
        {skeletonItems.map((_, index) => (
          <div key={index} className="flex flex-col gap-4">
            
            {/* محاكاة الصورة - مع تأثير النبض */}
            <div className="aspect-[3/4] w-full bg-gray-200 animate-pulse rounded-2xl" />
            
            {/* محاكاة النصوص (الاسم والسعر) */}
            <div className="space-y-2 px-1">
              <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded-md" />
              <div className="h-4 w-1/4 bg-gray-200 animate-pulse rounded-md" />
            </div>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loading