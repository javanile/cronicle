/*!
 * cronicle-task 0.0.1
 * Copyright(c) 2019 Javanile
 * MIT Licensed
 */

const cc = require('cronicle-client');

module.exports = {

    /**
     * Apply value to event, if event not exists create one.
     *
     * @param app
     * @param facts
     * @param args
     * @param value
     */
    apply(app, host, facts, args, value) {
        const client = new cc.CronicleClient(host);

        const apply = (data) => {
            let req = { id: data.event.id };
            let field = facts.field || 'enabled';

            req[field] = app.sanitize(field, value);

            client.updateEvent(req).then((data) => {
                console.log('OK!:', data);
            }).catch((err) => {
                console.log(`Cronicle task: ${err.message}`);
            });
        };

        client.getEvent({
            'title': facts.event
        }).then(apply).catch((err) => {
            if (err.code !== 'event') {
                app.error(err.message);
            }
            client.getEvent({
                'id': facts.event
            }).then(apply).catch((err) => {
                app.error(err.message);
            });
        });
    }
};
