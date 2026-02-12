// server.js 
const app = require('./app'); 

const PORT = process.env.PORT || 3001; 

const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); 
  console.log(`API available at http://localhost:${PORT}/api/bookings`); 
}); 


//Handle server errors gracefully 
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`PORT: ${PORT} is already in use. Please stop the other process or use a different port.`); 
    console.error(`Tip: Run 'lsof -ti:${PORT} | xargs kill -9' to kill the process using ${PORT}`); 
    process.exit(1); 
  } else {
    console.error('Server error:', err); 
    process.exit(1); 
  }
}); 