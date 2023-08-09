To build the Transaction Broadcaster Service, we will leverage AWS built-in services and microservices architecture to ensure efficient transaction broadcasting to an EVM-compatible blockchain network. Key features of this service include handling failures gracefully, real-time status tracking with a user-friendly UI interface, and the ability to manually retry failed broadcasts.

## Architecture Overview:

Endpoint and Database: We set up an endpoint to receive transaction data as a POST request. (calling it endpoint 1) When a request is received, the server captures the details and stores them as a record in the database. The database can be encrypted such that in a situation where there is unauthorised access, the data is unreadable. 

AWS SNS and SQS: The service forwards the received requests to an AWS SNS topic, acting as a central communication hub. An SQS queue subscribes to this topic, holding incoming requests for further processing.

AWS Lambda Functions: Messages in the SQS queue trigger AWS Lambda functions. These functions are responsible for securely signing the transaction data using appropriate private keys. These private keys can be stored in AWS Key Management Service. Access to these keys can be defined using Terraform and assigned to the necessary IAM Roles and AWS Accounts. The signed data is then posted back to another endpoint.

Validation and Processing: The new endpoint (calling it endpoint 2) sends the signed transaction data to an AWS Lambda function for validation and processing. This step ensures the validity and integrity of the data before broadcasting.

## Why AWS Lambda? 
AWS Lambda is event-driven, hence different services can trigger AWS Lambda when needed. Furthermore, AWS Lambda is a good choice due to its scalability. Based on the messages in the queue, AWS Lambda instances can scale up or down based on the necessary workload. Also, AWS Lambda is serverless, and with some of the services that we are using, they only handle straightforward functions thus provisioning and maintaining of these resources may not be necessary. 

Broadcast to Blockchain Network: Once the data is validated, the Transaction Broadcaster Service makes an RPC request to the EVM-compatible blockchain network for broadcasting the signed transaction.

## Reasons for Using SQS and SNS:
By leveraging AWS SNS and SQS, we ensure the following benefits:
Asynchronous Processing: The use of SNS and SQS decouples the processing pipeline, allowing the endpoint to respond quickly to clients without waiting for the entire process to complete.
Scalability and Auto-Scaling: SQS can handle varying transaction loads and acts as a buffer, allowing scaling of the processing functions (AWS Lambda) based on demand.

## Handling Failures Gracefully:

The service implements robust error-handling mechanisms:

1. Automatic Retries
For failures during signing, validation, or broadcasting, the service employs automatic retries with exponential backoff (similar to those used in network protocols e.g Ethernet) to avoid overwhelming the blockchain network. Since 95% of the time a blockchain node responds with a success code within 20-30 seconds, we can set the minimum time to retry to be a little bit above 30 seconds (eg. 35 seconds) to minimise the number of retries but also maximise the number of successful responses with each retry. For each subsequent retry, use exponential backoff to increase the retry interval gradually. Eg for each retry +10s. 

2. Persistent Failure Handling
Persistent failures, such as blockchain nodes that respond with an error or after certain number of retries, say 16, are logged, and the failed transactions are stored in a dedicated database table or dead-letter queue. Administrators can inspect and resolve these failures manually through the user-friendly admin interface.

3. User Interface for Status Tracking:

To track transaction status in real time, the service stores status details in the database. The user-friendly UI interface provides administrators with a comprehensive list of transactions along with their unique identifiers, status, and relevant data.

## Manual Retry of Failed Broadcasts:

Administrators can access the list of failed transactions through the admin interface. From here, they can inspect and modify failed broadcasts if necessary and manually trigger retries with a simple click. The service will re-initiate transaction signing, validation, and broadcasting for the selected transaction, aiming to broadcast it to the blockchain network again.

## Monitoring with AWS CloudWatch:

For effective monitoring, AWS CloudWatch is utilized to track the service's status, metrics, and any encountered errors. This enables administrators to promptly address issues and ensure the overall health and performance of the Transaction Broadcaster Service.
Alarms can be set up to notify support and/or development teams of potential issues that arise, such as database connection errors or SQS queue size being too large (leading to a processing bottleneck). This way, the  team can take proactive measures to maintain the stability and reliability of the Transaction Broadcaster Service. 

A high-level diagram of the infrastructure is in the same folder as infra.jpeg
