'use client';

import { Suspense } from 'react';
import WithPreload from './WithPreload';
import WithoutPreload from './WithoutPreload';

export default function SuspenseFetchSamplePageContent() {
  return (
    <div>
      <h1 className='font-bold text-xl'>
        Suspense Data Fetching with SWR
      </h1>
      <p className='my-4'>
        SWRのSuspenseモードを使ったデータフェッチのサンプルです。<br />
        preloadの有無によってコンポーネントの表示速度に違いが出ることを確認しています。<br />
        コンポーネント内では6回のAPIリクエストを行い、全てのリクエストが完了するとコンポーネントが表示されます。
      </p>
      <div className='my-6'>
        <div className='flex border'>
          <div className='flex-1 border-r p-2'>
            <p className='text-center font-bold'>preloadあり</p>
          </div>
          <div className='flex-1 p-2'>
            <p className='text-center font-bold'>preloadなし</p>
          </div>
        </div>
        <div className='flex border-x border-b'>
          <div className='flex-1 border-r p-2'>
            <Suspense fallback={<p className='text-center'>リクエスト中...</p>}>
              <WithPreload />
            </Suspense>
          </div>
          <div className='flex-1 p-2'>
            <Suspense fallback={<p className='text-center'>リクエスト中...</p>}>
              <WithoutPreload />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
