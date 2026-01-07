const app = require('./app');
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => { 
  console.log(`le server est lance sur , http://localhost:${PORT}`);
});