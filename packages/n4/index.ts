const LIST_PREFIX = '= '

export function transformTextToNote(text: string) {
  const [title, ...bodyArray] = text.split('\n\n')
  const body = bodyArray.join('\n\n')

  const isList = title?.startsWith(LIST_PREFIX)
  const listItems = body.split('\n')
  const list = isList ? listItems.filter(item => item !== '') : []

  return {
    title,
    body,
    list,
  }
}
