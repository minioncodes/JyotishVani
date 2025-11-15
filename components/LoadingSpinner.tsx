export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative w-16 h-16">
        
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-4 border-[#ffe5e5] border-t-[#d46a6a] border-r-[#d46a6a] animate-spin"></div>
        
        {/* Middle soft ring */}
        <div className="absolute inset-2 rounded-full border-2 border-[#e4b1b1] border-opacity-60 animate-pulse"></div>
        
        {/* Inner core */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#d46a6a] to-[#7a1717] shadow-lg shadow-[#d46a6a]/40"></div>

        {/* Orbiting dots */}
        <div
          className="absolute w-2 h-2 bg-[#d46a6a] rounded-full top-0 left-1/2 -translate-x-1/2 animate-spin"
          style={{ animation: "spin 3s linear infinite" }}
        ></div>
        <div
          className="absolute w-2 h-2 bg-[#7a1717] rounded-full bottom-0 right-0 animate-spin"
          style={{ animation: "spin 3s linear infinite reverse" }}
        ></div>

      </div>

      <div className="text-center">
        <p className="text-[#7a1717] font-semibold text-sm tracking-widest">
          Searching the cosmos...
        </p>
        <p className="text-[#b85c5c] text-xs mt-1">Finding your perfect time</p>
      </div>
    </div>
  );
}
