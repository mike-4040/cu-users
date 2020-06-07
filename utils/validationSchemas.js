const Joi = require('@hapi/joi');

const { validate } = require('../configrc');

const string = Joi.string();

const emailShort = string.pattern(/.+@.+/).required();
const email = string
  .email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  })
  .required();
const password = string.pattern(/^[a-zA-Z0-9]{3,30}$/).required();
const name = string.alphanum().max(30).label('Name').required();

const schemasShort = {
  signIn: Joi.object({
    email: emailShort,
    password: string,
  }),
  signUp: Joi.object({
    name: name,
    email: emailShort,
    password: string,
  }),
};

const schemasLong = {
  signIn: Joi.object({
    email: email,
    password: password,
  }),

  signUp: Joi.object({
    name: name,
    email: email,
    password: password,
  }),
};
module.exports = validate ? schemasLong : schemasShort;
