import fetch from 'node-fetch'

export default class N2YO {

    static readonly apiAddress: string = 'https://api.n2yo.com/rest/v1/satellite'

    static getTwoLineElements(id: string): Promise<JSON> {
        const endPoint = `${this.apiAddress}/tle/${id}&apiKey=${process.env.N2YO_KEY}`
        
        return fetch(endPoint)
            .then(res => { return res.json() })
            .catch(err => { throw err })

    }

}