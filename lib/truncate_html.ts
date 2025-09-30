import truncate from 'html-truncate'

export function truncateHtml(html: string, maxLength: number) {
  return truncate(html, maxLength, { ellipsis: "..." });
}
