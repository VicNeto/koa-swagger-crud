export const commonResponse = {
    200: { description: 'Success' },
    400: { description: 'Bad Request' },
    401: { description: 'Unauthorized' },
    403: { description: 'Forbidden' },
    500: { description: 'Server error' },
};

export const userBody = {
    firstName: { type: 'string', required: true, example: 'Gimli' },
    lastName: { type: 'string', required: true, example: 'Son of Gloin' },
    email: {
        type: 'string',
        required: true,
        example: 'onlycountsasone@lotr.dev',
    },
    password: { type: 'string', required: true, example: 'supersecret' },
    nickName: { type: 'string', required: false, example: 'dwarf' },
    type: { type: 'string', required: false, example: 'user' },
};

export const updateBody = {
    firstName: { type: 'string', required: false, example: 'Gimli' },
    lastName: { type: 'string', required: false, example: 'Son of Gloin' },
    nickName: { type: 'string', required: false, example: 'dwarf' },
    type: { type: 'string', required: false, example: 'user' },
};

export const loginBody = {
    email: {
        type: 'string',
        required: true,
        example: 'onlycountsasone@lotr.dev',
    },
    password: { type: 'string', required: true, example: 'supersecret' },
}