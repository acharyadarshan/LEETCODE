class Solution:
    def convert(self, s: str, numRows: int) -> str:
        
        '''
        if greater than length of string , no need to iterate in zigzag  fashion,
         each line holds single char , so simply output the input string 
        '''       
        if numRows == 0 or numRows>= len(s):
            return s
        
        row  = 0
        changeRow = -1
        
        # creating res[0], res[1].....res[n] to enter char from each row
        
        res = [[]  for i in range(numRows) ]
        
        for c in s:
            res[row].append(c)
            if row == 0 or row == numRows-1:
                changeRow *= -1
            row +=  changeRow
            
        # first join the chars from nested list and join the nested list itself
        for i in (len(numRows)):
            res[i] = ''.join(res[i])
            
        Output = ''.join(res)
        
        return Output
        