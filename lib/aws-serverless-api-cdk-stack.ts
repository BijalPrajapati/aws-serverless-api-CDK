import * as cdk from 'aws-cdk-lib';
//import { Stack, StackProps, CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Function, Runtime, Code } from "aws-cdk-lib/aws-lambda";
import { RestApi, LambdaIntegration } from "aws-cdk-lib/aws-apigateway";


export class AwsServerlessApiCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'AwsServerlessApiCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    // The code that defines your stack goes here
    //Dynamodb table
    const todoTable = new Table(this, "todo", {
      partitionKey: { name: "name", type: AttributeType.STRING },
    });

    // lambda function 1 GetAlltodoLambdaHandler
    const getAlltodoLambda = new Function(this, "GetAlltodoLambdaHandler", {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset("functions"),
      handler: "get-all-todo.getAlltodoHandler",
      environment: {
        TODO_TABLE_NAME: todoTable.tableName,
      },
    });

    // permissions to lambda to dynamo table
    todoTable.grantReadWriteData(getAlltodoLambda);

    // lambda function 2 PutTodoLambdaHandler
    const putTodoLambda = new Function(this, "PutTodoLambdaHandler", {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset("functions"),
      handler: "put-todo.putTodoHandler",
      environment: {
        TODO_TABLE_NAME: todoTable.tableName,
      },
    });

     // permissions to lambda to dynamo table    
     todoTable.grantReadWriteData(putTodoLambda);

    // create the API Gateway method and path
    const api = new RestApi(this, "todo-api");
    api.root
      .resourceForPath("todo")
      .addMethod("GET", new LambdaIntegration(getAlltodoLambda));

    api.root
    .resourceForPath("todo")
    .addMethod("POST", new LambdaIntegration(putTodoLambda));

    new cdk.CfnOutput(this, "API URL", {
      value: api.url ?? "Something went wrong"
    });

  }
}
