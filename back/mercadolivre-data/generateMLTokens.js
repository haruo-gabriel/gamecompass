
import { readFile, writeFile } from 'fs/promises';

const CLIENT_ID = '7280158527582249';
const CLIENT_SECRET = '4dGnq1oP0NJVChjA9OQzhx6EYTI2OdKW';
const REDIRECT_URI = 'https://roddorneles.github.io/cubosflix/';
const CODE = 'TG-66d6992e13fc33000185b1d5-129393625';

export let refreshToken = 'TG-66d699454f340d00016b3fc8-129393625';

// https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=7280158527582249&redirect_uri=https://roddorneles.github.io/cubosflix/

export async function transformCodeToAccessToken() {

    const baseUrlForToken = `https://api.mercadolibre.com/oauth/token`;

    const response = await fetch(baseUrlForToken, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code: CODE,
            redirect_uri: REDIRECT_URI
        })
    });

    const data = await response.json();
    console.log(data);

    refreshToken = data.refresh_token;

    console.log('oi');
}

export async function refreshMLAccessToken() {

    const refreshToken = JSON.parse(await readFile('./mlAccess.json')).refresh_token;

    const baseUrl = `https://api.mercadolibre.com/oauth/token`;

    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            refresh_token: refreshToken
        })
    });

    const data = await response.json();
    console.log(data);

    await writeFile('./mlAccess.json', JSON.stringify(data, null, 2));
}

export async function getAccessToken() {

    const accessToken = JSON.parse(await readFile('./mlAccess.json')).access_token;

    return accessToken;
}

getAccessToken();
// refreshMLAccessToken();