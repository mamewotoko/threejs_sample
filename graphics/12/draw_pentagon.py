
import math

canvas_size = (800, 800)
r = 100
theta = math.pi*2/5
o = map(lambda x: x/2, canvas_size)

def pentagon_point(i):
    return map(int, (r*math.cos(theta*i)+o[0], -r*math.sin(theta*i)+o[1]))

print '<svg width="%d" height="%d" xmlns="http://www.w3.org/2000/svg">' % canvas_size
print '<circle cx="%d" cy="%d" r="%d" fill="none" stroke="black" />' % (o[0], o[1], r)
# axis
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="black" />' % (0, o[1], canvas_size[0], o[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="black" />' % (o[0], 0, o[0], canvas_size[1])

pointlist = [pentagon_point(i) for i in range(0, 5)]

for i in range(0, 5):
    fromp = pointlist[i]
    top = pointlist[(i+1)%len(pointlist)]
    print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="black" />' % (fromp[0], fromp[1], top[0], top[1])


print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="green" />' % (pointlist[0][0], pointlist[0][1], -r+o[0], o[1])

print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="green" />' % (0, pointlist[1][1], pointlist[1][0], pointlist[1][1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="green" />' % (0, pointlist[4][1], pointlist[4][0], pointlist[4][1])

## center
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="red" />' % (pointlist[4][0], pointlist[4][1], int(r*math.cos(math.pi*3/5)+o[0]), int(-r*math.sin(math.pi*3/5)+o[1]))

b = r*math.sin(4*theta)/math.cos(4*theta)
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="red" />' % (pointlist[0][0], pointlist[0][1], o[0], int(o[1]+b))
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="red" />' % (pointlist[3][0],
                                                                 pointlist[3][1],
                                                                 pointlist[3][0]-r,
                                                                 int(pointlist[3][1]+b))

print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="blue" />' % (r*math.cos(theta/2)+o[0], -r*math.sin(theta/2)+o[1], pointlist[3][0], pointlist[3][1])

bb = r*(math.sin(2*theta)*math.cos(theta/2) - math.cos(2*theta)*math.sin(theta/2))/math.cos(theta/2)

a1 = math.sin(theta/2)/math.cos(theta/2)
y2 = bb + r*a1
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="blue" />' % (pointlist[2][0], pointlist[2][1], o[0]+r, -y2+o[1])

print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="gray" stroke-dasharray="5,5" />' % (pointlist[2][0], o[1]+r,  pointlist[2][0], o[1]-r)

b3 = r*(math.sin(4*theta)*math.cos(theta/2)-math.cos(4*theta)*math.sin(theta/2))/math.cos(theta/2)
x2 = -b3/a1

expr1 = "theta = 2*math.pi/5"
expr2 = "a1 = math.sin(theta/2)/math.cos(theta/2)"
expr3 = "b3 = r*(math.sin(4*theta)*math.cos(theta/2)-math.cos(4*theta)*math.sin(theta/2))/math.cos(theta/2)"
expr4 = "x2 = -b3/a1"
expr5 = " = -r*(math.sin(4*theta)*math.cos(theta/2)-math.cos(4*theta)*math.sin(theta/2))/math.sin(theta/2)"

print '<text x="20" y="10"><tspan x="0" dy="1.2em">%s</tspan><tspan x="0" dy="1.2em">%s</tspan><tspan x="0" dy="1.2em">%s</tspan><tspan x="0" dy="1.2em">%s</tspan><tspan x="0" dy="1.2em">%s</tspan></text>' % (expr1, expr2, expr3, expr4, expr5)
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="blue" />' % (pointlist[4][0], pointlist[4][1], o[0]+x2, o[1])

# purple -> blue (y*-1)
# 1  0  
# 0 -1  
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="purple" />' % (pointlist[3][0], pointlist[3][1], o[0]+r, y2+o[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="purple" />' % (pointlist[1][0], pointlist[1][1], o[0]+int(x2), o[1])
print '<text x="%d" y="%d">(x2, 0) = (%.2f, 0)</text>' % (o[0]+x2+10, o[1]-10, x2)

# pink -> red (y*-1)
## center
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="pink" />' % (pointlist[1][0], pointlist[1][1], int(r*math.cos(math.pi*7/5)+o[0]), int(-r*math.sin(math.pi*7/5)+o[1]))
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="pink" />' % (pointlist[0][0], pointlist[0][1], o[0], int(o[1]-b))
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="pink" />' % (pointlist[2][0],
                                                                  pointlist[2][1],
                                                                  pointlist[2][0]-r,
                                                                  int(pointlist[2][1]-b))


print '<text x="%d" y="%d">Math.PI/5</text>' % (r*math.cos(theta/2)+o[0]+10, -r*math.sin(theta/2)+o[1])

#print '<line x1="" y1="" x2="" y2="" stroke="blue"/>'
print '</svg>'
