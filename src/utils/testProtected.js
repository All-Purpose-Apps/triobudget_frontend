import axios from 'axios';

const testProtected = async () => {
  try {
    const response = await axios.get('http://localhost:3000/protected-route', {
      headers: {
        Authorization: `${localStorage.getItem('token')}`,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default testProtected;
