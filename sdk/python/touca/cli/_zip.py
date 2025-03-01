# Copyright 2022 Touca, Inc. Subject to Apache-2.0 License.

import logging
from argparse import ArgumentParser
from pathlib import Path

import py7zr
from touca.cli._common import Operation

logger = logging.getLogger("touca.cli.zip")


def _compress_batch(srcDir, outputDir):
    dstFile = Path(outputDir, srcDir.name + ".7z")
    if dstFile.exists():
        logger.warning(f"compressed file {dstFile} already exists")
        return False
    logger.info(f"compressing {srcDir} into {dstFile}")
    try:
        with py7zr.SevenZipFile(dstFile, "w") as archive:
            archive.writeall(srcDir, arcname=srcDir.name)
    except py7zr.ArchiveError:
        logger.warning(f"failed to compress {srcDir}")
        return False
    return True


def _compress_batches(src, out):
    src = Path(src).expanduser().resolve()
    out = Path(src).expanduser().resolve()

    if not src.exists():
        logger.error(f"directory {src} does not exist")
        return False
    for src_dir in src.glob("*"):
        if not src_dir.is_dir():
            continue
        logger.debug(f"compressing {src_dir}")
        if not out.exists():
            out.mkdir(parents=True, exist_ok=True)
        if not _compress_batch(src_dir, out):
            logger.error(f"failed to compress {src_dir}")
            return False
        logger.info(f"compressed {src_dir}")
    logger.info("compressed all sub-directories")
    return True


class Zip(Operation):
    name = "zip"
    help = "Compress binary archives"

    def __init__(self, options: dict):
        self.__options = options

    @classmethod
    def parser(self, parser: ArgumentParser):
        parser.add_argument("src", help="directory with binary files")
        parser.add_argument("out", help="directory to store compressed files")

    def run(self):
        return _compress_batches(
            src=self.__options.get("src"), out=self.__options.get("out")
        )
