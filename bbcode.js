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
        var i=state.i;//save the pos
        var data = renderBlock(state);
        if(data !== null && type.bbcode[data.code] !== "undefined"){
          
        }
        state.i = i;
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
