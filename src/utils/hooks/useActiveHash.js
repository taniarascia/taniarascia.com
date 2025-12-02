import { useEffect, useState } from 'react'

export const useActiveHash = (itemIds = []) => {
  const [activeHash, setActiveHash] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(entry.target.id)
          }
        })
      },
      { rootMargin: `0% 0% -80% 0%` }
    )

    const elements = []

    itemIds.forEach((id) => {
      elements.push(document.getElementById(id))
    })

    elements
      .filter((element) => element)
      .forEach((element) => {
        observer.observe(element)
      })

    return () => {
      elements
        .filter((element) => element)
        .forEach((element) => {
          observer.unobserve(element)
        })
    }
  }, [itemIds])

  return { activeHash, setActiveHash }
}
