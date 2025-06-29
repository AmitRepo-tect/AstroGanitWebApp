const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 80;

//app.use(express.static(path.join(__dirname, 'dist/astroganit/browser')));
app.use(express.static(path.join(__dirname)));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
});