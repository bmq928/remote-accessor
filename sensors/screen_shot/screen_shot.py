import logging
import pyscreenshot as ImageGrab
from io import BytesIO

__author__ = 'bmq928'
__logger__ = logging.getLogger(__name__)

def snapshot_tranferable_img():
    img = ImageGrab.grab()
    img_io = BytesIO()

    img.save(img_io, 'PNG')
    img_io.seek(0)

    return img_io