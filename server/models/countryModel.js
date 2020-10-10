const db = require('../database/config');

const countryModal = {
    list: async() => {
        const connection = db.connection();
        // TODO add pagination
        const data = await connection('country')
            .join('zone', {'country.country_code': 'zone.country_code'})
            .join('timezone', 'timezone.zone_id', 'zone.zone_id')
            .select('country.country_code', 'country.country_name', 'abbreviation',
                'zone.zone_id','gmt_offset','time_start','dst')
            .from('country')
            .then((result) => {
                return result
            }).catch(e => {
                return {error: e}
            });
        return data
    },
    byName: async(name) => {
        const connection = db.connection();
        const data = await connection('country')
            .join('zone', {'country.country_code': 'zone.country_code'})
            .join('timezone', 'timezone.zone_id', 'zone.zone_id')
            .select('country.country_code', 'country.country_name', 'abbreviation',
                'zone.zone_id','gmt_offset','time_start','dst')
            .from('country').where('country_name', name)
            .then((result) => {
                return result
            }).catch(e => {
                return {error: e}
            });
        return data
    },

};

module.exports = countryModal;