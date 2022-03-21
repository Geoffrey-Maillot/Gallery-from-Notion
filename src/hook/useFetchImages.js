import { useEffect, useState } from "react"

export const useFetchImages = () => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1)

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },

  };
  useEffect(() => {
    setLoading(true)

    fetch(`https://picsum.photos/v2/list?page=${page}&limit=30`, options)
      .then(response => response.json())
      .then(response => {
        setImages([
          ...images,
          ...response
        ])
      })
      .catch(err => {
        setError(error)
        console.log(error)
      }).finally(() => setLoading(false));
  }, [page])



  return [images, error, loading, page, setPage]
}
