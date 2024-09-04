var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fetch from 'node-fetch';
import { parseStringPromise } from 'xml2js';
function fetchBGGData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://boardgamegeek.com/xmlapi2/thing?id=174430');
            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }
            const xmlText = yield response.text();
            const result = yield parseStringPromise(xmlText);
            console.log(result);
            const game = result.items.item[0];
            console.dir(game, { depth: null });
        }
        catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    });
}
fetchBGGData();
