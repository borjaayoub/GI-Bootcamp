import axios from 'axios';

export function fetchPosts(){
  return axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.data)
    .catch(error => {
      console.error('Error fetching posts:', error);
      throw error;
    });
}

export default { fetchPosts };