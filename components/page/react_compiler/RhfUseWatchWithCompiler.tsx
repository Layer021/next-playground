import { FormProvider, useForm } from 'react-hook-form';
import { CaseHeader, ResultHint } from './ComparisonCardParts';
import {
  type ProfileFormValues,
  UseWatchNameField,
} from './ReactHookFormFields';

export default function RhfUseWatchWithCompiler() {
  'use memo';

  const methods = useForm<ProfileFormValues>({
    defaultValues: { name: '' },
  });

  return (
    <article className='rounded-lg border border-emerald-200 bg-emerald-50/40 p-5'>
      <CaseHeader enabled />
      <p className='mt-2 text-xs font-semibold text-emerald-700'>FormProvider + useWatch（推奨）</p>
      <FormProvider {...methods}>
        <UseWatchNameField idPrefix='rhf-use-watch-on' />
      </FormProvider>
      <ResultHint>
        安全な構成: useWatchを使う子自身が入力変更を購読するため、親の描画が再利用されても表示値が追従します。
      </ResultHint>
    </article>
  );
}
