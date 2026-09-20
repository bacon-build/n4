import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <main className='flex grow flex-col p-4'>
      <h1>n4</h1>
    </main>
  )
}
