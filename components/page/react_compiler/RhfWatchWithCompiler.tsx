import { FormProvider, useForm } from 'react-hook-form';
import { CaseHeader, ResultHint } from './ComparisonCardParts';
import {
  type ProfileFormValues,
  WatchNameField,
} from './ReactHookFormFields';

export default function RhfWatchWithCompiler() {
  'use memo';

  const methods = useForm<ProfileFormValues>({
    defaultValues: { name: '' },
  });

  return (
    <article className='rounded-lg border border-rose-200 bg-rose-50/40 p-5'>
      <CaseHeader enabled />
      <p className='mt-2 text-xs font-semibold text-rose-700'>FormProvider + watch</p>
      <FormProvider {...methods}>
        <WatchNameField idPrefix='rhf-watch-on' />
      </FormProvider>
      <ResultHint>
        注意: 入力欄は変わっても表示値が追従しない場合、FormProviderを描画する親のキャッシュとwatchの更新方式が噛み合っていません。
      </ResultHint>
    </article>
  );
}
