const { Schema, model } = require('mongoose');
const moment = require('moment');
// need to add getters: true to bottom, and get statement to model field

const PizzaSchema = new Schema({
    pizzaName: {
        type: String,
        required: 'You need to provide a pizza name!',
        trim: true
    },
    createdBy: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    size: {
        type: String,
        required: true,
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
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
    //use reduce() method to tally up the total of every comment with its replies.
    //takes in an accumulator (total) and a current value (comment).
    //reduce walks through array and passes both through
    //returns revised total for next iteration of array
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

//create the pizza model using the pizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export pizza model
module.exports = Pizza;