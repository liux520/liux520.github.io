#!/usr/bin/env python3
"""
Image Processing Script - Convert images to WebP format

Usage:
    python img_process.py --input ./input_dir --output ./output_dir --quality 85 --resize 1024

Options:
    --input: Input directory containing images (required)
    --output: Output directory for converted images (default: ./output)
    --quality: WebP quality 0-100 (default: 85)
    --resize: Resize max dimension (default: no resize)
    --format: Output format - webp, jpeg, png (default: webp)


# 基本用法 - 转换为 WebP
python script/img_process.py -i public/images -o public/images/webp

# 指定质量 (0-100)
python script/img_process.py -i public/images -o public/images/webp -q 80

# 同时调整图片最大尺寸 (保持宽高比)
python script/img_process.py -i public/images -o public/images/webp -q 85 -r 1024

# 转换为 JPEG 格式
python script/img_process.py -i public/images -o public/images/jpeg -f jpeg

# 转换为 PNG 格式
python script/img_process.py -i public/images -o public/images/png -f png

# 预览模式 (不实际转换)
python script/img_process.py -i public/images --dry-run
"""

import os
import sys
import argparse
from pathlib import Path
from PIL import Image
import warnings

# Suppress PIL warnings
warnings.filterwarnings('ignore', category=UserWarning)

SUPPORTED_INPUT_FORMATS = {'.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.tif', '.webp'}
OUTPUT_FORMATS = {'webp', 'jpeg', 'png'}


def get_output_format(img_path, target_format):
    """Determine the output file extension."""
    if target_format == 'jpeg':
        return '.jpg'
    return f'.{target_format}'


def process_image(input_path, output_path, quality, max_dimension=None, target_format='webp'):
    """
    Process a single image: resize and convert to target format.

    Args:
        input_path: Path to input image
        output_path: Path to save output image
        quality: Quality for lossy compression (0-100)
        max_dimension: Maximum width/height (resize maintaining aspect ratio)
        target_format: Output format (webp, jpeg, png)
    """
    try:
        with Image.open(input_path) as img:
            # Convert RGBA to RGB for formats that don't support transparency
            if img.mode == 'RGBA' and target_format in ['jpeg', 'webp']:
                # Create white background for transparent images
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[3])
                img = background
            elif img.mode not in ['RGB', 'RGBA', 'L', 'LA']:
                img = img.convert('RGB')

            # Resize if needed
            if max_dimension:
                original_size = img.size
                if max(original_size) > max_dimension:
                    ratio = max_dimension / max(original_size)
                    new_size = tuple(int(dim * ratio) for dim in img.size)
                    img = img.resize(new_size, Image.Resampling.LANCZOS)
                    print(f"  Resized: {original_size[0]}x{original_size[1]} -> {img.size[0]}x{img.size[1]}")

            # Save with appropriate options
            save_kwargs = {
                'quality': quality if target_format != 'png' else None,
            }

            if target_format == 'webp':
                save_kwargs['method'] = 6  # Best compression
                save_kwargs['lossless'] = False
            elif target_format == 'png':
                save_kwargs.pop('quality', None)
                save_kwargs['optimize'] = True

            img.save(output_path, target_format.upper(), **save_kwargs)

            # Calculate compression ratio
            original_size = os.path.getsize(input_path)
            new_size = os.path.getsize(output_path)
            ratio = (1 - new_size / original_size) * 100 if original_size > 0 else 0

            print(f"  ✓ {input_path.name} -> {output_path.name}")
            print(f"    Size: {original_size / 1024:.1f} KB -> {new_size / 1024:.1f} KB ({ratio:+.1f}%)")

    except Exception as e:
        print(f"  ✗ Error processing {input_path.name}: {e}")
        return False
    return True


def main(input_path, output_path, quality, resize=None, format='webp', dry_run=False):

    # Validate arguments
    if not 0 <= quality <= 100:
        print("Error: Quality must be between 0 and 100")
        return 1

    input_dir = Path(input_path)
    output_dir = Path(output_path)

    if not input_dir.exists():
        print(f"Error: Input directory '{input_dir}' does not exist")
        return 1

    # Collect all supported images
    image_files = [
        f for f in input_dir.iterdir()
        if f.is_file() and f.suffix.lower() in SUPPORTED_INPUT_FORMATS
    ]

    if not image_files:
        print(f"No supported images found in '{input_dir}'")
        return 0

    print(f"\n{'='*60}")
    print(f"Image Processing - {format.upper()} Conversion")
    print(f"{'='*60}")
    print(f"Input:  {input_dir}")
    print(f"Output: {output_dir}")
    print(f"Format: {format}")
    print(f"Quality: {quality}")
    if resize:
        print(f"Resize:  Max dimension = {resize}px")
    print(f"Files:   {len(image_files)} images")
    print(f"{'='*60}\n")

    if dry_run:
        print("Dry run mode - no files will be converted:\n")
        for img_file in image_files:
            output_ext = get_output_format(img_file, format)
            output_path = output_dir / (img_file.stem + output_ext)
            print(f"  {img_file.name} -> {output_path.name}")
        return 0

    # Create output directory
    output_dir.mkdir(parents=True, exist_ok=True)

    # Process images
    success_count = 0
    for img_file in image_files:
        output_ext = get_output_format(img_file, format)
        output_path = output_dir / (img_file.stem + output_ext)

        print(f"\nProcessing: {img_file.name}")
        if process_image(img_file, output_path, quality, resize, format):
            success_count += 1

    # Summary
    print(f"\n{'='*60}")
    print(f"Completed: {success_count}/{len(image_files)} images converted")
    print(f"{'='*60}")

    return 0 if success_count == len(image_files) else 1


if __name__ == '__main__':
    main(
        input_path='../public/papers',
        output_path='../public/papers',
        quality=80,
        resize=None,
        format='webp',
        dry_run=False,
    )
