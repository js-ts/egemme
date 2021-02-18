import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    image: '/images/sample.jpg',
    description: 'Hello im the admin',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    image: '/images/sample.jpg',
    description: 'hello iam john',
    password: bcrypt.hashSync('123456', 10),

  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    image: '/images/sample.jpg',
    description: 'hello iam john',
    password: bcrypt.hashSync('123456', 10),

  },
]

export default users
