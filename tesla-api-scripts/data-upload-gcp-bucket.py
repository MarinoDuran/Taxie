#
## Script for uploading data files of aquired vehicle data to GCP bucket tesla-data-script-output
## Written and maintained by Marino Duran
#

## Imports the Google Cloud client library
from google.cloud import storage
import os

## Instantiates a client
storage_client = storage.Client.from_service_account_json("/home/mdurandemo372/Mar-Mar-Project-57308d6a7839.json")

## The name for the new bucket
bucket_name = "tesla-datascript-output"

## Optains bucket in GCP where vehicle data is being stored
bucket = storage_client.get_bucket(bucket_name)
print("Bucket {} exists.".format(bucket.name))

## Create blob object and transmit to GCP Bucket
blob = bucket.blob('tesla-vehicle-data.csv')
blob.upload_from_filename('/home/mdurandemo372/tesla-vehicle-data.csv')
print("File successfully uploaded.\nFile URL: ", blob.public_url)
