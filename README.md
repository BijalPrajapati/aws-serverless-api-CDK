# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template



# Create serverless application in aws using cdk #
#### typescript ####
Main components
 1. aws - api gateway
 2. aws - lambda 
 3. aws - dynamoDB

### Pre-Requirements ###
- install Node
- install AWS CLI
- install AWS CDK: npm install -g aws-cdk
- Configure the aws-cli and credentials (aws configure)

### steps ###
1. check -> node --version, cdk --version, aws --version
    - install Node
    - install AWS CLI
2. install AWS CDK: npm install -g aws-cdk
3. crate IAM user in AWS console -> aws configure
4. - Configure the aws-cli and credentials (aws configure)
5. Initialize Project: cdk init --language typescript
deploye
6. npm run build
7. Synthesizing: cdk synth (create cloud formation template -> cdk.out folder created)
    if you are deploying 1st time 
    - Bootstrap: cdk bootstrap aws://Account-number/Region (in aws cloud formation CDKToolkit created)
8. clean up : cdk destroy