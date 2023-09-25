import dotenv from 'dotenv'
dotenv.config()

const configObj = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  PAGE_SIZE: 10
}


export default {
  ...configObj
}