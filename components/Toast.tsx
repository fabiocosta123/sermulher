export function Toast({ message, visible }: { message: string, visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-top-4">
      <div className="bg-stone-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/10">
        <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
        <span className="text-sm font-medium tracking-wide">{message}</span>
      </div>
    </div>
  );
}