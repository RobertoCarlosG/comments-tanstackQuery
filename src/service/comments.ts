export interface Comment {
  title: string
  message: string
  preview?: boolean
}

export interface CommentWithId extends Comment {
  id: string
}

const apiKey = '$2a$10$YgV6QkRilQSG44a4jQUE3.3Y.ZVnJRjqEQ9.Pds0438i6nk53g3MS'

export const getComments = async () => {
  const response = await fetch('https://api.jsonbin.io/v3/b/651618ac54105e766fbb300f', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Key': apiKey
    }
  })

  if (!response.ok) {
    throw new Error('Failed to fetch comments.')
  }

  const json = await response.json()

  return json?.record
}

// const delay = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms))

export const postComment = async (comment: Comment) => {
  const comments = await getComments()
  // await delay(3000)
  const id = crypto.randomUUID()
  const newComment = { ...comment, id }
  const commentsToSave = [...comments, newComment]

  const response = await fetch('https://api.jsonbin.io/v3/b/651618ac54105e766fbb300f', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Key': apiKey
    },
    body: JSON.stringify(commentsToSave)
  })

  if (!response.ok) {
    throw new Error('Failed to post comment.')
  }

  return newComment
}
