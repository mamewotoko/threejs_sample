
import math

canvas_size = (800, 800)
r = 100
theta = math.pi*2/3
o = map(lambda x: x/2, canvas_size)
l = r*math.sqrt(3)
h = l*math.cos(math.pi/6)

def points(i):
    return map(int, (r*math.cos(theta*i)+o[0], -r*math.sin(theta*i)+o[1]))

print '<svg width="%d" height="%d" xmlns="http://www.w3.org/2000/svg">' % canvas_size
print '<circle cx="%d" cy="%d" r="%d" fill="none" stroke="black" />' % (o[0], o[1], r)
print '<circle cx="%d" cy="%d" r="%d" fill="none" stroke="purple" />' % (o[0], o[1], l)

# axis
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="black" />' % (0, o[1], canvas_size[0], o[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="black" />' % (o[0], 0, o[0], canvas_size[1])

pointlist = [points(i) for i in range(0, 3)]

for i in range(0, len(pointlist)):
    fromp = pointlist[i]
    top = pointlist[(i+1)%len(pointlist)]
    print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="black" />' % (fromp[0], fromp[1], top[0], top[1])

print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="green" />' % (pointlist[1][0], pointlist[1][1], pointlist[0][0]+r, pointlist[1][1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="green" />' % (pointlist[2][0], pointlist[2][1], pointlist[0][0]+r, pointlist[2][1])

#
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="green" />' % (pointlist[0][0], pointlist[0][1], o[0]-r, o[1]-2*r*math.tan(math.pi/3))
#minus
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="green" />' % (pointlist[0][0], pointlist[0][1], o[0]-r, o[1]+2*r*math.tan(math.pi/3))

# y = math.sqrt(3) * x + math.sqrt(3)*r
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="green" />' % (r+o[0], -2*math.sqrt(3)*r+o[1], -2*r+o[0], math.sqrt(3)*r+o[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="green" />' % (r+o[0], 2*math.sqrt(3)*r+o[1], -2*r+o[0], -math.sqrt(3)*r+o[1])
p0up = (pointlist[0][0], pointlist[0][1]-l)

print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="gray" stroke-dasharray="4,4" />' % (pointlist[0][0], pointlist[0][1], p0up[0], p0up[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="gray" stroke-dasharray="4,4" />' % (pointlist[1][0], pointlist[1][1], p0up[0], p0up[1])

print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="gray" stroke-dasharray="4,4" />' % (pointlist[0][0], pointlist[0][1], pointlist[0][0], pointlist[0][1]+l)
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="gray" stroke-dasharray="4,4" />' % (pointlist[2][0], pointlist[2][1], pointlist[0][0], pointlist[0][1]+l)

p0left = (pointlist[0][0]-2*h, pointlist[0][1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="gray" stroke-dasharray="4,4" />' % (pointlist[1][0], pointlist[1][1], p0left[0], p0left[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="gray" stroke-dasharray="4,4" />' % (pointlist[2][0], pointlist[2][1], p0left[0], p0left[1])

p1right = (pointlist[1][0]+2*h, pointlist[1][1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="gray" stroke-dasharray="4,4" />' % (pointlist[0][0], pointlist[0][1], p1right[0], p1right[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="gray" stroke-dasharray="4,4" />' % (p0up[0], p0up[1], p1right[0], p1right[1])

p2right = (pointlist[2][0]+2*h, pointlist[2][1])
p0down = (pointlist[0][0], pointlist[0][1]+l)
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="gray" stroke-dasharray="4,4" />' % (pointlist[0][0], pointlist[0][1], p2right[0], p2right[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="gray" stroke-dasharray="4,4" />' % (p0down[0], p0down[1], p2right[0], p2right[1])

p1up = (pointlist[1][0], pointlist[1][1]-l)
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="gray" stroke-dasharray="4,4" />' % (p1up[0], p1up[1], pointlist[1][0], pointlist[1][1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="gray" stroke-dasharray="4,4" />' % (p1up[0], p1up[1], p0up[0], p0up[1])

p2down = (pointlist[2][0], pointlist[2][1]+l)
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="gray" stroke-dasharray="4,4" />' % (p2down[0], p2down[1], pointlist[2][0], pointlist[2][1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="gray" stroke-dasharray="4,4" />' % (p2down[0], p2down[1], p0down[0], p0down[1])

p0leftup = (p0left[0], p0left[1]-l)
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="gray" stroke-dasharray="4,4" />' % (p0left[0], p0left[1], p0leftup[0], p0leftup[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="gray" stroke-dasharray="4,4" />' % (pointlist[1][0], pointlist[1][1], p0leftup[0], p0leftup[1])

p0leftdown = (p0left[0], p0left[1]+l)

print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="gray" stroke-dasharray="4,4" />' % (p0left[0], p0left[1], p0leftdown[0], p0leftdown[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="gray" stroke-dasharray="4,4" />' % (pointlist[2][0], pointlist[2][1], p0leftdown[0], p0leftdown[1])

print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="blue" stroke-dasharray="4,4" />' % (o[0]-2*r, o[1]-2*math.sqrt(3)*r, o[0]+2*r, o[1]+2*math.sqrt(3)*r)

print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="blue" stroke-dasharray="4,4" />' % (o[0]-2*r, o[1]+2*math.sqrt(3)*r, o[0]+2*r, o[1]-2*math.sqrt(3)*r)

#6
phi = 2*math.pi/6
q0 = (l*math.cos(0)+o[0], -l*math.sin(0)+o[1])
q1 = (l*math.cos(phi)+o[0], -l*math.sin(phi)+o[1])
q2 = (l*math.cos(2*phi)+o[0], -l*math.sin(2*phi)+o[1])
q3 = (l*math.cos(3*phi)+o[0], -l*math.sin(3*phi)+o[1])
q4 = (l*math.cos(4*phi)+o[0], -l*math.sin(4*phi)+o[1])
q5 = (l*math.cos(5*phi)+o[0], -l*math.sin(5*phi)+o[1])

print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="pink" />' % (q0[0], q0[1], q1[0], q1[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="pink" />' % (q1[0], q1[1], q2[0], q2[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="pink" />' % (q2[0], q2[1], q3[0], q3[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="pink" />' % (q3[0], q3[1], q4[0], q4[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="pink" />' % (q4[0], q4[1], q5[0], q5[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="pink" />' % (q5[0], q5[1], q0[0], q0[1])


#print '<line x1="" y1="" x2="" y2="" stroke="blue"/>'
print '</svg>'

