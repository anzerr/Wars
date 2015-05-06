
var _smoothOut = function( numa, numb ) {
	var num = Math.round( Math.max(numa, numb) - Math.min(numa, numb) ), count = 0;
	while ( (num = num/10) > 9) { count += 1; }; 
	num = (Math.round(num*10)/10)+count*10;
	return ( (numa<numb)? num*-1 : (( (numa<numb+2 && numa>numb-2)? 0 : num )) );
}

var _smoothDo = function( numa, numb ) {
	return (numa<numb+2 && numa>numb-2);
}