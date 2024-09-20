document.getElementById('searchButton').addEventListener('click', async () => {
  const tag = document.getElementById('tagInput').value;
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // Clear previous results

  // Create an Elasticsearch client
  const { Client } = require('@elastic/elasticsearch');
  const client = new Client({ node: 'http://localhost:9200' });

  try {
      // Example of a search request
      const { body } = await client.search({
          index: 'data',
          body: {
              query: {
                  match: { your_field: tag } // Replace 'your_field' with the actual field name
              }
          }
      });

      const hits = body.hits.hits;

      if (hits.length > 0) {
          hits.forEach(hit => {
              const img = document.createElement('img');
              img.src = hit._source.image_url; // Adjust this based on your field name
              resultsDiv.appendChild(img);
          });
      } else {
          resultsDiv.innerHTML = '<p>No images found.</p>';
      }
  } catch (error) {
      console.error('Error fetching data:', error);
      resultsDiv.innerHTML = '<p>Error fetching images.</p>';
  }
});
