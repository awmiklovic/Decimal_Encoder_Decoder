function encodeDecimal(decimal){
  // Return error if outside range
  if(decimal < -(2**13) || decimal > (2**13) -1) return 'Outside of range';

  // First translate range from 0...16383
  var translated = decimal + 8192;

  // Copy segments of the binary string with the Bitwise AND operator
  var LoByte = translated & 0x7F;       // 00hh hhhh hlll llll
                                        // Copy first 7 bits with AND
                                        // 0000 0000 0111 1111
  var HiByte = translated >> 7 & 0x7F;  // Right shift the LoByte off
                                        // 0 0hhh hhhh
                                        // Copy first 7 bits with AND
                                        // 0 0111 1111
  var LoByteString = "";
  var HiByteString = "";

  // If the Byte is < 16 it will convert to single digit Hex
  // We'll add a '0' for proper formatting.
  if(LoByte < 0x10) LoByteString += "0";
  if(HiByte < 0x10) HiByteString += "0";

  LoByteString += LoByte.toString(16);
  HiByteString += HiByte.toString(16);

  //Formating for uppercase.
  LoByteString = LoByteString.toUpperCase();
  HiByteString = HiByteString.toUpperCase();

  return HiByteString + LoByteString;
}

function decodeHex(encodedHex){
  // Convert string to two Hex numbers.
  var HiByte = encodedHex.slice(0,2);
  var LoByte = encodedHex.slice(2);
  LoByte = parseInt("0x"+LoByte);
  HiByte = parseInt("0x"+HiByte);

  // Return error if outside range.
  if(LoByte > 0x7F || HiByte > 0x7F) return "Outside of range";

  // HiByte = 0hhh hhhh, LoByte = 0lll llll
  // We need: 00hh hhhh hlll llll

  // Start with 16 bit number.
  // decoded = 1000 0000 0000 0000
  var decoded = 2**15;

  // Left shift HiByte by 7 bits
  // 00hh hhhh h000 0000
  HiByte = HiByte << 7;

  // We will use Bitwise OR to set HiByte in decoded
  // decoded | 00hh hhhh h000 0000
  decoded = decoded | HiByte;

  // We will use Bitwise OR to set LoByte in decoded
  // decoded | 0000 0000 0lll llll
  decoded = decoded | LoByte;

  // Use XOR mask to toggle 16th bit
  var mask = 2**15;               // 1000 0000 0000 0000
  decoded = decoded ^ mask;       // 10hh hhhh hlll llll
                                  // XOR toggles bit where decoded and mask are both 1
                                  // 00hh hhhh hlll llll

  // Result is 00hh hhhh hlll llll
  // Reset Range
  decoded = decoded - 8192;
  // Convert to decimal and return.
  return decoded.toString(10);
}

//Bindings for index.html interface
var output = document.getElementById('outputEncoded')
var hexOutput = document.getElementById('outputDecoded');

function changeHandler(value){
  output.innerHTML = (encodeDecimal(parseInt(value)));
}

function hexChangeHandler(value){
  hexOutput.innerHTML = (decodeHex(value));
}
