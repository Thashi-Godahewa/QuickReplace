import { useEffect } from 'react'

// Sets the browser tab title for each page (helps SEO and history)
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = `${title} | Quick Replace`
  }, [title])
}
