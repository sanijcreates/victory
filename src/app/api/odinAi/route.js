const fetch = require('node-fetch');

export async function GET(request) {
  const user_id = '6799b7d8-a857-4783-98bd-136e38b3621';
  const user_input = 'What can i do to lose 10kgs in a month?';
  const url = `https://api.tryterra.co/v2/chat/odingpt?user_id=${user_id}&user_input=${user_input}`; // Replace with your API URL

  const headers = {
    'dev-id': 'teamvictory-testing-MVNMTVakEO',
    'api-key': 'P9cNY2JqfTZkwn-xVv3Y6CSVyC1BwFY2', 
  };

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      // Process the data as needed
    } else {
      console.error('Request failed with status:', response.status);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Call the fetchData function to make the request
fetchData();