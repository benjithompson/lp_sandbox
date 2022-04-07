
rep = 35
inc = 1.1
start = 5
total = 0
i = 1

while (i <= rep):
    print('Retry interval ' + str(i) + ', seconds: ' + str(start) + ' (minutes: ' + str(start/60) + ')')
    total = total + start
    print('   -Total duration, minutes: ' + str(total/60) + ' (hours: ' + str(total/3600) + ')')
    start = start * inc
    i = i + 1


