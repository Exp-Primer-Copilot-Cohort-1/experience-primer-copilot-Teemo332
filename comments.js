// Create web server
const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const commentsByPostId = {}

const handleEvent = (type, data) => {
  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data
    const comments = commentsByPostId[postId] || []

    comments.push({ id, content, status })
    commentsByPostId[postId] = comments
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data
    const comments = commentsByPostId[postId]
    const comment = comments.find((comment) => comment.id === id)

    comment.status = status
    comment.content = content
  }
}

app.get('/posts/:id/comments', (req, res) => {
  const { id } = req.params
  const comments = commentsByPostId[id] || []

  res.send(comments)
})

app.post('/events', (req, res) => {
  const { type, data } = req.body

  handleEvent(type, data)

  res.send({})
})

app.listen(4001, async () => {
  console.log('Listening on port 4001')

  const res = await axios.get('http://event-bus-srv:4005/events')

  for (let event of res.data) {
    console.log('Processing event:', event.type)

    handleEvent(event.type, event.data)
  }
})