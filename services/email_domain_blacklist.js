const stampit = require('@stamp/it');

const {
    getEmailDomainBlacklistEntry,
    updateEmailDomainBlacklistEntry,
} = require('../db/methods/email_domain_blacklist');
const { USE_DYNAMODB } = require('../features');
const SequelizeEmailDomainBlacklists = require('./sequelize/email_domain_blacklist');


const EmailDomainBlacklistService = stampit({
    props: {
        db: {
            getEmailDomainBlacklistEntry,
            updateEmailDomainBlacklistEntry,
        },
        sequelize: SequelizeEmailDomainBlacklists,
    },
    methods: {
        getDomainBlacklistEntry(domainName) {
            if (!USE_DYNAMODB) {
                return this.sequelize.getDomainBlacklistEntry(domainName);
            }
            return this.db.getEmailDomainBlacklistEntry(domainName);
        },

        updateDomainBlacklistEntry(blacklistEntry) {
            if (!USE_DYNAMODB) {
                return this.sequelize.updateDomainBlacklistEntry(blacklistEntry);
            }
            const { domainName, ...entry } = blacklistEntry;
            return this.db.updateEmailDomainBlacklistEntry(domainName, entry);
        },
    },
});

module.exports = EmailDomainBlacklistService;
