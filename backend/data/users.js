import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    username:'Vedant',
    image: '/images/sample.jpg',
    description: 'Hello im the admin',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
    isSeller:false
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    username:'John',
    image: '/images/sample.jpg',
    description: 'hello iam john',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    isSeller:true
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    username:'Jane',
    image: '/images/sample.jpg',
    description: 'hello iam john',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
    isSeller:false


  },
]

export default users
