// WARNING: DO NOT EDIT. This file is Auto-Generated by AWS Mobile Hub. It will be overwritten.

// Copyright 2017 Amazon.com, Inc. or its affiliates (Amazon). All Rights Reserved.
// Code generated by AWS Mobile Hub. Amazon gives unlimited permission to
// copy, distribute and modify it.
// AWS Mobile Hub Project Constants
export const aws_app_analytics = 'enable';
export const aws_cognito_identity_pool_id = 'us-east-1:f69ea1e8-d620-4213-9fad-64f0a40cc629';
export const aws_cognito_region = 'us-east-1';
export const aws_content_delivery = 'enable';
export const aws_content_delivery_bucket = 'mobilehubproject-hosting-mobilehub-824825156';
export const aws_content_delivery_bucket_region = 'us-east-1';
export const aws_dynamodb = 'enable';
export const aws_dynamodb_all_tables_region = 'us-east-1';
export const aws_dynamodb_table_schemas = '[{"tableName":"ionic-mobile-hub-tasks","attributes":[{"name":"userId","type":"S"},{"name":"taskId","type":"S"},{"name":"category","type":"S"},{"name":"created","type":"N"},{"name":"description","type":"S"}],"indexes":[{"indexName":"DateSorted","hashKey":"userId","rangeKey":"created"}],"region":"us-east-1","hashKey":"userId","rangeKey":"taskId"}]';
export const aws_mobile_analytics_app_id = 'e829f24cb94b47f39e781e209caeec09';
export const aws_project_id = 'e210cd9a-44ed-4d4b-a91a-cd2e52caf1b8';
export const aws_project_name = 'mobile-hub-project';
export const aws_project_region = 'us-east-1';
export const aws_push_pinpoint = 'enable';
export const aws_resource_name_prefix = 'mobilehubproject-mobilehub-824825156';
export const aws_sign_in_enabled = 'enable';
export const aws_user_files = 'enable';
export const aws_user_files_s3_bucket = 'mobilehubproject-userfiles-mobilehub-824825156';
export const aws_user_files_s3_bucket_region = 'us-east-1';
export const aws_user_pools = 'enable';
export const aws_user_pools_id = 'us-east-1_Z0bWQ2iYI';
export const aws_user_pools_mfa_type = 'OFF';
export const aws_user_pools_web_client_id = '3srcdrqm20dmdtui13t6ohdloh';
export const aws_user_settings = 'enable';
//AWS.config.region = aws_project_region;
//AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    //IdentityPoolId: aws_cognito_identity_pool_id
  //}, {
    //region: aws_cognito_region
//});
//AWS.config.update({customUserAgent: 'MobileHub v0.1'});