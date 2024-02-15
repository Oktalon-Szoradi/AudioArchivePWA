import query from '../../db/index.js'

export const getAudiosDb = async () => {
  const result = await query('SELECT * FROM audios;')
  return result.rows
}

export const getAudioDb = async id => {
  const result = await query('SELECT * FROM audios WHERE aid = $1;', [id])
  return result.rows[0]
}

export const addAudioDb = async (
  name,
  description,
  timestamp,
  rating,
  audio
) => {
  const result = await query(
    `
     INSERT INTO audios
     (name, description, timestamp, rating, audio)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *;
    `,
    [name, description, timestamp, rating, audio]
  )
  return result.rows[0]
}
