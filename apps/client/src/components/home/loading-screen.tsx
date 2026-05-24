const LoadingScreen = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f7f8]">
      <div className="flex flex-col items-center gap-6">
        <div className="h-12 w-12 animate-spin border-2 border-[#d1d5db] border-t-[#09090b]" />

        <div className="text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#6b7280]">
            Loading CMS Content
          </p>

          <h2 className="mt-3 text-lg font-medium tracking-tight text-[#09090b]">
            Initializing Approval Platform
          </h2>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
