import cv2
import numpy as np
import pyscreenshot as ImageGrab


class ScreenRecordCamera(object):
    def get_frame(self):
        img = ImageGrab.grab()
        img_np = np.array(img)
        img_rgb = cv2.cvtColor(img_np, cv2.COLOR_BGR2RGB)
        ret, jpeg = cv2.imencode('.jpg', img_rgb)
        return jpeg.tobytes()

    def __del__(self):
        cv2.destroyAllWindows()
