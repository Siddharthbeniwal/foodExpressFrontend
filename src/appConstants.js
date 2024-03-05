let env_url = 'https://foodexpressbackend-s61j.onrender.com';

if(window.location.hostname === 'localhost') {
  env_url = 'http://localhost:5000';
}

export const API_URLS = {
  SIGN_UP: `${env_url}/api/createUser`,
  LOGIN: `${env_url}/api/userLogin`,
  DISPLAY_FOOD_DATA: `${env_url}/api/displayFoodData`,
  CREATE_ORDER: `${env_url}/api/createOrder`,
  GET_MY_ORDERS: `${env_url}/api/getMyOrders`
};

export const ABOUT_US_INFO = {

  ABOUT_US_TEXT:
    `'Food Express' is a food ordering app developed by Siddharth Beniwal using MERN stack (MongoDB, Express.js, React.js, Node.js) 
    It is seamlessly integrated with Redux Toolkit for state management. It uses JWT for authentication tokens which enhances the security 
    of the system by providing a secure and efficient way to verify user identity. Additionally, it uses bcrypt to hash and store encrypted
    passwords which adds an extra layer of protection, ensuring that sensitive user data remains confidential.`,

  LOGIN_INFO_1: 'Go to top-right corner and Sign Up using email id and password and then Login with the same credentials.',

  LOGIN_INFO_2: 'Directly Login with dummy user:',

  CREDENTIAL: 'johndoe@gmail.com'
}
