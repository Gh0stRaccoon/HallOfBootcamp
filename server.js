const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Hall Of Bootcamp API running on port ${PORT}`);
});
