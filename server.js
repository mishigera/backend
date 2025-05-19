const app = require('./app');
const PORT = process.env.PORT || 5050;
const path = require('path');
const fs = require('fs');

app.listen(PORT, '0.0.0.0', () => {

  const folders = [
    path.join(__dirname, 'uploads'),
    path.join(__dirname, 'uploads/original'),
    path.join(__dirname, 'uploads/processed'),
  ];

  folders.forEach((folderPath) => {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      console.log(`✅ Carpeta creada: ${folderPath}`);
    }
  });


  console.log(`Servidor en puerto ${PORT}`);
});