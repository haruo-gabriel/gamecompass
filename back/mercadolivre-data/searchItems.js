import { getAccessToken } from "./generateMLTokens.js";

export async function searchItems(itemName) {

    const accessToken = getAccessToken();

    const baseUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${itemName}&limit=3&category=MLB6883`;

    const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const data = await response.json();

    console.log(data);

}

// searchItems('Motorola%20G6');
searchItems('Quartz');
