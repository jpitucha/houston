const { json } = require('express')
const fetch = require('node-fetch')

class N2YO {

    static #apiAddress = 'https://api.n2yo.com/rest/v1/satellite'

    static getTwoLineElements(id) {
        const endPoint = `${this.#apiAddress}/tle/${id}&apiKey=${process.env.N2YO_KEY}`
        
        return fetch(endPoint)
            .then(res => res.json())
            .catch(err => console.warn(err))
    }

}

module.exports = N2YO