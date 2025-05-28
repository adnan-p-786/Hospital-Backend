const express = require('express')
const connectDB = require('./db')
const app = express()
const port = 3000
const cors =require('cors')

app.use(cors({
  origin: ['http://localhost:5173','http://localhost:5174'],
}))
app.use(express.json())

app.use('/api/appointment',require('./Routes/AppoinmentRoute'))
app.use('/api/contact',require('./Routes/ContactRoute'))
app.use('/api/department',require('./Routes/DepartmentRoute'))
app.use('/api/doctor',require('./Routes/DoctorRoute'))
app.use('/api/user',require('./Routes/UserRoute'))
app.use('/api/images', express.static('upload/images'));



app.get('/', (req, res) => {
  res.send('Hello World!')
})

connectDB()

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
}) 