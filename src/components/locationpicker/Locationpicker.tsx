import React from "react";
import { Cascader } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { locationData } from "./locationData";

const Locationpicker = ({
    showInline,
    onLocationChange,
}: {
    showInline: boolean;
    onLocationChange: (location: string) => void;
}) => {
    const handleCascaderChange = (value: string | null) => {
        if (value) {
            onLocationChange(value);
        }
    };

    const styles = { width: 370, display: "block", marginBottom: 10 };
    return (
        <div>
            <Cascader
                inline={showInline}
                data={locationData}
                size="lg"
                style={styles}
                appearance="subtle"
                placement="bottomStart"
                onChange={handleCascaderChange}
                classPrefix="picker"
            />
        </div>
    );
};

export default Locationpicker;
