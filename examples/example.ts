import foxios from '../src/index';

async function runExamples() {
  try {
    console.log('=== GET Request Example ===');
    const getResponse = await foxios.get(
      'https://jsonplaceholder.typicode.com/posts',
      {
        queryParams: { _limit: 2 },
      }
    );
    console.log(getResponse.data);

    console.log('\n=== POST Request Example ===');
    const postResponse = await foxios.post(
      'https://jsonplaceholder.typicode.com/posts',
      {
        title: 'New Post',
        body: 'This is a test post.',
        userId: 1,
      }
    );
    console.log(postResponse.data);

    console.log('\n=== PUT Request Example ===');
    const putResponse = await foxios.put(
      'https://jsonplaceholder.typicode.com/posts/1',
      {
        title: 'Updated Post',
        body: 'Updated content.',
        userId: 1,
      }
    );
    console.log(putResponse.data);

    console.log('\n=== DELETE Request Example ===');
    const deleteResponse = await foxios.delete(
      'https://jsonplaceholder.typicode.com/posts/1'
    );
    console.log(`Deleted with status ${deleteResponse.status}`);
  } catch (error) {
    console.error('Error during Foxios requests:', error);
  }
}

runExamples();
