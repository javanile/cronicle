/*!
 * cronicle-task: v0.1.5
 * Copyright(c) 2019 Javanile
 * MIT Licensed
 */

const fs   = require('fs')
    , yaml = require('js-yaml')
    , defaultModule = require('./module')

module.exports = {

    /**
     *
     */
    config: {},

    /**
     *
     * @param value
     * @param options
     * @returns {*|void}
     */
    apply: function(value, options) {
        if (!this.loadConfig(options.parent.path)) {
            //return
        }

        let currentHost = options.parent.host || 'default';

        if (typeof this.config.hosts[currentHost] === 'undefined') {
            this.error('host not found on config file: ' + currentHost);
        }

        let host = {
            masterUrl: this.config.hosts[currentHost].master_url,
            apiKey: this.config.hosts[currentHost].api_key,
        };

        const currentModule = options.parent.module ? require('cronicle-task-' + options.parent.module) : defaultModule;

        return currentModule.apply(host, options.parent, options, value)
    },

    /**
     *
     * @param path
     */
    loadConfig: function(path) {

        let configFile = path || './.cronicle.yml';

        try {
            this.config = yaml.safeLoad(fs.readFileSync(configFile, 'utf8'));
            console.log(this.config);
        } catch (e) {
            console.log(e);
        }
    },

    /**
     *
     */
    error: function (msg) {
        console.error(msg)
        process.exit(1)
    },

    /**
     *
     * @param env
     */
    commandNotFound: function(env){
        console.log(`Unrecognized command '%s'`, env);
    }
};
