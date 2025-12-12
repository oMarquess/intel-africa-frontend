'use client';

export function BannerDivider() {
  return (
    <div className="fixed top-[40px] left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div 
        className="h-[2px] bg-gradient-to-r from-transparent via-gray-300 to-transparent"
        style={{
          width: '60%',
          borderRadius: '9999px'
        }}
      />
    </div>
  );
}
