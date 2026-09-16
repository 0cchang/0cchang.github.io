import http from 'node:http'
import crypto from 'node:crypto'
import process from 'node:process'
import { URL, URLSearchParams } from 'node:url'

const port = 8888
const redirectUri = `http://127.0.0.1:${port}/callback`
const { SPOTIFY_CLIENT_ID: clientId, SPOTIFY_CLIENT_SECRET: clientSecret } = process.env

if (!clientId || !clientSecret) {
  console.error('Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET before running this script.')
  process.exit(1)
}

const state = crypto.randomBytes(16).toString('hex')
const authorizationUrl = new URL('https://accounts.spotify.com/authorize')
authorizationUrl.search = new URLSearchParams({
  client_id: clientId,
  response_type: 'code',
  redirect_uri: redirectUri,
  state,
  scope: 'user-read-currently-playing user-top-read user-read-recently-played',
}).toString()

const server = http.createServer(async (request, response) => {
  const callbackUrl = new URL(request.url, redirectUri)
  if (callbackUrl.pathname !== '/callback') {
    response.writeHead(404)
    response.end('Not found')
    return
  }

  if (callbackUrl.searchParams.get('state') !== state) {
    response.writeHead(400)
    response.end('Invalid OAuth state.')
    server.close()
    return
  }

  const code = callbackUrl.searchParams.get('code')
  if (!code) {
    response.writeHead(400)
    response.end('Spotify did not return an authorization code.')
    server.close()
    return
  }

  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  })

  if (!tokenResponse.ok) {
    response.writeHead(502)
    response.end(`Spotify token exchange failed with status ${tokenResponse.status}.`)
    server.close()
    return
  }

  const token = await tokenResponse.json()
  response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
  response.end('Spotify connected. You can close this tab and return to your terminal.')
  console.log(`\nSPOTIFY_REFRESH_TOKEN=${token.refresh_token}\n`)
  server.close()
})

server.listen(port, '127.0.0.1', () => {
  console.log(`Open this URL in your browser:\n\n${authorizationUrl}\n`)
})
