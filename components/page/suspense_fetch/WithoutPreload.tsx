import fetcher from '@/utils/fetcher'
import useSWR from 'swr'

export default function WithoutPreload() {
  useSWR('/api/sample/1?withoutPreload=true', fetcher, { suspense: true })
  useSWR('/api/sample/2?withoutPreload=true', fetcher, { suspense: true })
  useSWR('/api/sample/3?withoutPreload=true', fetcher, { suspense: true })
  useSWR('/api/sample/4?withoutPreload=true', fetcher, { suspense: true })
  useSWR('/api/sample/5?withoutPreload=true', fetcher, { suspense: true })
  useSWR('/api/sample/6?withoutPreload=true', fetcher, { suspense: true })

  return (
    <p>レンダリング完了</p>
  )
}
