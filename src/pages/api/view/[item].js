export default function handler(req, res) {
    const id = req.query.id.split('-', 1)
    if (id.length != 2) {
        res.status(400).json({ error: 'Invalid ID' })
        return
    }
    if (id[0] == 'blog') {
        res.status(200).json({ name: 'John Doe' })
    } else if (id[0] == 'project') {
        res.status(200).json({ name: 'John Doe' })
    } else {
        res.status(400).json({ error: 'Invalid ID' })
        return
    }
    // Used to track views for analytics
    console.info('viewEvent', req.ip, id[0], id[1])
  }