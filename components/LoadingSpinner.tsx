export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-[#f5f2e9] border-t-[#d9c28f] border-r-[#d9c28f] animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-2 border-[#e8d9b1] border-opacity-40 animate-pulse"></div>
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#d9c28f] to-[#b8956a] shadow-lg shadow-[#d9c28f]/30"></div>
        <div
          className="absolute w-2 h-2 bg-[#d9c28f] rounded-full top-0 left-1/2 -translate-x-1/2 animate-spin"
          style={{ animation: "spin 3s linear infinite" }}
        ></div>
        <div
          className="absolute w-2 h-2 bg-[#b8956a] rounded-full bottom-0 right-0 animate-spin"
          style={{ animation: "spin 3s linear infinite reverse" }}
        ></div>
      </div>
      <div className="text-center">
        <p className="text-[#4a4a4a] font-semibold text-sm tracking-widest">Searching the cosmos...</p>
        <p className="text-[#8a8a8a] text-xs mt-1">Finding your perfect time</p>
      </div>
    </div>
  )
}
