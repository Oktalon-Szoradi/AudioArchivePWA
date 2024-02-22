import query from '../../db/index.js'

export const getAudiosDb = async () => {
  const result = await query('SELECT * FROM audios;')
  return result.rows
}

export const getAudioDb = async aid => {
  const result = await query('SELECT * FROM audios WHERE aid = $1;', [aid])
  return result.rows[0]
}

export const addAudioDb = async (
  name,
  description,
  timestamp,
  rating,
  audiopath,
  audiomimetype
) => {
  const result = await query(
    `
     INSERT INTO audios
     (name, description, timestamp, rating, audiopath, audiomimetype)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *;
    `,
    [name, description, timestamp, rating, audiopath, audiomimetype]
  )
  return result.rows[0]
}

export const updateAudioMetadataDb = async (aid, name, description, rating) => {
  let queryString = 'UPDATE audios SET '
  const queryValues = []
  let queryValueIndex = 1

  if (name) {
    queryString += `name = $${queryValueIndex}, `
    queryValues.push(name)
    queryValueIndex += 1
  }
  if (description) {
    queryString += `description = $${queryValueIndex}, `
    queryValues.push(description)
    queryValueIndex += 1
  }
  if (rating) {
    queryString += `rating = $${queryValueIndex}, `
    queryValues.push(rating)
    queryValueIndex += 1
  }

  queryString = queryString.slice(0, -2) // remove trailing comma and space
  queryString += ` WHERE aid = $${queryValueIndex} RETURNING *;`
  queryValues.push(aid)

  const result = await query(queryString, queryValues)
  return result.rows[0]
}

export const deleteAudioDb = async aid => {
  const result = await query('DELETE FROM audios WHERE aid = $1 RETURNING *;', [
    aid
  ])
  return result.rows[0]
}
