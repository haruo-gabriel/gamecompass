import axios from 'axios';
import * as cheerio from 'cheerio';

async function get_games(): Promise<string[]> {
  try {
    let page: string = 'https://boardgamegeek.com/browse/boardgame';
    const { data } = await axios.get(page);
    const $ = cheerio.load(data);
    let games: string[] = [];
    let nextPage: number = 2;
    const MAX_PAGES: number = 5;

    $('.collection_table').find('tr').each((index, element) => {
      if (index > 0) {
        let game = $(element).find('a.primary').text().trim();
        if (game !== '') games.push(game);
      }
    });

    while (nextPage <= MAX_PAGES) {
      page = `https://boardgamegeek.com/browse/boardgame/page/${nextPage}`;
      nextPage++;
      const { data } = await axios.get(page);
      const next$ = cheerio.load(data);

      next$('.collection_table').find('tr').each((index, element) => {
        if (index > 0) {
          let game = next$(element).find('a.primary').text().trim();
          if (game !== '') games.push(game);
        }
      });
    }

    return games;

  } catch (error) {
    console.error('Error scraping the website:', error);
    return []; 
  }
}

get_games()
