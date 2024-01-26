import validator from 'is-my-json-valid';

const UserValidate = validator({
  required: true,
  type: 'object',
  properties: {
    title: { required: true, type: 'string' },
  },
});

export { UserValidate };
