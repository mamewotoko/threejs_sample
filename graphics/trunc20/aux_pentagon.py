
import math

l = 100
canvas_size = (800, 800)
o = (canvas_size[0]/2, canvas_size[1]/2)

print '<svg width="%d" height="%d" xmlns="http://www.w3.org/2000/svg">' % canvas_size
# axis
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="black" />' % (0, o[1], canvas_size[0], o[1])
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="black" />' % (o[0], 0, o[0], canvas_size[1])

v4 = o
v0 = (v4[0]+l, v4[1])
v1 = (v0[0]+l*math.cos(math.pi*2/5), v0[1]-l*math.sin(math.pi*2/5))
v2 = (v1[0]+l*math.cos(math.pi*4/5), v1[1]-l*math.sin(math.pi*4/5))
v3 = (v4[0]+l*math.cos(math.pi*3/5), v4[1]-l*math.sin(math.pi*3/5))

print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="black" />'  % (v4 + v0)
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="black" />'  % (v0 + v1)
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="black" />'  % (v1 + v2)
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="black" />'  % (v2 + v3)
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="black" />'  % (v3 + v4)

wl = l/(2*math.cos(math.pi*2/5))
w3 = (o[0]-wl, o[1])
w1 = (v0[0]+wl, v0[1])

print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="gray" stroke-dasharray="4,4" />'  % (w3 + v3)
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="gray" stroke-dasharray="4,4" />'  % (w1 + v1)

#sholders
print '<text x="%d" y="%d">shw = l/(2*math.cos(math.pi*2/5))</text>' % v2
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="red" stroke-dasharray="4,4" />'  % (v0 + v2)
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="red" stroke-dasharray="4,4" />'  % (v1 + v3)
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="red" stroke-dasharray="4,4" />'  % (v2 + v4)
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="red" stroke-dasharray="4,4" />'  % (v3 + v0)
print '<line x1="%d" y1="%d" x2="%d" y2="%d" stroke="red" stroke-dasharray="4,4" />'  % (v4 + v1)

print '</svg>'
