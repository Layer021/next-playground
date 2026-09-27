import { FormProvider, useForm } from 'react-hook-form';
import { CaseHeader, ResultHint } from './ComparisonCardParts';
import {
  type ProfileFormValues,
  WatchNameField,
} from './ReactHookFormFields';

export default function RhfWatchWithoutCompiler() {
  'use no memo';

  const methods = useForm<ProfileFormValues>({
    defaultValues: { name: '' },
  });

  return (
    <article className='rounded-lg border border-amber-200 bg-amber-50/40 p-5'>
      <CaseHeader enabled={false} />
      <p className='mt-2 text-xs font-semibold text-amber-700'>FormProvider + watch</p>
      <FormProvider {...methods}>
        <WatchNameField idPrefix='rhf-watch-off' />
      </FormProvider>
      <ResultHint>
        比較結果: 親が毎回FormProviderを描画するため、watchで取得した入力値も画面へ反映されます。
      </ResultHint>
    </article>
  );
}
