import dynamic from 'next/dynamic'

const AuapwApp = dynamic(() => import('@/components/auapw-complete'), {
  ssr: false,
})

export default function Home() {
  return <AuapwApp />
}
