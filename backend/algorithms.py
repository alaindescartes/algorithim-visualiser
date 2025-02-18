
unsortedArray = [7, 12, 9, 11, 3]


def bubble_sort(array):
    """
        Sorts a list of numbers in ascending order using the Bubble Sort algorithm.

        Parameters:
            array (list): List of numbers to be sorted.

        Returns:
            list: The sorted list.
        """
    size = len(array)
    while  size > 0:
        swapped = False
        for i in range(size - 1):
            if array[i] > array[i+1]:
                array[i], array[i+1] = array[i+1], array[i]
                swapped = True

        size -= 1
        if not swapped:
            break
    return array

def insertion_sort(array):
   """
    Sorts an array in ascending order using the Insertion Sort algorithm.
    
    Parameters:
    array (list): The list of elements to be sorted.
    
    Returns:
    list: The sorted list.
   """ 
   for current in range(1, len(array)):
       temp = array[current]
       position = current
       while position > 0 and array[position-1] > temp:
           array[position] = array[position-1]
           position -= 1

       array[position] = temp
   print(array)
   return array
insertion_sort(unsortedArray)