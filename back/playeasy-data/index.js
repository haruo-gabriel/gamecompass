
import { load } from "cheerio";
import axios from "axios";
import { saveFile } from "../utils/save-file.js";

function formatPrice(price) {
    const matches = price.match(/[0-9]+,[0-9]+/g);

    if (matches && matches.length !== 0) {
        const formatedPrice = Number(matches[0].replace(',', '.'));
        return formatedPrice;
    }

}

export const getBoardgameInPlayeasy = async (bggName) => {

    try {
        const request = await axios.get(`https://www.playeasy.com.br/catalogsearch/result/?q=${bggName}`);

        const htmlContent = request.data;

        // saveFile('bgg-search.html', htmlContent);]

        const $ = load(htmlContent);

        const $firstProduct = $('section.category-products li:nth-child(1)');

        if (!$firstProduct) {
            return (null);
        }

        const avaiable = $firstProduct.find('.infobox .availability span').text() === 'Indisponível' ? false : true;

        if (!avaiable) {
            return null;
        }

        const price = formatPrice($firstProduct.find('.price:first').text());
        const link = $firstProduct.find('.product-image-wrapper a').attr('href');

        const boardgame = {
            name: bggName,
            price,
            link,
            avaiable
        }
        console.log(boardgame);
        return boardgame;

    }
    catch (error) {
        console.log(error);
    }
}

const bggName = 'quartz';

playEasyDatas(bggName);

