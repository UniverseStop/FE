import React from "react";
import Select from "react-select";

function AddMeetingLimit({
  postSubLimit,
  setpostSubLimit,
}: {
  postSubLimit: number;
  setpostSubLimit: (postSubLimit: number) => void;
}) {
  const options = Array.from({ length: 30 }, (_, index) => ({
    value: index + 1,
    label: (index + 1).toString(), // label을 문자열로 설정
  }));


  const customStyles = {
    control: (base: any) => ({
      ...base,
      width: "525px",
      height: "56px",
      marginLeft: "22px",
      paddingLeft: "10px",
      border: "1px solid #BC8E8E",
      borderRadius: "1rem",
      '@media (max-width: 450px)': {
        width: '515px',
      },
    }),
    menu: (base: any) => ({
      ...base,
      marginLeft: "24px",
      width: "525px",
      '@media (max-width: 450px)': {
        width: '515px',
      },
    }),
  };

  return (
    <div>
      <p className="text-2xl font-bold m-6 0 6 6">🪧 모임 제한인원</p>
      <Select
        options={options}
        onChange={(e) => {
          if (e) {
            const selectedValue = e.value as number;
            setpostSubLimit(selectedValue);
          }
        }}
        defaultValue={{ value: 1, label: "1" }}
        styles={customStyles}
        value={{ value: postSubLimit, label: postSubLimit.toString() }}
      />
    </div>
  );
}

export default AddMeetingLimit;