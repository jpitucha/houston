import fetch from 'node-fetch'

export default class N2YO {

    static readonly apiAddress: string = 'https://api.n2yo.com/rest/v1/satellite'

    static getTwoLineElements(id: string) {
        const endPoint: string = `${this.apiAddress}/tle/${id}&apiKey=${process.env.N2YO_KEY}`
        console.log(endPoint)
        return fetch(endPoint)
            .then(res => res.json())
            .catch(err => console.warn(err))
    }

}