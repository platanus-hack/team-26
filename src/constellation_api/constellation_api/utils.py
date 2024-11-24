import base64
import json

import boto3
from botocore.exceptions import ClientError


def get_secret(secret_name="chaskdb-dev", region_name="us-east-1", MODE="PRODUCTION"):
    """
    Retrieve secret value from AWS Secrets Manager

    Parameters:
    secret_name (str): The name of the secret.
    region_name (str): The AWS region where the secret was created.

    Returns:
    dict: The secret values.
    """

    if MODE == "DEVELOPMENT":
        session = boto3.session.Session(profile_name="development")
        client = session.client(service_name="secretsmanager", region_name=region_name)

    elif MODE == "PRODUCTION":
        session = boto3.session.Session()
        client = session.client(
            service_name="secretsmanager",
            region_name=region_name,
        )

    try:
        get_secret_value_response = client.get_secret_value(SecretId=secret_name)
    except ClientError as e:
        # For a list of exceptions thrown, see
        # https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        raise e

    # Parse the JSON string into a Python dictionary
    secret = json.loads(get_secret_value_response["SecretString"])

    return secret


def get_token_claims(request):
    # Extract the headers

    auth_header = request.headers.get("Authorization")
    # print(f'IdToken     : {auth_header}')

    if auth_header:
        # Typically the header is 'Authorization: Bearer <token>'
        id_token = auth_header.split(" ")[1]
        print("get_token_claims - idToken: Ok")

        # Decode the JWT
        id_token_payload = id_token.split(".")[1]
        id_token_payload += "=" * (
            -len(id_token_payload) % 4
        )  # Pad with '=' to ensure multiple of 4
        decoded_payload = base64.urlsafe_b64decode(id_token_payload).decode("utf-8")
        claims = json.loads(decoded_payload)

        return claims

    else:
        print("No Authorization token received")
