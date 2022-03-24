const axios = require('axios');

exports.handler = async (event, context) => {

  // Je récupère l'id de mon produit 
  const { cursor } = event.queryStringParameters;

  const options = {
    method: 'POST',
    url: 'https://api.notion.com/v1/databases/7336fc7ab28743e1975a0f2c19379d0c/query',
    headers: {
      'Accept': 'application/json',
      'Notion-Version': '2022-02-22',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.BEARER_TOKEN_NOTION}`
    },
    data: { page_size: 30, start_cursor: cursor },
  };

  const response = await axios.request(options)

  return {
    statusCode: response.status,
    body: JSON.stringify(response.data),
  };
}



