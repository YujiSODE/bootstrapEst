/* bootstrapEst.js
*
*    Copyright (c) 2016 Yuji SODE <yuji.sode@gmail.com>
*
*    This software is released under the MIT License.
*    See LICENSE.txt or http://opensource.org/licenses/mit-license.php
*/
//this creates simple interface for estimation on a value of statistic,
//with bootstrap Method (Efron,1979).
//reference:
//Efron, B. 1979. Bootstrap Methods: Another Look at the Jackknife. Ann. Statist. vol. 7, no. 1, p. 1-26.
(function(){
//============================================================================
this.window.addEventListener('load',function(){
  var slf=this.window,
      wkObj={},
      W=wkObj.wk;
  var rand10 = slf.Math.random().toFixed(10).replace(/\./g, '');
  //=== element generator. ===
  var f = function (elemName, elemId, targetId) {
    var tgt = slf.document.getElementById(targetId),
        Elm = slf.document.createElement(elemName);
    Elm.id=elemId;
    return tgt.appendChild(Elm);
  };
//====<definition of bootstrap sampling>======================================
//This function returns a set of boostrap sample,
//estimated by a set of given sample.
//A is given sample array.
var Bootstrap_def='function(A,n){var r=[],rdInt=0;for(var i=0;i<n;i+=1){rdInt=Math.floor(A.length*Math.random());r.push(A[rdInt]);}return r;};';
//====</definition of bootstrap sampling>=====================================
//
//====<a list of script>======================================================
//This list shows script that defines value of statistic.
//
//--- format: stat_def[i]=[name,script,newSampleSize,newTimeOfSimulation] ---
var stat_def=[];
  //Sum of data set
  stat_def[0]=['Sum of data set','/*Sum of data set*/\n  var sum=0,n=x.length;\n  for(var i=0;i<n;i+=1){\n    sum+= +x[i];}\n  return sum;\n/*Sum of data set*/',false,false];
  //Average of data set
  stat_def[1]=['Average of data set','/*Average of data set*/\n  var sum=0,n=x.length;\n  for(var i=0;i<n;i+=1){\n    sum+= +x[i];}\n  return sum/n;\n/*Average of data set*/\n',false,false];
  //Standard deviation of data set
  stat_def[2]=['Standard deviation of data set','/*Standard deviation of data set; x.length > 1*/\nvar sum=0,n=x.length,avg=0,dif=0,std_sub=0;\n  for(var i=0;i<n;i+=1){\n    sum+= +x[i];}\n  avg=sum/n;\n  for(var j=0;j<n;j+=1){\n    dif=x[j]-avg;\n    std_sub+=dif*dif;}\n  return Math.sqrt(std_sub/(n-1));\n/*Standard deviation of data set*/\n',2,false];
  //Free script
  stat_def[3]=['Free script','/*Free script with x=[];*/\n\n/*Free script*/\n',false,false];
//====</a list of script>=====================================================

  //id generation.
  var divId='div_'+rand10,fmId='fm_'+rand10,fmResId=fmId+'Result',
      varId='var_'+rand10,btstrpId='btstrp_'+rand10,smlNId='smlNId_'+rand10,
      slcId='slcId_'+rand10,defId='defId_'+rand10,
      runBId='run_'+rand10,logBId='log_'+rand10,
      resultId='result_'+rand10,adrsId='address_'+rand10,
      mailBId='mail_'+rand10,sbmtId='submit_'+rand10;
      var bd=slf.document.getElementsByTagName('body')[0];
       bd.id='bd_'+rand10;
      //<tag generation>
      var tgtDiv=f('div',divId,bd.id);
       bd.removeAttribute('id');

     //<form>
     var fm=f('form',fmId,divId);
      fm.name='btspEstimator';
      //form for output
     var fmResult=f('form',fmResId,divId);
      fmResult.name='btspEstimatorResult';
      fmResult.action='mailto:123.example@qwerty.com?subject='+slf.document.getElementsByTagName('title')[0].innerHTML;
      fmResult.method='post';
      fmResult.enctype='text/plain';
     //</form>

     var varLbl=f('label',varId+'label',fmId);varLbl.innerHTML='x=';
     var varInput=f('input',varId,varLbl.id);
      varInput.type='text';
      varInput.value='1,2,3,4,5,6';

     var btstrpLbl=f('label',btstrpId+'label',fmId);
      btstrpLbl.innerHTML='Size of bootstrap sample:';
     var btstrpInput=f('input',btstrpId,btstrpLbl.id);
      btstrpInput.type='number';
      btstrpInput.step=1;
      btstrpInput.min=1;
      btstrpInput.value=1;

       //<br tag>
       var Br1=f('br','br1_'+rand10,fmId);
       //</br tag>

     var smlNLbl=f('label',smlNId+'label',fmId);
      smlNLbl.innerHTML='Time of simulation:';
     var smlNInput=f('input',smlNId,smlNLbl.id);
      smlNInput.type='number';
      smlNInput.step=1;
      smlNInput.min=1;
      smlNInput.value=1;

       //<br tag>
       var Br2=f('br','br2_'+rand10,fmId);
       //</br tag>

//====== <script list and definition> ======
     var slctLbl=f('label',slcId+'label',fmId);
      slctLbl.innerHTML='Script:';
     var slct=f('select',slcId,slctLbl.id);
       var sptOpt=[];
       for(var i=0;i<stat_def.length;i+=1){
         sptOpt[i]=f('option',slcId+'_opt'+i,slcId);
         sptOpt[i].value=i;
         sptOpt[i].innerHTML=stat_def[i][0];
       }
       //<br tag>
        var Br3=f('br','br3_'+rand10,fmId);
       //</br tag>
     var defLbl=f('label',defId+'label',fmId);
      defLbl.innerHTML='definition of statistic: st(x)=';
     var defInput=f('textarea',defId,defLbl.id);
     defInput.value=stat_def[0][1];
  //<script select event>
     slct.addEventListener('change',function(){
       var currentDef=stat_def[this.value];
       /*definition about value of statistic*/
       slf.document.getElementById(defId).value=currentDef[1];
       /*size of bootstrap sample*/
       if(!!currentDef[2]){
         slf.document.getElementById(btstrpId).value=currentDef[2];}
       /*time of simulation*/
       if(!!currentDef[3]){
         slf.document.getElementById(smlNId).value=currentDef[3];}       
     },true);
  //</script select event>
//====== </script list and definition> ======

       //<br tag>
        var Br4=f('br','br4_'+rand10,fmId);
       //</br tag>

     var runB=f('input',runBId,fmId);
       runB.type='button';
       runB.value='Run';
     var logB=f('input',logBId,fmId);
       logB.type='button';
       logB.value='Log';

     //====== <script result> ======
     var resultLbl=f('label',resultId+'label',fmResId);
      resultLbl.innerHTML='Result:';
     var resultInput=f('textarea',resultId,resultLbl.id);
      resultInput.name='R';

       //<br tag>
        var Br5=f('br','br5_'+rand10,fmResId);
       //</br tag>

     //<email address for output>
     var adrsLbl=f('label',adrsId+'label',fmResId);
      adrsLbl.innerHTML='<br>Email address:';
     var adrsInput=f('input',adrsId,adrsLbl.id);
      adrsInput.type='email';
      adrsInput.value='123.example@qwerty.com';
     //</email address for output>
     //submit button
     var ipSB=f('input',sbmtId,fmResId);
     ipSB.type='submit';
     ipSB.value='Output as email';
     //<address change event>
     adrsInput.addEventListener('change',function(){
    var F=slf.document.getElementById(fmResId);
        F.action='mailto:'+this.value+'?subject='+slf.document.getElementsByTagName('title')[0].innerHTML+': '+slf.Date().replace(/\s/g,'_');
  },true);
     //</address change event>
     //====== </script result> ======
      //</tag generation>
//=== <script for worker> ===
  //n and t, are the size of bootstrap sample and time of simulation, respectively. 
  //def is definition of bootstrap sampling.
  //stDef is definition about value of statistic.
  var scpt=function(n,t,def,stDef){
    return [
      /*definition of bootstrap sampling*/
      'var btst=',
      def,
     /*head part of eventlistener*/
    'this.addEventListener(\'message\',',
    'function(e){var d=e.data;',
    'var _x=d.split(\',\'),st,R=0,T=',t,';',
    'st=function(x){',stDef,'};',
    /*dealing with given data and bootstrap sample*/
    'for(var i=0;i<',t,';i+=1){R+=st(btst(_x,',n,'));}',
    /*here returned the averaged value of statistic with T-time*/
    'this.postMessage(R/T);this.close();},',
    /*tail part of eventlistener*/
    'true);'
  ].join('');
  };
//=== </script for worker> ===
//=== <eventlisteners with worker> ===
       //to generate and run worker
       runB.addEventListener('click', function(){
             /*N: size of bootstrap sample*/
         var N=slf.document.getElementById(btstrpId).value,
             /*T: time of simulation*/
             T=slf.document.getElementById(smlNId).value,
             /*stSpt: definition about value of statistic*/
             stSpt=slf.document.getElementById(defId).value;
         //<generation of worker>
           var b = new Blob([scpt(N,T,Bootstrap_def,stSpt)], {
           type: 'text/javascript'
           });
           var objUrl = slf.window.URL.createObjectURL(b);
           W = new Worker(objUrl);
           slf.window.URL.revokeObjectURL(objUrl);
           b = null;
           //</generation of worker>
           W.addEventListener('message', function (e) {
             var d = e.data;
             resultInput.value+=d;
             resultInput.value+='\n';
             W.terminate();
             W=null;
           }, true);
           //if error in worker
           W.addEventListener('error', function (e) {
             console.log(e.message);
             W.terminate();
           }, true);
           var v=slf.document.getElementById(varId).value;
           W.postMessage(v);
       }, true);
       //log of simulation
       logB.addEventListener('click',function(){
             /*N: size of bootstrap sample*/
         var N=slf.document.getElementById(btstrpId).value,
             /*T: time of simulation*/
             T=slf.document.getElementById(smlNId).value,
             /*stSpt: definition about value of statistic*/
             stSpt=slf.document.getElementById(defId).value,
             cRight='//=== bootstrapEstimator.js ===\n',
             _date=slf.Date().replace(/\s/g,'');
         resultInput.value+=cRight+_date+'\nSample size:'+N+'\nSimulation:'+T+'\nScript:\n'+stSpt+'\n//=== '+_date+' ===\n';
       },true);
//=== </eventlisteners with worker> ===
},true);
//============================================================================
}());