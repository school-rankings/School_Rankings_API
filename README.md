# School Rankings Api


## Pre-requisites

- Node (npm)
- Git
- Redis

Recommended Editor

- Visual Studio Code
- Recommended Extensions: Prettier, Git Lens, Azure Cosmos DB

## Setup

- Install git
- Install Node
- Install Redis

## RazorPay

Integration with RazorPay

### Configuration

The RazorPay Node package requires a KEY_ID and KEY_SECRET from the SchoolRankings RazorPay account.

These secret values are stored locally using a `.env` file which contains the environment variables passed to the application at runtime.

```
RAZORPAY_MODE=test
RAZORPAY_KEY_ID=key_id
RAZORPAY_KEY_SECRET=key_secret
```

We can access the above data using:

```js
var instance = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY_ID,
  key_secret: process.env.RAZOR_PAY_KEY_SECRET,
});
```

We use dotenv to parse and load the `.env` file.

References:

- [dotnenv](https://www.npmjs.com/package/dotenv)
- [Razorpay Node SDK](https://github.com/razorpay/razorpay-node)


## Full-Text Search

> Starting from version 2.4, MongoDB began with an experimental feature supporting Full-Text Search using Text Indexes. This feature has now become an integral part of the product (and is no longer an experimental feature). In this article we are going to explore the full-text search functionalities of MongoDB right from fundamentals.

> Before MongoDB came up with the concept of text indexes, we would either model our data to support [keyword searches](http://docs.mongodb.org/master/tutorial/model-data-for-keyword-search/) or use [regular expressions](http://docs.mongodb.org/master/reference/operator/query/regex/#op._S_regex) for implementing such search functionalities.

See reference below for more info.


## References

MongoDB

- [Full-Text Search in MongoDB](https://code.tutsplus.com/tutorials/full-text-search-in-mongodb--cms-24835)

- [Full text search with weight in mongoose](https://stackoverflow.com/questions/24714166/full-text-search-with-weight-in-mongoose)

Node

- [Better local require() paths for Node.js](https://gist.github.com/branneman/8048520)

