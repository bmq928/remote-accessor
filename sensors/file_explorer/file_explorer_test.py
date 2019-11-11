import logging
import unittest
import os
import shutil
from os import path

from file_info import FileInfo
from . import file_explorer

__author__ = 'bmq928'
__logger__ = logging.getLogger(__name__)

ROOT_TEST_FOLDER = path.join(os.getcwd(), '__test__')


class TestFileExplorer(unittest.TestCase):

    def setUp(self):
        os.mkdir(ROOT_TEST_FOLDER)
        os.mkdir(path.join(ROOT_TEST_FOLDER, 'folder1'))
        os.mkdir(path.join(ROOT_TEST_FOLDER, 'folder2'))
        os.mkdir(path.join(ROOT_TEST_FOLDER, 'folder1', 'folder3'))
        self.touch_file(path.join(ROOT_TEST_FOLDER, 'folder1', 'a.txt'))
        self.touch_file(path.join(ROOT_TEST_FOLDER, 'folder1', 'b.txt'))
        self.touch_file(path.join(ROOT_TEST_FOLDER, 'folder1', 'c.txt'))
        self.touch_file(path.join(ROOT_TEST_FOLDER, 'folder2', 'd.txt'))
        self.touch_file(path.join(ROOT_TEST_FOLDER, 'folder2', 'e.txt'))
        self.touch_file(path.join(ROOT_TEST_FOLDER,
                                  'folder1', 'folder3', 'g.txt'))
        self.touch_file(path.join(ROOT_TEST_FOLDER,
                                  'folder1', 'folder3', 'h.txt'))
        self.touch_file(path.join(ROOT_TEST_FOLDER,
                                  'folder1', 'folder3', 'j.txt'))
        self.touch_file(path.join(ROOT_TEST_FOLDER,
                                  'folder1', 'folder3', 'k.txt'))

    def tearDown(self):
        shutil.rmtree(ROOT_TEST_FOLDER, ignore_errors=True)

    @staticmethod
    def touch_file(file_name, content='nah'):
        with open(file_name, 'a+') as f:
            f.write(content)

    def test_directory_not_exist_should_raise_exception(self):
        invalid_path = 'adsj/asdjfl/asdf'
        try:
            file_explorer.explore(invalid_path)
        except FileNotFoundError as error:
            assert str(error) == 'directory is not existed'

    def test_should_explore_right_value(self):
        actual = file_explorer.explore(ROOT_TEST_FOLDER, depth=10)
        expected = FileInfo(
            name=path.basename(ROOT_TEST_FOLDER),
            is_file=False,
            path=ROOT_TEST_FOLDER,
            children=[
                FileInfo(
                    name='folder1',
                    is_file=False,
                    path=path.join(ROOT_TEST_FOLDER, 'folder1'),
                    children=[
                        FileInfo(
                            name='folder3',
                            is_file=False,
                            path=path.join(ROOT_TEST_FOLDER, 'folder1', 'folder3'),
                            children=[
                                FileInfo(
                                    name='g.txt',
                                    is_file=True,
                                    children=[],
                                    path=path.join(ROOT_TEST_FOLDER, 'folder1', 'folder3', 'g.txt'),
                                ),
                                FileInfo(
                                    name='h.txt',
                                    is_file=True,
                                    children=[],
                                    path=path.join(ROOT_TEST_FOLDER, 'folder1', 'folder3', 'h.txt'),
                                ),
                                FileInfo(
                                    name='j.txt',
                                    is_file=True,
                                    children=[],
                                    path=path.join(ROOT_TEST_FOLDER, 'folder1', 'folder3', 'j.txt'),
                                ),
                                FileInfo(
                                    name='k.txt',
                                    is_file=True,
                                    children=[],
                                    path=path.join(ROOT_TEST_FOLDER, 'folder1', 'folder3', 'k.txt'),
                                ),
                            ]
                        ),
                        FileInfo(
                            name='a.txt',
                            is_file=True,
                            children=[],
                            path=path.join(ROOT_TEST_FOLDER, 'folder1', 'a.txt'),
                        ),
                        FileInfo(
                            name='b.txt',
                            is_file=True,
                            children=[],
                            path=path.join(ROOT_TEST_FOLDER, 'folder1', 'b.txt'),
                        ),
                        FileInfo(
                            name='c.txt',
                            is_file=True,
                            children=[],
                            path=path.join(ROOT_TEST_FOLDER, 'folder1', 'c.txt'),
                        ),
                    ]
                ),
                FileInfo(
                    name='folder2',
                    is_file=False,
                    path=path.join(ROOT_TEST_FOLDER, 'folder2'),
                    children=[
                        FileInfo(
                            name='d.txt',
                            is_file=True,
                            children=[],
                            path=path.join(ROOT_TEST_FOLDER, 'folder2', 'd.txt'),
                        ),
                        FileInfo(
                            name='e.txt',
                            is_file=True,
                            path=path.join(ROOT_TEST_FOLDER, 'folder2', 'e.txt'),
                            children=[]
                        ),
                    ]
                ),
            ]
        )

        assert actual == expected
    
    def test_depth_param_should_limit_return_value(self):
        actual = file_explorer.explore(ROOT_TEST_FOLDER, depth=2)
        expected = FileInfo(
            name=path.basename(ROOT_TEST_FOLDER),
            is_file=False,
            path=ROOT_TEST_FOLDER,
            children=[
                FileInfo(
                    name='folder1',
                    is_file=False,
                    children=[],
                    path=path.join(ROOT_TEST_FOLDER, 'folder1')
                ),
                FileInfo(
                    name='folder2',
                    is_file=False,
                    children=[],
                    path=path.join(ROOT_TEST_FOLDER, 'folder2')
                ),
            ]
        )

        assert actual == expected
