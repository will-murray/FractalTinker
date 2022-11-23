def diffSet(i):
    start = i
    list = [i]
    while((i*5) % 22 != start):
        list.append((i*5) % 22)
        i = (i*5) % 22
    return list

def mult(arr):
    i = 0
    while(i < len(arr)):
        arr[i] = (arr[i]*5)%22
        i+=1

    return arr
# for i in range(21):
#     set = diffSet(i)
#     print(set)

a = [0,11,3,15,9,1,5]
b = [0,11,4,20,12,16,14]
c = [0,11,7,13,21,17,19]
d = [0,11,2,10,6,8]

print(a, mult(a))
print(b, mult(b))
print(c, mult(c))
print(d, mult(d))



