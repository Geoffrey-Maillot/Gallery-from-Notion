import dotenv from 'dotenv-flow'
dotenv.config()

import { useEffect, useState } from "react"


export const useFetchImages = () => {
  const [images, setImages] = useState([]); // list object images
  const [error, setError] = useState(null); // if error
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // number of page displayed
  const [cursor, setCursor] = useState(undefined); // id of next page (voir doc Notion pagination)
  const [hasMore, setHasMore] = useState(null); // if more data to load "True" else "False"

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Notion-Version': '2022-02-22',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type',
      'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
      'Authorization': `Bearer ${process.env.BEARER_TOKEN_NOTION}`
    },
    body: JSON.stringify({ page_size: 30, start_cursor: cursor }),
  };



  useEffect(() => {
    if (cursor === null) return
    setLoading(true)

    fetch('https://perso-proxy-server.herokuapp.com/https://api.notion.com/v1/databases/7336fc7ab28743e1975a0f2c19379d0c/query', options)
      .then(response => response.json())
      .then(response => {
        setHasMore(response.has_more)
        setCursor(response.next_cursor)
        setImages([
          ...images,
          ...response.results
        ])
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false))

  }, [page])



  return [images, error, loading, page, setPage, hasMore]
}
