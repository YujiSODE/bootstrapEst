/* bootstrapEst.js
*
*    Copyright (c) 2016 Yuji SODE <yuji.sode@gmail.com>
*     https://github.com/YujiSODE/bootstrapEst
*
*    This software is released under the MIT License.
*    See LICENSE.txt or http://opensource.org/licenses/mit-license.php
*/
//the simple interface for estimation of a value of statistic,
//with bootstrap Method (Efron,1979) on Firefox.
//reference:
//Efron, B. 1979. Bootstrap Methods: Another Look at the Jackknife. Ann. Statist. vol. 7, no. 1, p. 1-26.

1)
This interface estimates a value of statistic, 
with given sample "data: x", "sample size of bootstrap sample" in a simulation 
and "time of simulation".
2)
The value of statistic can be selected at "Script".
The value of statistic can be defined in JavaScript when "Free script" is 
selected at "Script".
3)
The target value of statistic is estimated and shown in "Result" with "Run" button.
The definitin of statistic is shown in "Result" with "Log" button.
4)
The log shown at "Result" can be output with "Output as email" button.
