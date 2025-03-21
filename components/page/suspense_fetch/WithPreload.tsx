import fetcher from '@/utils/fetcher'
import useSWR, { preload } from 'swr'

preload('/api/sample/1', fetcher)
preload('/api/sample/2', fetcher)
preload('/api/sample/3', fetcher)
preload('/api/sample/4', fetcher)
preload('/api/sample/5', fetcher)
preload('/api/sample/6', fetcher)

export default function WithPreload() {
  useSWR('/api/sample/1', fetcher, { suspense: true })
  useSWR('/api/sample/2', fetcher, { suspense: true })
  useSWR('/api/sample/3', fetcher, { suspense: true })
  useSWR('/api/sample/4', fetcher, { suspense: true })
  useSWR('/api/sample/5', fetcher, { suspense: true })
  useSWR('/api/sample/6', fetcher, { suspense: true })

  return (
    <p>レンダリング完了</p>
  )
}
