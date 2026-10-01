import { createFileRoute } from '@tanstack/react-router'
import { transformTextToNote } from 'n4'

export const Route = createFileRoute('/test')({ component: Test })

const LIST_PREFIX = '= '

function transformTextToNote_local(text: string) {
  const [title, ...bodyArray] = text.split('\n\n')
  const body = bodyArray.join('\n\n')

  const isList = title.startsWith(LIST_PREFIX)
  const listItems = body.split('\n')
  const list = isList ? listItems.filter(item => item !== '') : []

  return {
    title,
    body,
    list,
  }
}

function Test() {
  const text = 'title\n\nhello world'
  const localNote = transformTextToNote_local(text)
  const packageNote = transformTextToNote(text)
  return (
    <main className='flex grow flex-col gap-4 p-4'>
      <h1>testing transform locally and from package</h1>
      <div className='flex flex-col gap-4'>
        <section className='flexflex-col'>
          <h2>local</h2>
          <pre>{JSON.stringify(localNote, null, 2)}</pre>
        </section>
        <section className='flexflex-col'>
          <h2>package</h2>
          <pre>{JSON.stringify(packageNote, null, 2)}</pre>
        </section>
      </div>
    </main>
  )
}
