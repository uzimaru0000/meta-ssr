export default ({ query, path }) => {
    return <html>
        <head>
            <title>hoge</title>
            <script src="./index.js"></script>
        </head>
        <body>
            <h1>{query.message || 'Hello'}</h1>
        </body>
    </html>
}