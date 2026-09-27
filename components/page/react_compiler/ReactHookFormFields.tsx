'use client';

import { useFormContext, useWatch } from 'react-hook-form';

export type ProfileFormValues = {
  name: string;
};

function FormContent({
  idPrefix,
  value,
}: {
  idPrefix: string;
  value: string;
}) {
  const { register, reset } = useFormContext<ProfileFormValues>();
  const inputId = `${idPrefix}-name`;

  return (
    <div className='mt-4 rounded-md border border-slate-200 bg-white p-3'>
      <label htmlFor={inputId} className='block text-xs font-semibold text-slate-700'>
        担当者名
      </label>
      <input
        id={inputId}
        data-testid={`${idPrefix}-input`}
        className='mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
        placeholder='名前を入力'
        {...register('name')}
      />
      <p className='mt-3 text-xs text-slate-500'>Reactが認識している入力値</p>
      <output
        data-testid={`${idPrefix}-value`}
        className='mt-1 block min-h-6 rounded bg-slate-50 px-2 py-1 font-mono text-sm font-semibold text-slate-900'
      >
        {value || '未入力'}
      </output>
      <button
        type='button'
        className='mt-3 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50'
        onClick={() => reset({ name: '' })}
      >
        入力をリセット
      </button>
    </div>
  );
}

export function WatchNameField({ idPrefix }: { idPrefix: string }) {
  const { watch } = useFormContext<ProfileFormValues>();
  const name = watch('name');

  return <FormContent idPrefix={idPrefix} value={name} />;
}

export function UseWatchNameField({ idPrefix }: { idPrefix: string }) {
  const { control } = useFormContext<ProfileFormValues>();
  const name = useWatch({ control, name: 'name' });

  return <FormContent idPrefix={idPrefix} value={name} />;
}
