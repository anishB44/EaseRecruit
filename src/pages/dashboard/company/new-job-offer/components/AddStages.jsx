import { useRef, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import InputWithButton from "@/components/dashboard/InputWithButton";
import DynamicTextField from "@/components/dashboard/DynamicTextField";

export default function AddStages() {
  const inputRef = useRef(null);
  const [stage, setStage] = useState({});
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: "stages",
    control,
  });

  const appendData = () => {
    if (Object.keys(stage).length) {
      append(stage);
      setStage({});
      inputRef.current.value = "";
    }
  };

  const onChange = (title) => setStage({ title });

  return (
    <div>
      <DynamicTextField
        fields={fields}
        remove={remove}
        text={15}
        rounded="md"
      />
      <InputWithButton
        name="Stages"
        appendData={appendData}
        inputRef={inputRef}
        onChange={onChange}
      />
    </div>
  );
}
