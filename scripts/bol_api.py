import requests
import base64
import json

CLIENT_ID = "JOUW_CLIENT_ID"
CLIENT_SECRET = "JOUW_CLIENT_SECRET"

creds = base64.b64encode(f"{CLIENT_ID}:{CLIENT_SECRET}".encode()).decode()

r = requests.post(
    "https://login.bol.com/token?grant_type=client_credentials",
    headers={"Authorization": f"Basic {creds}", "Accept": "application/json"},
    timeout=15
)

print("Token status:", r.status_code)
if r.status_code != 200:
    print(r.text[:300])
    exit()

token = r.json()["access_token"]
print("Token OK!")

# Zoek WLS supplement producten
resp = requests.get(
    "https://api.bol.com/marketing/catalog/v1/products/search",
    params={
        "search-term": "WLS multivitamine maagverkleining",
        "country-code": "NL",
        "limit": 5
    },
    headers={
        "Authorization": f"Bearer {token}",
        "Accept": "application/json",
        "Accept-Language": "nl"
    },
    timeout=15
)
print("Zoek status:", resp.status_code)
print(json.dumps(resp.json(), indent=2, ensure_ascii=False)[:4000])
