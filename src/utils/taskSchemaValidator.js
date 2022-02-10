const Joi = require('joi');

// https://medium.com/@itskumarkrishna/custom-error-message-using-joi-b9a713b23b8f
// https://stackoverflow.com/questions/58408362/how-to-set-custom-error-messages-in-hapi-joi

module.exports = Joi.object({
    task: Joi.string().required(),
    status: Joi.string().required(),
});
