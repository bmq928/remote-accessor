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
            children=[
                FileInfo(
                    name='folder1',
                    is_file=False,
                    children=[
                        FileInfo(
                            name='file1',
                            is_file=True
                        ),
                        FileInfo(
                            name='file2',
                            is_file=True
                        ),
                        FileInfo(
                            name='file3',
                            is_file=True
                        )
                    ]
                ),
                FileInfo(
                    name='file3',
                    is_file=True
                )
            ]
        )

        expected = dict(
            name='root',
            is_file=False,
            children=[
                dict(
                    name='folder1',
                    is_file=False,
                    children=[
                        dict(
                            name='file1',
                            is_file=True,
                            children=[]
                        ),
                        dict(
                            name='file2',
                            is_file=True,
                            children=[]
                        ),
                        dict(
                            name='file3',
                            is_file=True,
                            children=[]
                        ),
                    ]
                ),
                dict(
                    name='file3',
                    is_file=True,
                    children=[]
                ),
            ]
        )
        actual = file_info.to_dict()
        assert actual == expected
    
    def test_equal_2_FileInfo_instance_with_random_child_structure(self):
        children=[
                FileInfo(name='1', is_file=True),
                FileInfo(name='2', is_file=False),
                FileInfo(name='3', is_file=False),  
            ]
        v1_chilren = children.copy()
        random.shuffle(v1_chilren)
        v1 = FileInfo(name='asd', is_file=False,
            children=v1_chilren)

        v2_chilren = children.copy()
        random.shuffle(v2_chilren)
        v2 = FileInfo(name='asd', is_file=False,
            children=v1_chilren)
        
        assert v1 == v2

    def test_equal_2_FileInfo_instance(self):
        v1 = FileInfo(name='asd', is_file=False)
        v2 = FileInfo(name='asd', is_file=False)

        assert v1 == v2
    
    def test_FileInfo_should_not_equal_instance_which_is_not_FileInfo(self):
        v1 = FileInfo(name='asd', is_file=False)
        v2 = dict(name='asd', is_file=False, children=[])

        assert v1 != v2
