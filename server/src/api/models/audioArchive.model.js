import query from '../../db/index.js'

export const getAudiosDb = async () => {
  const result = await query('SELECT * FROM audios;')
  return result.rows
}

export const getAudioDb = async id => {
  const result = await query('SELECT * FROM audios WHERE aid = $1;', [id])
  return result.rows[0]
}
