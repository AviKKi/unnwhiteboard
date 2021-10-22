import repl from 'repl'

import connectDB from './config/database'
import Company from './models/Company'
import JobPost from './models/JobPost'

connectDB().then(() => {
    const db = {
        Company, JobPost
    }

    const r = repl.start("> ")
    r.context.db = db
}).catch(err => { console.error(err); process.exit(1); })
