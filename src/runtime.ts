import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import * as URL from 'url'

global.React = React

type Event = {
    body: string
}

type Context = {}

export const handler = async (event: Event, _: Context) => {
    const { default: app } = require(`./${process.env.ENTRY_POINT!}`)
    const body = JSON.parse(event.body)
    const query = getQuery(body.path)
    const props = {
        query,
        path: URL.parse(body.path).pathname
    }
    const markup = renderToStaticMarkup(React.createElement(app, props))
    
    return {
        statusCode: 200,
        body: markup
    }
}

const getQuery = (url: string): { [key: string]: string } => {
    const query =  URL.parse(url).query || '';

    return query.split('&')
        .map(x => x.split('=') as [string, string])
        .reduce((acc, [key, val]) => ({...acc, [key]: val}), {})
}
