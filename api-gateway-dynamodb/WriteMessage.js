// Loads in the AWS SDK
const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handler = async (event, context, callback) => {

    if(event.name && event.password) {
        const requestId = context.name;
        await createMessage(requestId,event).then(() => {
            callback(null, {
                statusCode: 201,
                body: '',
                headers: {
                    'Access-Control-Allow-Origin' : '*'
                }
            });
        }).catch((err) => {
            console.error(err)
        })
    } else {
        callback(null, {
            statusCode: 400,
            body: 'Bad Request',
            headers: {
                'Access-Control-Allow-Origin' : '*'
            }
        });
    }
};


function createMessage(name, event) {
    
    const params = {
        TableName: 'users',
        Item: {
            'name' : event.name,
            'password' : event.password
        }
    }

    return ddb.put(params).promise();
}
