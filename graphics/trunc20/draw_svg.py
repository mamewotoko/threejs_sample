
import math

canvas_size = (800, 800)
r6 = 100
theta = math.pi*2/6
o = map(lambda x: x/2, canvas_size)
l = r6
r5 = l/(2*math.sin(math.pi/5))
h5 = r5*(1+math.cos(math.pi/5))
h = l*math.cos(math.pi/6)

def points(i):
    return map(int, (r6*math.cos(theta*i)+o[0], -r6*math.sin(theta*i)+o[1]))

print '<svg width="%d" height="%d" xmlns="http://www.w3.org/2000/svg">' % canvas_size
print '<circle cx="%d" cy="%d" r="%d" fill="none" stroke="black" />' % (o[0], o[1], r6)

# axis
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="black" />' % (0, o[1], canvas_size[0], o[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="black" />' % (o[0], 0, o[0], canvas_size[1])

pointlist = [points(i) for i in range(0, 6)]

for i in range(0, len(pointlist)):
    fromp = pointlist[i]
    top = pointlist[(i+1)%len(pointlist)]
    print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="black" />' % (fromp[0], fromp[1], top[0], top[1])

print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="green" stroke-dasharray="4,4" />' % (pointlist[0][0], pointlist[0][1], pointlist[0][0], 0)
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="green" stroke-dasharray="4,4" />' % (pointlist[3][0], pointlist[3][1], pointlist[3][0], 0)
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="green" stroke-dasharray="4,4" />' % (pointlist[1][0], pointlist[1][1], pointlist[1][0], 0)
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="green" stroke-dasharray="4,4" />' % (pointlist[2][0], pointlist[2][1], pointlist[2][0], 0)

up6_0 = [pointlist[0][0], pointlist[1][1]-r6*math.sin(math.pi/3)]
up6_1 = [pointlist[1][0], pointlist[1][1]-2*r6*math.sin(math.pi/3)]
up6_2 = [pointlist[2][0], pointlist[1][1]-2*r6*math.sin(math.pi/3)]
up6_3 = [pointlist[3][0], pointlist[2][1]-r6*math.sin(math.pi/3)]

print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="green" />' % (pointlist[1][0], pointlist[1][1], up6_0[0], up6_0[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="green" />' % (up6_1[0], up6_1[1], up6_0[0], up6_0[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="green" />' % (up6_1[0], up6_1[1], up6_2[0], up6_2[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="green" />' % (up6_3[0], up6_3[1], up6_2[0], up6_2[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="green" />' % (up6_3[0], up6_3[1], pointlist[2][0], pointlist[2][1])

## rotate 0-1 -3*Math.pi/5:   math.pi - math.pi/3 - 3*math.pi/5 = math.pi/15
bottom1 = [l*math.cos(math.pi/15)+pointlist[0][0], -l*math.sin(math.pi/15)+pointlist[0][1]]

print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="pink" />' % (pointlist[0][0], pointlist[0][1], bottom1[0], bottom1[1])

print '<text x="%d" y="%d">Math.PI/15</text>' % (bottom1[0], bottom1[1])


bottom2 = [l*math.cos(math.pi*4/15)+pointlist[1][0], -l*math.sin(math.pi*4/15) + pointlist[1][1]]

print '<circle cx="%d" cy="%d" r="%d" stroke-dasharray="4,4" fill="none" stroke="gray" />' % (pointlist[0][0], pointlist[0][1], l)
print '<circle cx="%d" cy="%d" r="%d" stroke-dasharray="4,4" fill="none" stroke="gray" />' % (pointlist[1][0], pointlist[1][1], l)

## top
o2top_len = r6*math.sin(math.pi/3) + h5
bottom3 = [o2top_len*math.cos(math.pi/6)+o[0], -o2top_len*math.sin(math.pi/6)+o[1]]
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="pink" stroke-dasharray="4,4" />' % (o[0], o[1], bottom3[0], bottom3[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="pink" />' % (bottom1[0], bottom1[1], bottom3[0], bottom3[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="pink" />' % (bottom2[0], bottom2[1], bottom3[0], bottom3[1])

#0 move line
bottom1move = [bottom1[0]-o2top_len*math.cos(math.pi/6), bottom1[1]+o2top_len*math.sin(math.pi/6)]
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="pink" stroke-dasharray="4,4" />' % (bottom1move[0], bottom1move[1], bottom1[0], bottom1[1])

bottom2move = [bottom2[0]-o2top_len*math.cos(math.pi/6), bottom2[1]+o2top_len*math.sin(math.pi/6)]
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="pink" stroke-dasharray="4,4" />' % (bottom2move[0], bottom2move[1], bottom2[0], bottom2[1])

print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="pink" />' % (pointlist[1][0], pointlist[1][1], bottom2[0], bottom2[1])

right6_4 = [pointlist[5][0] + r6*math.cos(-math.pi/3), pointlist[5][1] - r6*math.sin(-math.pi/3)]

print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="red" />' % (pointlist[5][0], pointlist[5][1], right6_4[0], right6_4[1])

right6_5 = [right6_4[0]+r6, right6_4[1]]

print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="red" />' % (right6_5[0], right6_5[1], right6_4[0], right6_4[1])
right6_1 = [pointlist[0][0]+r6, pointlist[0][1]]
right6_0 = [right6_1[0] + r6*math.cos(-math.pi/3), right6_1[1] - r6*math.sin(-math.pi/3)]

print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="red" />' % (right6_1[0], right6_1[1], right6_0[0], right6_0[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="red" />' % (right6_5[0], right6_5[1], right6_0[0], right6_0[1])

print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="red" stroke-dasharray="4,4"/>' % (right6_1[0], right6_1[1], pointlist[1][0], pointlist[1][1])

print '</svg>'
