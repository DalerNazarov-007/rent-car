const bcrypt = require('bcrypt');

bcrypt.hash('supersecretpassword', 10).then(hash => {
  console.log('Hashed password:', hash);
});
