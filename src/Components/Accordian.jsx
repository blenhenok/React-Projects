import { useState } from "react";
import Data from "../Data.js";

function Accordian() {
  const [selected, setSelected] = useState(null); //null means no item is selected initially
  const [multiple, setMultiple] = useState([]); // [] indicates it holds array of ids
  const [enablemulti, setEnablemulti] = useState(false); //false means default is single selection

  function handleSingleSelection(getId) {
    setSelected(getId === selected ? null : getId);
  }

  function handlemultipleselection(getId) {
    let multiple2 = [...multiple]; //copy the array
    const findCurrentId = multiple2.indexOf(getId); //checks if the id is already opened

    if (findCurrentId === -1) {
      multiple2.push(getId); //-1 means array not found and is not opened so it pushes the array of ids to be opened
    } else {
      multiple2.splice(findCurrentId, 1); // if it is already opened then it removes the id from the array which cloeses all the accordians
    }

    setMultiple(multiple2); //updates the state with modified array
  }

  function handleModeToggle() {
    setEnablemulti(!enablemulti); 

    if (!enablemulti) {
      setMultiple(Data.map((item) => item.id));
      setSelected(null); // Reset the single selection
    } else {
      setMultiple([]);
    }
  }

  return (
    <div className="accordian">
      <button onClick={handleModeToggle}>
        {enablemulti ? "Close All" : "Enable Multi Selection"}
      </button>

      {Data &&
        Data.length > 0 &&
        Data.map((DataItem) => (
          <div className="accordian-item" key={DataItem.id}>
            <div
              onClick={
                enablemulti
                  ? () => handlemultipleselection(DataItem.id)
                  : () => handleSingleSelection(DataItem.id)
              }
              className="question"
            >
              <h2>{DataItem.question}</h2>
              <span>+</span>
            </div>

            {enablemulti
              ? multiple.indexOf(DataItem.id) !== -1 && (
                  <div className="answer">{DataItem.answer}</div>
                )
              : selected === DataItem.id && (
                  <div className="answer">{DataItem.answer}</div>
                )}
          </div>
        ))}
    </div>
  );
}

export default Accordian;
