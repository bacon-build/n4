import { createFileRoute } from '@tanstack/react-router'
import { transformTextToNote } from '@bacondotbuild/n4'
import { transformTextToNote as transformTextToNotePublished } from '@bacondotbuild/n4-published'

import Textarea from '@/components/textarea'
import useTextarea from '@/lib/useTextarea'

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

const DEFAULT_TEXT = 'title\n\nhello world'
function Test() {
  const textarea = useTextarea({ initialText: DEFAULT_TEXT })
  const { text } = textarea
  const localNote = transformTextToNote_local(text)
  const packageNote = transformTextToNote(text)
  const publishedNote = transformTextToNotePublished(text)
  return (
    <main className='flex grow flex-col gap-4 p-4'>
      <h1>testing transform locally, from package, and published</h1>
      <Textarea {...textarea} />
      <div className='flex flex-col gap-4'>
        <section className='flex flex-col'>
          <h2>local</h2>
          <pre>{JSON.stringify(localNote, null, 2)}</pre>
        </section>
        <section className='flex flex-col'>
          <h2>package</h2>
          <pre>{JSON.stringify(packageNote, null, 2)}</pre>
        </section>
        <section className='flex flex-col'>
          <h2>published</h2>
          <pre>{JSON.stringify(publishedNote, null, 2)}</pre>
        </section>
      </div>
    </main>
  )
}
