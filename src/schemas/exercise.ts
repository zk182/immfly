import { Joi } from 'express-validation';

export const countriesValidation = {
	query: Joi.object({
		filter: Joi.string().optional(),
		order: Joi.string().valid('asc', 'desc').optional()
	})
};

export const appendValidation = {
	query: Joi.object({
		start: Joi.string().optional(),
		end: Joi.string().optional()
	})
};
