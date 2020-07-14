const { Schema, model } = require('mongoose');
const moment = require('moment');
// need to add getters: true to bottom, and get statement to model field

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: [],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
    }
);

//get total count of comments and replies on retrieval uses a VIRTUAL
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

//create the pizza model using the pizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export pizza model
module.exports = Pizza;