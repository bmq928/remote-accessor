import logging
import unittest

from . import process_monitor

__author__ = 'bmq928'
__logger__ = logging.getLogger(__name__)

class TestProcessMonitor(unittest.TestCase):
    def test_process_monitor_should_have_enough_attr(self):
        value = process_monitor.poll()

        cpu_metrics = value.get('cpu')
        mem_metrics = value.get('memory')
        command_metrics = value.get('command')

        assert isinstance(cpu_metrics, list)
        assert isinstance(mem_metrics, list)
        assert isinstance(command_metrics, list)

        assert len(cpu_metrics) > 0
        assert len(mem_metrics) > 0
        assert len(command_metrics) > 0