//  Wrapper for calls to retreive market data

import * as http from './http-promise';

// Constant defined by webpack, depending on whether we're in a production or a
// development environment
const BASE_SITE_URL = __API_URL__;

// Return summary of markets near zip
export function local(zip, callback) {
    const url = BASE_SITE_URL + 'zip/' + zip;
    return http.post(url);
}

// get detailed information for a certain market ID
export function detail(id) {
    const url = BASE_SITE_URL + 'market/' + id;
    return http.get(url, 'html');
}

// get detailed information for a group of market summaries
export function allDetails(marketData) {
    for (var i=0; i < marketData.length; i++) {
        let market = marketData[i];
        getDetail(market['id']).then(printData);
    }
}

// Favorite a particular farmers market
export function toggleFavorite(id) {
    let url = BASE_SITE_URL + 'favorite/' + id;
    return http.post(url);
}


export function latLonFromZip(zip) {
    let url = BASE_SITE_URL + 'zip-coords/' + zip;
    return http.post(url, 'json').then((data) => {
        return {'lat': data.lat, 'lon': data.lon};
    });
}
