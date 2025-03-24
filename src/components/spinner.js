'use client'

import { useState } from "react";
// import RingLoader from "react-spinners/RingLoader";
import PulseLoader from "react-spinners/PulseLoader";


const styles = {
    display: "block",
    margin: "0 auto",
};

function Spinner() {
    let [loading, setLoading] = useState(true);

    return (
        <PulseLoader
            color={'currentcolor'}
            size={10}
            loading={loading}
            cssOverride={styles}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    );
}

export default Spinner;