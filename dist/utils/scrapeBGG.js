var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import * as cheerio from 'cheerio';
function get_games() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let page = 'https://boardgamegeek.com/browse/boardgame';
            const { data } = yield axios.get(page);
            const $ = cheerio.load(data);
            let games = [];
            let nextPage = 2;
            const MAX_PAGES = 5;
            $('.collection_table').find('tr').each((index, element) => {
                if (index > 0) {
                    let game = $(element).find('a.primary').text().trim();
                    if (game !== '')
                        games.push(game);
                }
            });
            while (nextPage <= MAX_PAGES) {
                page = 'https://boardgamegeek.com/browse/boardgame/page/' + nextPage;
                nextPage++;
                const { data } = yield axios.get(page);
                const $ = cheerio.load(data);
                $('.collection_table').find('tr').each((index, element) => {
                    if (index > 0) {
                        let game = $(element).find('.collection_objectname').text().trim();
                        games.push(game);
                    }
                });
            }
            console.log(games);
        }
        catch (error) {
            console.error('Error scraping the website:', error);
        }
    });
}
get_games();
