import query from '../../db/index.js'

export const getAudiosDb = async () => {
  const result = await query('SELECT * FROM audios;')
  return result.rows
}
