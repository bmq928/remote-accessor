import mimetypes
from os import path
import base64


class FileNotExisted(Exception):
    pass


def read_file(file_path: str) -> dict:
    is_txt = check_is_txt_file(file_path)
    mime = 'text' if is_txt else 'binary'
    if not path.exists(file_path):
        return {
            'mime': mime,
            'content': None,
            'error': 'File is not existed'
        }

    content = read_txt_content(file_path) if is_txt \
        else read_binary_content(file_path)
    return {
        'mime': mime,
        'content': content,
        'error': None
    }


def check_is_txt_file(file_path: str) -> bool:
    file_type, _ = mimetypes.guess_type(file_path)
    if file_type == None:
        return False
    is_txt = file_type.split('/')[0] == 'text'
    return is_txt


def read_txt_content(file_path: str) -> str:
    with open(file_path, 'r') as f:
        return f.read()


def read_binary_content(file_path: str):
    with open(file_path, 'rb') as f:
        raw_content = f.read()
        base64_encoded = base64.b64encode(raw_content)
        base64_decoded = base64_encoded.decode('utf8')
        return base64_decoded
