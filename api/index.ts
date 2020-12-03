import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import { NowRequest, NowResponse } from '@vercel/node'

const template = fs.readFileSync(path.join(__dirname, '_template', 'index.html.ejs')).toString();

const ogpURL = (title: string) => `https://blog-ogp.uzimaru.com/${title}`

module.exports = (req: NowRequest, res: NowResponse) => {
    const path = decodeURIComponent(req.url.slice(1));

    res.send(ejs.render(template, { description: "", title: "", ogp: ogpURL(path) }))
}
