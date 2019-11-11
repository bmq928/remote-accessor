from humps.camel import case


def to_camel(fn):
    def camelize_return_val_fn_wrapper(*args, **kargs):
        original_val = fn(*args, **kargs)
        camel_case_val = _dict_to_camel_case(original_val)
        return camel_case_val

    camelize_return_val_fn_wrapper.__name__ = fn.__name__
    return camelize_return_val_fn_wrapper


def _dict_to_camel_case(dict_obj: dict):
    camel_obj = {}

    for key, val in dict_obj.items():
        camel_key = case(key)
        camel_val = None
        if isinstance(val, list):
            camel_val = [
                _dict_to_camel_case(item) if isinstance(item, dict) else item
                for item in val
            ]
        elif isinstance(val, dict):
            camel_val = _dict_to_camel_case(val)
        else:
            camel_val = val

        camel_obj[camel_key] = camel_val

    return camel_obj
