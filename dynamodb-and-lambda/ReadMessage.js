// Loads in the AWS SDK
const AWS = require('aws-sdk'); 

const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'}); 

exports.handler = async (event, context, callback) => {
    // Handle promise fulfilled/rejected states
    await readMessage().then(data => {
        data.Items.forEach(function(item) {
            console.log(item.name)
        });
        callback(null, {
            // If success return 200, and items
            statusCode: 200,
            body: data.Items,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        })
    }).catch((err) => {
        // If an error occurs write to the console
        console.error(err);
    })
};

// Function readMessage
// Reads 10 messages from the DynamoDb table Message
// Returns promise
function readMessage() {
    const params = {
        TableName: 'users',
        Limit: 10
    }
    return ddb.scan(params).promise();
}
