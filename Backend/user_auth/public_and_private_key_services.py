from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa


def generate_rsa_key_pair():
    private_key = rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
        backend=default_backend()
    )
    return private_key
def save_private_key(private_key, filename="private.pem"):
    with open(filename, "wb") as key_file:
        key_file.write(
            private_key.private_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PrivateFormat.TraditionalOpenSSL,
                encryption_algorithm=serialization.NoEncryption()
            )
        )
# Save public key to a file
def save_public_key(public_key, filename="public.pem"):
    with open(filename, "wb") as key_file:
        key_file.write(
            public_key.public_bytes(
                encoding=serialization.Encoding.PEM,
                format=serialization.PublicFormat.SubjectPublicKeyInfo
            )
        )

def load_private_key(filename="private.pem"):
    with open(filename, "rb") as key_file:
        private_key_data = key_file.read()
        private_key = serialization.load_pem_private_key(
            private_key_data,
            password=None,  # Replace with password if the private key is encrypted
            backend=default_backend()
        )
    return private_key

def load_public_key(filename="public.pem"):
    with open(filename, "rb") as key_file:
        public_key_data = key_file.read()
        public_key = serialization.load_pem_public_key(
            public_key_data,
            backend=default_backend()
        )
    return public_key