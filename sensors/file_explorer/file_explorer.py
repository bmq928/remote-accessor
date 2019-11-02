import os
from os import path

from file_info import FileInfo


def explore(directory: str, depth=3) -> FileInfo:
    if not path.exists(directory):
        raise FileNotFoundError('directory is not existed')

    return _explore_at_lv(directory, 0, depth - 1)


def _explore_at_lv(directory: str, lv: int, max_lv: int) -> FileInfo:
    if lv > max_lv:
        return None
    if path.isfile(directory):
        return FileInfo(
            name=path.basename(directory),
            is_file=path.isfile(directory),
            children=[]
        )
    children_names = os.listdir(directory)
    children_directories = [
        path.join(directory, name)
        for name in children_names
    ]
    children = [
        _explore_at_lv(child_dir, lv + 1, max_lv)
        for child_dir in children_directories
    ]
    not_none_chilren = [
        child for child in children
        if child is not None
    ]
    cur_file_info = FileInfo(
        name=path.basename(directory),
        is_file=path.isfile(directory),
        children=not_none_chilren
    )

    return cur_file_info
