import App from './App';

const port = parseInt(process.env.PORT as string, 10) || 3001;

const starter = new App()
  .start(port)
  .then(() => console.log(`Running on port ${port}`))
  .catch((error) => {
    console.log(error);
  });
export default starter;
