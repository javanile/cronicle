/*!
 * cronicle-task: v0.1.5
 * Copyright(c) 2019 Javanile
 * MIT Licensed
 */


const cc = require('cronicle-client')

module.exports = {

    apply(host, facts, args, value) {
        const client = new cc.CronicleClient(host);

        client.updateEvent({
            id: 1,
            enabled: false
        }).then(() => {

        }).catch((err) => {
            console.log(`Cronicle task: ${err.message}`);
        });
    }

};
