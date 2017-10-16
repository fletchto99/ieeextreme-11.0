import fileinput
import math

def f(a):
    res = [a,1,a+1,0];
    return res[a%4];

def getXor(a, b):
    return f(b)^f(a-1)

stdin = fileinput.input()
next(stdin)
for l, h, n, d1, d2 in ((int(x) for x in line.split()) for line in stdin):
    #start and end X values must be computed after since we don't know where either is in the row
    mb_start_x = (d1-n) % l
    mb_end_x = (d2-n) % l

    #Find the start and end x's
    start_x = min(mb_start_x, mb_end_x)
    end_x = max(mb_start_x, mb_end_x)

    #find where the inner rectangle rows start
    start_y = (d1-n) // l
    end_y = (d2-n) // l

    #compute the length of the grid
    size = l * h

    #compute all rows before & after the middle rectangle
    a = n
    b = n+start_y*l-1
    c = n + ((end_y+1) * l)
    d = n + size -1

    xor = 0

    #only xor the top partition if inner rectangle isn't in the first row
    if (start_y != 0):
        xor = xor^getXor(a,b)

    for i in range(start_y, end_y+1):
        #some maths to compute start & end of xor
        start_left = n + (i*l);
        end_left = start_left + start_x - 1;
        start_right = start_left + end_x + 1;
        end_right = start_left + l - 1;

        #xor left partition, row by row
        if (start_x != 0):
            xor = xor ^ getXor(start_left, end_left)

        #xor right partition,  row by row
        if (end_x != l):
            xor = xor ^ getXor(start_right, end_right)

    #xor bottom partition
    if (end_y != size / l):
        xor = xor ^ getXor(c,d);



    print(xor)
