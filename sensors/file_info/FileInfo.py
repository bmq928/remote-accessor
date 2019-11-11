import logging
import os

from .FileInfoInvalidParam import FileInfoInvalidParam

__author__ = 'bmq928'
__logger__ = logging.getLogger(__name__)


class FileInfo:
    def __init__(self, name, is_file, path, children=[]):
        validated_args = self._validate_args({
            'name': name,
            'is_file': is_file,
            'children': children,
            'path': path
        })

        self.name = validated_args.get('name')
        self.is_file = validated_args.get('is_file')
        self.children = children
        self.path = path

    def __eq__(self, value):
        if not isinstance(value, FileInfo):
            return False
        return self.to_dict() == value.to_dict()

    def to_dict(self):
        return self._to_dict_one_node(self)

    def _to_dict_one_node(self, node) -> dict:
        sorted_child_folders = sorted(
            [child for child in node.children if not child.is_file],
            key=lambda child: child.name
        )

        sorted_child_files = sorted(
            [child for child in node.children if child.is_file],
            key=lambda child: child.name
        )

        sorted_children = [*sorted_child_folders, *sorted_child_files]

        children_dict = [
            self._to_dict_one_node(child_node)
            for child_node in sorted_children
        ]

        return dict(
            name=node.name,
            is_file=node.is_file,
            children=children_dict,
            path=node.path
        )

    @staticmethod
    def _validate_args(args: dict) -> dict:
        children = args.get('children', [])
        is_file = args.get('is_file', True)
        name = args.get('name', '')
        path = args.get('path', '')

        if not isinstance(name, str):
            raise FileInfoInvalidParam(
                message='name must be an instance of string')
        if not isinstance(path, str):
            raise FileInfoInvalidParam(
                message='path must be an instance of string')
        if not isinstance(is_file, bool):
            raise FileInfoInvalidParam(
                message='is_file must be an instance of bool')
        if not isinstance(children, list):
            raise FileInfoInvalidParam(message='children must be an array')
        for f in children:
            if not isinstance(f, FileInfo):
                raise FileInfoInvalidParam(
                    message='child file or folder should be an instance of FileInfo')
        if is_file and len(children):
            raise FileInfoInvalidParam(
                message='file should not contain child items')

        validated_args = dict(
            name=name,
            is_file=is_file,
            children=children,
        )
        return validated_args
