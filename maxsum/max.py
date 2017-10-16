import fileinput
from itertools import islice


stdin = fileinput.input()
lists = [(int(x) for x in line.split()) for line in islice(stdin,2,None,2)]

for lst in lists:
    srted = sorted(lst)
    append = True
    final_lst = [];
    for i in range(0, len(srted)):
        if append:
            final_lst.append(srted.pop())
        else:
            final_lst.insert(0, srted.pop())
        append =  not append

    total = 0;
    for i in range(0, len(final_lst) - 1):
        total = total + (final_lst[i] * final_lst[i+1])

    print(total)

    # Move zeros up front
    while(final_lst[len(final_lst)-1] == 0):
        final_lst.insert(0, final_lst.pop())
    s = ""
    for item in final_lst:
        s += str(item) + " ";
    print(s.strip())
