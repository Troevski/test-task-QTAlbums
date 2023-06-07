test task : 

Cover Window Cropping Tool

1 Choosing window size option: horizontal (6x4cm) , square (5x5cm), vertical (4x6cm)
2 With frame or without frame
3 Upload File JPG file, not bigger than 5MB
4 Crop File
    user should see cropping window size with bleeds mask
    cropping size = window size + 5mm bleeds on each side
    without frame, image fills whole cropping size
    with frame, image is 5mm smaller than window size
    verify DPI while drawing the cropping square
5 Calculating file size. JPG files should have 300 DPI, it’s 300x300 pixels on 1x1 inch. For centimeters it’s about 118 pixels on each 1 cm.

