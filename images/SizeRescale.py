#! /usr/bin/python
# License : http://creativecommons.org/licenses/by-nc-sa/3.0/deed.en
# Module:   SizeRescale.py
# Author:   Jeong Han Lee
# email :   citadel.lee@gmail.com
# Date:     2004/04/14
# Version:  0.0.6
#
# This script changes a size of image files and file formats.
#
# Support File Formats:
#  o Full (Open/Load/Save): BMP, EPS (with ghostscript), GIF, IM, JPEG,
#    MSP, PDF, PNG, PPM, TIFF, XBM.
#  o Read only (Open/Load): ARG, CUR, DCX, FLI, FPX, GBR, GD, ICO, IMT, IPTC,
#    MCIDAS, MPEG, PhotoCD, PCX, PIXAR, PSD, TGA, SGI, SUN, TGA, WMF, XPM.
#  o Save only: PDF, EPS (without ghostscript).
#
# History:
# 0.0.0     2005/04/14   created
# 0.0.1     2005/04/15   speeding up initialization
#                        fix * problem in the MS windows
#                        add 600 x 400 size
# 0.0.2                  Almost all image file support
# 0.0.3     2005/04/21   Automatically decide landscape or portrait
#                        and consider the ratio between x and y.  
# 0.0.4     2005/08/08   Add the output file types.
# 0.0.5     2005/04/12   Add some comments and ASCII art for fun purpose.
# 0.0.5.1   2006/11/20   Modify some comments
# 0.0.6     2007/12/12   Add defaults and convert only file format
#                        -- complete rewrite ....
import os, sys
import glob
from PIL    import Image
from string import upper
from string import lower



if len(sys.argv) == 1:
    print "-------------------------------------------------------------"
    print "SizeRescale 0.0.6/2007-12-12 -- change a size of image files"
    print "-------------------------------------------------------------"
    print "Usage: SizeRescale.py  files..."
    print "     : SizeRescale.py *.jpg"
    print "     : SizeRescale.py example.jpg"
    print "     : SizeRescale.py test.bmp"
    sys.exit()
    

format_menu="""
Please, select one of Support Writing File Formats :
  o Full (Open/Load/Save): BMP, EPS (with ghostscript), GIF, IM, JPEG,
    MSP, PNG, PPM, TIFF, XBM.
  o Read only (Open/Load): ARG, CUR, DCX, FLI, FPX, GBR, GD, ICO, IMT, IPTC,
    MCIDAS, MPEG, PhotoCD, PCX, PIXAR, PSD, TGA, SGI, SUN, TGA, WMF, XPM.
  o Save only: EPS (without ghostscript).
"""

purpose_menu = """
This program has a lot of bugs and malfunctions and is for personal use.

What do you want? Pick a number (0-2):
0) Default ====  Zero Mode : Only Change a file format.
1) Wallace and Gromit Mode : Support two predefined sizes.
2)       Not Too Lazy Mode : Whatever size you want.

"""


predefined_menu = """
                   __ 
                 .'  '. 
                :      :
                | _  _ |
             .-.|(o)(o)|.-.        _._          _._
            ( ( | .--. | ) )     .',_ '.      .' _,'.
             '-/ (    ) \-'     / /' `\ \ __ / /' `\ \\
              /   '--'   \     / /     \.'  './     \ \\
              \\ `"===="` /     `-`     : _  _ :      `-`
               `\      /'              |(o)(o)|
                 `\  /'                |      |
                 /`-.-`\_             /        \\
           _..:;\._/V\_./:;.._       /   .--.   \\
         .'/;:;:;\ /^\ /:;:;:\\'.     |  (    )  | 
        / /;:;:;:;\| |/:;:;:;:\ \    _\\  '--'  /__
   jgs / /;:;:;:;:;\_/:;:;:;:;:\ \ .'  '-.__.-'   `-.

 
  Pick a size(1 or 2):  1) 640x480 (default)  2) 800x600
 
"""


user_defined_menu ="""

Type one desired size of your image file(s). The size,
which you will type, will be applied to larger one of
your original picture. If you choose nothing, 640 is
used as a default.

"""

def GetFilenames(args):
    results = []
    for a in args:
        #http://docs.python.org/lib/module-glob.html
        l = glob.glob(a)
        if len(l) > 0:
            results = results + l
        else:
            print 'There is no',a,'file. Please confirm the name of files.'
            sys.exit()
    return results


def Purpose():
    number = raw_input(purpose_menu)

    if number :
        int_num = int(number)
        if int_num == 0 or int_num == 1 or int_num == 2:
            return int_num
        else:
            print "You select a default setting: Only Change a file format"
            return 0
    else :
        print "You select a default setting: Only Change a file format"
        return 0


def PreDefinedSize():
    choose = raw_input(predefined_menu)
    if choose :
        int_choose = int(choose)
        if int_choose == 1:
            print 'You choose a size : 640x480.'
            return 640
        elif int_choose == 2:
            print 'You choose a size : 800x600.'
            return 800
        else:
            print 'You choose a default size : 640x480.'
            return 640
    else:
        print 'You choose a default size : 640x480.'
        return 640


def UserDefinedSize():
    choose = raw_input(user_defined_menu)
    if choose :
        int_choose = int(choose)
        if int_choose == 1 :
            print 'You choose an impossible minimum size. The possible minimum size is 2.'
            print 'The size is set to be 2.'
            
            return int_choose +1
        else :
            return int_choose
    else:
        print 'You choose a default size : 640x480.'
        return 640


def DesiredWriteFF():
    new_f = raw_input(format_menu)
    support_wff = ['bmp', 'eps', 'gif', 'im', 'jpeg', 'jpg', 'msp', 'png', 'ppm', 'xbm', 'tiff',
                  'xbm']
    con_wff = new_f in support_wff
    if con_wff:
        return new_f
    else :
        print 'Sorry. The file format you selected is not supported.'
        print 'A default file type : PNG is used.'
        return 'png'


def SplitFilenameSuffix(filename):
    name, suffix = os.path.splitext(filename)
    suffix = lower(suffix)
    return name, suffix

def CheckReadFileFormat(ff):
    support_rff = ['.bmp' ,'.eps'    ,'.gif','.im'   ,'.jpeg','.jpg','.msp','.png','.ppm','.xbm','.tiff', 
                   '.xbm' ,'.arg'    ,'.cur','.dcx'  ,'.fli' ,'.fpx','.gbr','.gd' ,'.ico','.imt','.iptc','.mcidas',
                   '.mpeg','.PhotoCD','.pcx','.pixar','.psd' ,'.tga','.sgi','.sun','.tga','.wmf','.xpm']
    rff_bool = ff in support_rff
    return rff_bool

def ChangeFileFormat(read_filename, new_suffix):

    name, old_suffix = SplitFilenameSuffix(read_filename)
    con_rff          = CheckReadFileFormat(old_suffix)
    
    if con_rff:
        info(read_filename)
        open_image    = Image.open(read_filename)
	save_filename = name+'.'+lower(new_suffix)
        open_image.save(save_filename, new_suffix)
        info(save_filename)

    else :
        print 'The input format *',old_suffix, 'file is not supported.'
        print 'Please, select the correct input image file.'
        sys.exit()

def ChangeFileSizeFormat(read_filename, new_suffix, new_size):
 
    name, old_suffix = SplitFilenameSuffix(read_filename)
    con_rff          = CheckReadFileFormat(old_suffix)
    
    if con_rff:
        open_image     = Image.open(read_filename)
        size_x, size_y = open_image.size
        ratio_size     = size_x/float(size_y)
        if size_x > size_y :
            aTuple  = (new_size, int(new_size/ratio_size))
        else:
            aTuple  = (int(new_size*ratio_size), new_size)

        info(read_filename)
        save_filename = name+'_rz.'+lower(new_suffix)
        open_image    = open_image.resize(aTuple, Image.ANTIALIAS)
        open_image.save(save_filename, upper(new_suffix))
        info(save_filename)

    else :
        print 'The input format ',old_suffix, 'file is not supported.'
        print 'Please, select the correct input image file.'
        sys.exit()
        
def info(filename):
    image_open = Image.open(filename)
    image_size = image_open.size
    size_x, size_y = image_size
    if size_x > size_y :
        image_type = 'Landscape.'
    else:
        image_type = 'Portrait.'
    print 'File : ',filename, ', Size :',"%dx%d" %image_size, ', File type:', image_type

    
def main():
    desired_purpose = Purpose()
    new_file_format = DesiredWriteFF()

    if new_file_format == 'jpg':
        new_file_format = 'jpeg'
    
    if desired_purpose == 0:
        for filename in GetFilenames(sys.argv[1:]):
            ChangeFileFormat(filename, new_file_format)

    elif desired_purpose == 1 or desired_purpose == 2:
        if desired_purpose == 1:
            wish_size = PreDefinedSize()
        else:
            wish_size = UserDefinedSize()

        for filename in GetFilenames(sys.argv[1:]):
            ChangeFileSizeFormat(filename, new_file_format, wish_size)

    else:
        print "Invalid Selection, try again"
        sys.exit()
                
            

if __name__ == '__main__': main()

