import ntplib
from time import ctime

NTP_SERVER = '123.200.0.252'

def get_ntp_time():
    try:
        client = ntplib.NTPClient()
        response = client.request(NTP_SERVER, version=3)
        print(f"Time from {NTP_SERVER}: {ctime(response.tx_time)}")
        return response.tx_time
    except Exception as e:
        print(f"Could not connect to NTP server {NTP_SERVER}: {e}")
        return None

if __name__ == '__main__':
    get_ntp_time()