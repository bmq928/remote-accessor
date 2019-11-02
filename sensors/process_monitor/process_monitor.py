import logging
import subprocess

__author__ = 'bmq928'
__logger__ = logging.getLogger(__name__)


def poll() -> dict:
    script = 'ps -ewwwo %cpu,%mem,comm'
    metric_raw_txt = subprocess.getoutput(script)
    metric_raw_text_lines = metric_raw_txt.split('\n')[1:]
    metrics = [
        [
            metric 
            for metric in line.split(' ') if bool(metric)
        ]
        for line in metric_raw_text_lines
    ]
    cpu_metrics = [
        row[0] for row in metrics
    ]
    mem_metrics = [
        row[1] for row in metrics
    ]
    command_metrics = [
        row[2] for row in metrics
    ]
    return {
        'cpu': cpu_metrics,
        'memory': mem_metrics,
        'command': command_metrics,
    }
