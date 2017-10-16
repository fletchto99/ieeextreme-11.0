import fileinput
import math

roottwopi = math.sqrt(2 * math.pi) # I del this later

def Stirling(n, __s=roottwopi, exp=math.exp):
    # approximates factorial
    if n: __s = __s / exp(n+ 1./12/n) # change lost between calls
    return pow(n, .5 + n) * __s

def nCk(b,c):
    return sterling(b)//(sterling(c)*sterling(b-c))

stdin = fileinput.input()
next(stdin)

for a, b, c in ((int(x) for x in line.split()) for line in stdin):
    print(a**nCk(b,c) % mod)


