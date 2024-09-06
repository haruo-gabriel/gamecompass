import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';

async function fetchBGGData() {
  try {
    const response = await fetch('https://boardgamegeek.com/xmlapi2/thing?id=174430'); 
    if (!response.ok) {
      throw new Error(`Erro: ${response.status}`);
    }

    const xmlText = await response.text();
    const result = await parseStringPromise(xmlText);

    console.log(result);

    const game = result.items.item[0];
    console.dir(game, { depth: null });

  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
}
fetchBGGData();
