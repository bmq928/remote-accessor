import mimetypes
from os import path
import base64


class FileNotExisted(Exception):
    pass


def read_file(file_path: str) -> dict:
    is_txt, ext = check_is_txt_file(file_path)
    is_file_existed = path.exists(file_path)
    error_msg = "File is not existed" if not is_file_existed else None
    file_content = (
        None
        if error_msg
        else (read_txt_content(file_path) if is_txt else read_binary_content(file_path))
    )

    return {
        "is_text": is_txt,
        "content": file_content,
        "error": error_msg,
        "ext": ext,
    }

    # if not path.exists(file_path):
    #     return {
    #         "is_text": is_txt,
    #         "content": None,
    #         "error": "File is not existed",
    #         "ext": ext,
    #     }

    # content = read_txt_content(file_path) if is_txt else read_binary_content(file_path)
    # return {"is_text": is_txt, "content": content, "error": None, "ext": ext}


def check_is_txt_file(file_path: str) -> bool:
    EXTRA_TEXT_EXTS = [
        ".js",
        "",
        ".scss",
        ".css",
        ".txt",
        ".py",
        ".html",
        ".yaml",
        ".yml",
        ".json",
        ".md",
        ".gitignore",
    ]

    _, file_ext = path.splitext(file_path)
    file_type, _ = mimetypes.guess_type(file_path)

    if file_ext in EXTRA_TEXT_EXTS:
        return True, file_ext
    if file_type == None:
        return False, file_ext
    is_txt = file_type.split("/")[0] == "text"
    return is_txt, file_ext


def read_txt_content(file_path: str) -> str:
    with open(file_path, "r") as f:
        return f.read()


def read_binary_content(file_path: str):
    with open(file_path, "rb") as f:
        raw_content = f.read()
        base64_encoded = base64.b64encode(raw_content)
        base64_decoded = base64_encoded.decode("utf8")
        return base64_decoded
