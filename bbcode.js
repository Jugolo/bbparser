var Bbcode = (
  function renderBlock(state){
    var result = {};
    result.code = getCode(state);
    if(state.s.charAt(state.i) === "="){
      result.attribute = "";
      state.i++;
      for(;state.i<state.s.length;state.i++){
        if(state.s.charAt(state.i) == "]"){
          break;
        }
        result.attribute += state.s.charAt(state.i);
      }
    }
    if(state.s.charAt(state.i) !== "]"){
      return null;
    }
    return result;
  }
  
  function renderString(obj, state){
    var buffer = "";
    
    for(;state.i<state.s.length;state.i++){
      if(state.s.charAt(state.i) == "["){
         if(state.s.charAt(state.i+1) == "/"){
           return buffer;
         }else{
           var i = state.i;
           var block = renderBlock(state);
           if(block != null && typeof obj.bbcode[block.code] !== "undefined"){
             var str = renderString(obj, state);
             if(state.s.charAt(state.i) === "[" && state.s.charAt(state.i+1) === "/"){
               state.i++;
               var end = renderBlock(state);
               if(end !== null && end.code === block.code){
                 return obj.bbcode[block.code].open(block.attribute)+buffer+obj.bbcode[block.code].end();
               }
             }
           }
           state.i = i;
         }
      }
      
      buffer += state.s.charAt(state.i);
    }
    
    return buffer;
  }
  
  function Bbcode(){
    this.bbcode = {};
  }
  
  Bbcode.prototype.render = function(str){
    var state = {
      i : 0,
      s : str
    };
    return renderString(this, state);
  };
  
  return Bbcode;
)();
