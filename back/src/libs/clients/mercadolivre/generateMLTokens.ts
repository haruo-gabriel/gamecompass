
import { readFile, writeFile } from 'fs/promises';
import { promises as fs } from 'fs';

const CLIENT_ID :string = '7280158527582249';
const CLIENT_SECRET :string = '4dGnq1oP0NJVChjA9OQzhx6EYTI2OdKW';
const REDIRECT_URI :string = 'https://roddorneles.github.io/cubosflix/';
const CODE :string = 'TG-66d6992e13fc33000185b1d5-129393625';

export let refreshToken :string = 'TG-66d699454f340d00016b3fc8-129393625';

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

    const refreshToken = await getRefreshToken();

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

async function getRefreshToken() {
    const data = await fs.readFile('./mlAccess.json', 'utf-8'); // Lê o arquivo e retorna uma string
    const json = JSON.parse(data); // Faz o parse da string JSON
    const refreshToken = json.refresh_token; // Acessa o refresh_token
    return refreshToken;
}

export async function getAccessToken() {

    const accessToken = await getRefreshToken();
    
    return accessToken;
}

getAccessToken();
// refreshMLAccessToken();