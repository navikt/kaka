export const ChartsWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="grid h-max w-full auto-rows-[200px] grid-cols-1 gap-6 p-6 xl:grid-cols-2 2xl:grid-cols-3">
    {children}
  </div>
);
