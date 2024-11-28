import Joi from 'joi';

const joiDataValidator = (data) => {
  const schema = Joi.object({
    country: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    population: Joi.number().integer().positive().required(),
    gdp: Joi.number().positive().required(),
    popularCities: Joi.array().items(Joi.string().required()).required(),
    mainLanguages: Joi.array().items(Joi.string().required()).required(),
    eventCalendar: Joi.array()
      .items(
        Joi.object({
          eventName: Joi.string().required(),
          date: Joi.date().optional(),
        })
      )
      .optional(),
    weather: Joi.object({
      temperature: Joi.number().required(),
      humidity: Joi.number().required(),
    }).required(),
  });

  return schema.validate(data, { abortEarly: false });
};

export default joiDataValidator;
