# @uzimaru0000/meta-ssr

SSR Runtime for vercel

## How to use

vercel.json

```json
{
  "functions": {
    "api/**/*.tsx": {
      "runtime": "@uzimaru0000/meta-ssr@1.1.1"
    }
  },
  "rewrite": [
    {
      "source": "/(.*)",
      "destination": "/api/$1"
    }
  ]
}
```
