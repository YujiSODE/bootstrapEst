/* bootstrapMdl.js
*
*    Copyright (c) 2016 Yuji SODE <yuji.sode@gmail.com>
*
*    This software is released under the MIT License.
*    See LICENSE.txt or http://opensource.org/licenses/mit-license.php
*/
//the simple interface for estimation of a value of statistic, with bootstrap Method (Efron,1979) on Firefox.
//reference:
//Efron, B. 1979. Bootstrap Methods: Another Look at the Jackknife. Ann. Statist. vol. 7, no. 1, p. 1-26.
var bootstrap=function(A,n){
  var r=[],rdInt=0;
  for (var i=0;i<n;i+=1){
    rdInt=Math.floor(A.length*Math.random());
    r.push(A[rdInt]);
  }
  return r;
};
var Bootstrap_def = 'function(A,n){var r=[],rdInt=0;for(var i=0;i<n;i+=1){rdInt=Math.floor(A.length*Math.random());r.push(A[rdInt]);}return r;};';