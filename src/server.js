import app from './app';

const port = process.env.PORT || 4444;
app.listen(port, () => {
  console.log('server running on port:', port);
});
