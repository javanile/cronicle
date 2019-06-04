

const cc = require('cronicle-client')

module.exports = {

    apply(host, facts, args, value) {

        const client = new cc.CronicleClient(host);

        client.updateEvent({
            id: 1,
            enabled: false
        }).then(() => {

        }).catch((err) => {
            console.log(`Cronicle error: ${err.code} - ${err.message}`);
        });
    }

};
