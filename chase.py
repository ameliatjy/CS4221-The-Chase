# This is not the full CHASE algorithm, just a variation of it that I use to check if a FD can be derived from the other FDs in the minimal cover

# is_derivable function that functions like the CHASE algorithm and returns True if the FD can be derived from the other FDs in the minimal cover
def is_derivable(R, min_cover, fd):
    # print('--' * 50)
    # print('\n')

    # Create a table with columns in R and two rows
    # For each cell, the value is an alphabet of the form 'a', 'b', 'c', etc. But add an integer for the row rumber so that the value is 'a1', 'b1', 'c1', etc. for the first row and 'a2', 'b2', 'c2', etc. for the second row
    table = [[chr(i) + str(j) for i in range(ord('a'), ord('a') + len(R))] for j in range(1, 3)] 

    # print('Starting table {} while checking if {} can be derived'.format(table, fd))
    # print('\n')

    # Set the chase
    # We want to chase fd 
    # Look at the LHS of fd, find the corresponding columns in the table.
    # For the corresponding columns, take their values from the first row and put them in the second row but keep the rest of the values in the second row the same
    for attr in fd[0]:
       index = R.index(attr)
       table[1][index] = table[0][index]

    # print('After setting the chase, table is now {}'.format(table))
    # print('\n')

    # For each FD in the minimal cover
    # If the values of the columns in the LHS are the same in the first and second rows, then take the values of the columns of the RHS from the first row and put them in the second row
    # Remove fd from a copy of the minimal cover
    min_cover_copy = min_cover.copy()
    min_cover_copy.remove(fd)

    fds_used = []

    # Until there are no changes in the table, loop through the FDs in the minimal cover and set the chase
    while True:
        # Make a copy of the table
        table_copy = [row[:] for row in table]
        # Create a list of FDs that I have already used to set the chase

        # For each FD in the minimal cover
        for fd1 in min_cover_copy:
            # Check if fd1 already exists in the list of FDs used to set the chase
            if fd1 in fds_used:
                continue

            if all([table[0][R.index(attr)] == table[1][R.index(attr)] for attr in fd1[0]]):
                # print('All the values of the columns in the LHS of {} are the same in the first and second rows'.format(fd1))

                for attr in fd1[1]:
                    table[1][R.index(attr)] = table[0][R.index(attr)]
                # print('After updating the second row, table is now {}'.format(table))

                fds_used.append(fd1)
            
            # print('List of FDs used to set the chase is {}'.format(fds_used))
            # print('\n')  

        # If there are no changes in the table, then we can derive fd from the other FDs in the minimal cover

        if table == table_copy:
            # print('No changes in the table after setting the chase for the other FDs in the minimal cover')
            break
    
    # print('After setting the chase for the minimal cover, table is now {}'.format(table))
    # print('\n')

    # If the values of the columns in the LHS of fd are the same in the first and second rows and we observe that the values of the columns in the RHS of fd are the same in the first and second rows, then we can derive fd from the other FDs in the minimal cover
    if all([table[0][R.index(attr)] == table[1][R.index(attr)] for attr in fd[0]]) and all([table[0][R.index(attr)] == table[1][R.index(attr)] for attr in fd[1]]):
        # print('All the values of the columns in the LHS of {} are the same in the first and second rows'.format(fd))
        # print('All the values of the columns in the RHS of {} are the same in the first and second rows'.format(fd))
        # print('We can derive {} from the other FDs in the minimal cover'.format(fd))
        return True

    return False

