import populateBrackets from "../utilities/populateBracket";
import React from "react";

const Populate = () => {
    return (
        <div>
            <button onClick={populateBrackets()} > populate </button>
        </div>
    )
}

export default Populate;