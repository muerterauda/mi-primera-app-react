import * as React from "react";
import '../css/Hello.css';

export interface Props {
    name: string,
    enthusiasmLevel?: number;
}

function Hello({name, enthusiasmLevel = 1}: Props){
    if(enthusiasmLevel <= 0){
        throw new Error('Sad vacaciones!')
    }
    return (
      <div className={"hello"}>
          <div className="greeting">
              Hello {name + getExclamationMarks(enthusiasmLevel)}
          </div>
      </div>
    );
}

export default Hello;

function getExclamationMarks(numChars: number){
    return Array(numChars+1).join('!');
}