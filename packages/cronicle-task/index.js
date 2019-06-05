
const cronicleTaskModule = require('./module')
    ,        yaml = require('js-yaml')
     ,   fs   = require('fs')

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
        console.log(this)
        if (!this.loadConfig(options.parent.path)) {
            //return
        }


        const host = {
            masterUrl: 'http://localhost:3012',
            apiKey: '<your api key>',
        };

        const module = options.parent.module ? require('cronicle-task-' + options.parent.module) : cronicleTaskModule;
        console.log('setup for %s env(s) with %s mode', value, options.parent.module);
        return module.apply(host, options.parent, options, value)
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
     * @param env
     */
    commandNotFound: function(env){
        console.log(`Unrecognized command '%s'`, env);
    }
};
