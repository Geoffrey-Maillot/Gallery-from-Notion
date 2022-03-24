import dotenv from 'dotenv-flow'
dotenv.config()

import { useEffect, useState } from "react"
import axios from 'axios'


export const useFetchImages = () => {
  const [images, setImages] = useState([]); // list object images
  const [error, setError] = useState(null); // if error
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // number of page displayed
  const [cursor, setCursor] = useState(undefined); // id of next page (voir doc Notion pagination)
  const [hasMore, setHasMore] = useState(null); // if more data to load "True" else "False"


  useEffect(() => {
    // Si je n'ai plus de page à charger ne rien faire
    if (cursor === null) return
    setLoading(true)

    axios('/.netlify/functions/fetchImages', {
      params: {
        cursor: cursor,
      }
    })
      .then(({ data }) => {
        setHasMore(data.has_more)
        setCursor(data.next_cursor)
        setImages([
          ...images,
          ...data.results
        ])
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false))

  }, [page])

  return [images, error, loading, page, setPage, hasMore]
}
