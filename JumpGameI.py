
"""Start from left and check the max reach from that index , increase your index and check the max reach from 
 
the previous and current index combined - follow until max reach >= last index"""
 
class Solution:
    def canJump(self, nums: List[int]) -> bool:
        
        maxReach = nums[0]
        for index in range(1,len(nums)):
            if index > maxReach:
                return False
            
            maxDistReach = max( maxReach, i + nums[i] )
        
        return True