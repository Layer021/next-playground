export function Metric({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className='rounded-md border border-slate-200 bg-white p-3'>
      <dt className='text-xs text-slate-500'>{label}</dt>
      <dd className='mt-1 font-mono text-xl font-semibold text-slate-900'>{children}</dd>
    </div>
  );
}

export function CaseHeader({ enabled }: { enabled: boolean }) {
  return (
    <div className='flex items-center justify-between gap-3'>
      <h3 className='font-semibold text-slate-900'>
        React Compiler {enabled ? 'あり' : 'なし'}
      </h3>
      <span
        className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
          enabled
            ? 'bg-emerald-100 text-emerald-700'
            : 'bg-amber-100 text-amber-700'
        }`}
      >
        {enabled ? 'ON' : 'OFF'}
      </span>
    </div>
  );
}

export function ResetButton({ onReset }: { onReset: () => void }) {
  return (
    <button
      type='button'
      className='rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2'
      onClick={onReset}
    >
      計測をリセット
    </button>
  );
}

export function ResultHint({ children }: { children: React.ReactNode }) {
  return (
    <p className='mt-3 rounded-md border border-dashed border-slate-300 bg-white/70 px-3 py-2 text-xs leading-5 text-slate-600'>
      {children}
    </p>
  );
}
