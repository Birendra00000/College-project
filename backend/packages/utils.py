from .models import Payment
from django.conf import settings
from django.http import JsonResponse
import requests

import logging
from decimal import Decimal

def initiate_payment(payment):
    # Ensure the PAYMENT_GATEWAY_URL is correctly configured in settings
    payment_gateway_url = settings.PAYMENT_GATEWAY_URL

    # Format the payment data to match expected fields in the payment gateway
    payment_data = {
        "amount": float(payment.amount),
        "payment_method": payment.payment_method,
        "user": payment.user.id,
        "status": payment.status,
        "booking": payment.booking.id,
        # Add other required fields if necessary
    }

    try:
        # Make a POST request to the payment gateway URL with the payment data
        response = requests.post('http://127.0.0.1:8000/api/payment/', json=payment_data)

        # Log the request details
        logging.info(f"Request sent to payment gateway: URL={payment_gateway_url}, Data={payment_data}")

        # Check the response status code
        if response.status_code == 200:
            return response.json()
        else:
            # Log the error details for debugging
            logging.error(f"Failed to initiate payment: Status Code={response.status_code}, Response={response.text}")
            return {"error": "Failed to initiate payment"}
    except requests.exceptions.RequestException as e:
        # Handle network issues or connection errors
        logging.error(f"Request exception: {e}")
        return {"error": str(e)}


def verify_payment(payment):
    
    payment_gateway_url = f"{settings.PAYMENT_GATEWAY_URL}/verify/{payment.id}/"
    
    # Send verification request to payment gateway
    response = requests.get(payment_gateway_url)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Failed to verify payment"}

def process_refund(payment, amount, reason):
    
    payment_gateway_url = f"{settings.PAYMENT_GATEWAY_URL}/refund/{payment.id}/"
    refund_data = {
        "amount": amount,
        "reason": reason,
    }

    # Send refund request to payment gateway
    response = requests.post(payment_gateway_url, data=refund_data)
    if response.status_code == 200:
        return response.json()
    else:
        return {"error": "Failed to process refund"}


