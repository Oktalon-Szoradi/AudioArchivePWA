import pg from 'pg'

const pool = new pg.Pool()

const query = (text, params) => pool.query(text, params)

export default query
