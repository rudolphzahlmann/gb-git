#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import with_statement
from fabric.api import cd, run, env

env.hosts = ['grabowskiboell@s15.wservices.ch']

# def deploy():
#     '''deploys to www.bueroklotz.de'''

#     with cd('domains/bueroklotz.de/bueroklotz'):
#         run('/home/bueroklotz/private/path/fossil up')
#         run('find . -type f -name "*.pyc"|xargs rm')
#     run('/home/bueroklotz/init/bueroklotz restart')


def batman():
    '''deploys to batman.grabowski-boell.de'''

    with cd('domains/grabowski-boell.de/batman'):
        run('/home/grabowskiboell/private/PATH/fossil up')
        run('find . -type f -name "*.pyc" -delete')
    run('/home/grabowskiboell/init/batman restart')
