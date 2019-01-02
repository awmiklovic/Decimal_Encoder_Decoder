#Encoding Function
This function needs to accept a signed integer in the 14-bit range [-8192..+8191] and return a 4 character string.

The encoding process is as follows:

1. Add 8192 to the raw value, so its range is translated to [0..16383]
2. Pack that value into two bytes such that the most significant bit of each is cleared.

Unencoded intermediate value (as a 16-bit integer):
  00HHHHHH HLLLLLLL

Encoded value:
  0HHHHHHH 0LLLLLLL

3. Format the two bytes as a single 4-character hexadecimal string and return it.

#Decoding Function
Your decoding function should accept two bytes on input, both in the range [0x00..0x7F] and recombine them to return the corresponding integer between [-8192..+8191]
