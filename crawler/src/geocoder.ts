import NodeGeocoder from 'node-geocoder'
import config from 'config'

const geocoder = NodeGeocoder({
    provider: 'opencage',
    apiKey: config.get('geocoderKey')
});

export default geocoder