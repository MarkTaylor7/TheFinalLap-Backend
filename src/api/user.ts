import { Router, type Request, type Response } from 'express'
import { error, success } from '../utils/rest'
import { type User, validateUser } from '../models'

const router = Router()

const DEMO_USERS: User[] = []

DEMO_USERS.push({
  id: 12345,
  name: 'John Doe',
  email: 'john@doe.com'
})

router.post('/', (req: Request, res: Response) => {
  const user = validateUser(req.body)
  if (user === null) {
    return res.status(400).json(error('User data is not formatted correctly'))
  }

  if ('id' in user) {
    return res.status(400).json(error('User ID will be generated automatically'))
  }

  const id = Math.floor(Math.random() * 1000000)

  const createdUser = {
    ...user,
    id
  }
  DEMO_USERS.push(createdUser)

  return res.status(200).json(success(createdUser))
})

router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  if (Number.isNaN(id)) {
    return res.status(400).json(error('Invalid user ID'))
  }

  const user = DEMO_USERS.find(u => u.id === id)
  if (user === undefined) {
    return res.status(404).json(error('User not found'))
  }

  return res.status(200).json(success(user))
})

router.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  if (Number.isNaN(id)) {
    return res.status(400).json(error('Invalid user ID'))
  }

  const newUser = validateUser(req.body)
  if (newUser === null) {
    return res.status(400).json(error('User data is not formatted correctly'))
  }

  const selectedUser = DEMO_USERS.find(u => u.id === id)
  if (selectedUser === undefined) {
    return res.status(404).json(error('User not found'))
  }

  selectedUser.name = newUser.name
  selectedUser.email = newUser.email

  return res.status(201).send()
})

router.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  if (Number.isNaN(id)) {
    return res.status(400).json(error('Invalid user ID'))
  }

  const index = DEMO_USERS.findIndex(u => u.id === id)
  if (index === -1) {
    return res.status(404).json(error('User not found'))
  }

  DEMO_USERS.splice(index, 1)

  return res.status(200).json(success('User deleted successfully'))
})

/**
 * Exercise:
 * 1. Implement PUT /api/user/:id
 *  - Put user should update the properties of an existing user given an ID, and the properties to update.
 *  - The body of the request will effectively be the same as the post, but instead of creating a new user, you
 *    should find the user that matches the given ID and update the properties of that user.
 *  - Be sure to validate the body of the request to ensure that the user data is formatted correctly.
 *  - Check your implementation by using postman to send a PUT request to http://localhost:3000/api/user/{{some_id}}
 *
 * 2. Implement DELETE /api/user/:id
 *  - Delete user should delete the user with the given ID.
 *  - Check your implementation by using postman to send a DELETE request to http://localhost:3000/api/user/{{some_id}}
 */

export default router
