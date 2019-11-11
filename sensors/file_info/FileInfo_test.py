import logging
import unittest
import random

from . import FileInfo

__author__ = 'bmq928'
__logger__ = logging.getLogger(__name__)


class TestFileInfo(unittest.TestCase):
    def test_FileInfo_should_to_dict_correctly(self):
        file_info = FileInfo(
            name='root',
            is_file=False,
            path = 'root',
            children=[
                FileInfo(
                    name='folder1',
                    is_file=False,
                    path = 'root/folder1',
                    children=[
                        FileInfo(
                            name='file1',
                            path = 'root/folder1/file1',
                            is_file=True
                        ),
                        FileInfo(
                            name='file2',
                            path = 'root/folder1/file2',
                            is_file=True
                        ),
                        FileInfo(
                            name='file3',
                            path = 'root/folder1/file3',
                            is_file=True
                        )
                    ]
                ),
                FileInfo(
                    name='file3',
                    path = 'root/file3',
                    is_file=True
                )
            ]
        )

        expected = dict(
            name='root',
            is_file=False,
            path = 'root',
            children=[
                dict(
                    name='folder1',
                    is_file=False,
                    path = 'root/folder1',
                    children=[
                        dict(
                            name='file1',
                            is_file=True,
                            path = 'root/folder1/file1',
                            children=[]
                        ),
                        dict(
                            name='file2',
                            is_file=True,
                            path = 'root/folder1/file2',
                            children=[]
                        ),
                        dict(
                            name='file3',
                            is_file=True,
                            path = 'root/folder1/file3',
                            children=[]
                        ),
                    ]
                ),
                dict(
                    name='file3',
                    is_file=True,
                    path = 'root/file3',
                    children=[]
                ),
            ]
        )
        actual = file_info.to_dict()
        assert actual == expected
    
    def test_equal_2_FileInfo_instance_with_random_child_structure(self):
        children=[
                FileInfo(name='1',path='1', is_file=True),
                FileInfo(name='2',path='2', is_file=False),
                FileInfo(name='3',path='3', is_file=False),  
            ]
        v1_chilren = children.copy()
        random.shuffle(v1_chilren)
        v1 = FileInfo(name='asd', is_file=False,
            children=v1_chilren, path='asd')

        v2_chilren = children.copy()
        random.shuffle(v2_chilren)
        v2 = FileInfo(name='asd', is_file=False,
            children=v1_chilren, path='asd')
        
        assert v1 == v2

    def test_equal_2_FileInfo_instance(self):
        v1 = FileInfo(name='asd',path='asd', is_file=False)
        v2 = FileInfo(name='asd',path='asd', is_file=False)

        assert v1 == v2
    
    def test_FileInfo_should_not_equal_instance_which_is_not_FileInfo(self):
        v1 = FileInfo(name='asd',path='asd', is_file=False)
        v2 = dict(name='asd',path='asd', is_file=False, children=[])

        assert v1 != v2
