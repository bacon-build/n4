import { renderHtml } from '@tanstack/markdown/html'

const LIST_PREFIX = '= '
const MARKDOWN_PREFIX = '# '

export function transformTextToNote(text: string) {
  const [title, ...bodyArray] = text.split('\n\n')
  const body = bodyArray.join('\n\n')

  const isList = title.startsWith(LIST_PREFIX)
  const listItems = body.split('\n')
  const list = isList ? listItems.filter(item => item !== '') : []

  const isMarkdown = title?.startsWith(MARKDOWN_PREFIX)
  const markdown = isMarkdown ? renderHtml(text) : null

  return {
    title,
    body,
    list,
    markdown,
  }
}
