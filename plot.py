import numpy as np
import matplotlib.pyplot as plt
import math

def lon_function(x):
    return 114.6 * d

vecfunc = np.vectorize(lon_function)

d = np.arange(0.0, 40.0, 0.01)
T = lon_function(d)
plt.plot (d, T, 'bo', d, T, 'k')
plt.show()