def sumofsquare():
    print("enterting starting number")
    start =  int(input())
    print("enterting end number")
    end = int(input())

    sum = 0
    
    while(start <= end):
        sum += start**2
        start+=1

    return sum


def Z7differences():
    list = [[],[],[],[],[],[],[]]
    for i in range(7):
        for j in range(7):
            idx= (i-j)%7
            str = f"{i} - {j}"
            list[idx].append(str)

    return list
    



c = 0
for i in Z7differences():

    print(c, "~",i)
    c+=1