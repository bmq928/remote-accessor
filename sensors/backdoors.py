import socket
import fcntl
import struct

from routes import create_app

def get_ip_address(ifname):
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    return s.getsockname()[0]


if __name__ == '__main__':
    hostname = socket.gethostname()
    ip = get_ip_address('eth0')
    port = 5000

    app = create_app()
    app.run(host=ip, port=port)