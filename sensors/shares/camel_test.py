from unittest import TestCase

from . import camel

class CamelDict(TestCase):
    def test_dict_key_should_change_to_camel_case(self):
        test_dict = {
            'a_b': 1,
            'c_d': {
                'e_f': 2
            },
            'g_h': [{
                'a_d': 3,
                'l_h': {
                    'e_e': 4
                }
            }]
        }
        return_dict = camel._dict_to_camel_case(test_dict)
        expected_dict = {
            'aB': 1,
            'cD': {
                'eF':2
            },
            'gH': [{
                'aD': 3,
                'lH': {
                    'eE': 4
                }
            }]
        }
        assert return_dict == expected_dict
    
    def test_decorator_should_use_camelize_method_to_tranform_return_val(self):
        test_dict = {
            'a_b': 1,
            'c_d': 2
        }

        @camel.to_camel
        def gen_dict():
            return test_dict

        expected_dict = camel._dict_to_camel_case(test_dict)
        actual_dict = gen_dict()
        assert actual_dict == expected_dict

        