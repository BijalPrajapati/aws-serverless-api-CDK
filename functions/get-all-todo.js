// Create clients and set shared const values outside of the handler. 
// Get the DynamoDB table name from environment variables
const tableName = process.env.TODO_TABLE_NAME;

// Create a DocumentClient that represents the query to add an item 
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb. DocumentClient();

/**
* A simple example includes a HTTP get method to get all todo from a DynamoDB table.
*/
Eexports.getAllTodoHandler = async (event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAlltodo only accept GET method, you tried: ${event.httpMethod}`);
    }
    // All log statements are written to CloudWatch
    console.info('received: ', event);
    
    // get all todo from the table
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property //
    // https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API Scan.html
    var params = {
        TableName: tableName
    };
    const data = await docClient.scan (params).promise();
    const items = data. Items;
    const response = {
        statusCode: 200,
        body: JSON.stringify(items)
    };
    // All log statements are written to CloudWatch
    console.info (`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`); 
    console.info (`Deployment Test 1.2`);
    return response;
};