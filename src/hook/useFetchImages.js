import dotenv from 'dotenv-flow'
dotenv.config()

import { useEffect, useState } from "react"


export const useFetchImages = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1)
  const [cursor, setCursor] = useState(undefined)

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
    //mode: 'no-cors',
  };



  useEffect(() => {
    if (cursor === null) return
    setLoading(true)

    fetch('https://perso-proxy-server.herokuapp.com/https://api.notion.com/v1/databases/5dd792fe453a4f4cb45ecf1130fb60fd/query', options)
      .then(response => response.json())
      .then(response => {
        setCursor(response.next_cursor)
        setImages([
          ...images,
          ...response.results
        ])
      })
      .catch(err => setError(err))
      .finally(() => setLoading(false))

  }, [page])



  return [images, error, loading, page, setPage]
}
