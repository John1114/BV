import { FormEvent, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

export interface FoundersProps {
  register: UseFormRegister<FieldValues>;
}

export function Founders({ register }: FoundersProps) {
  const [founders, setFounders] = useState([{ firstname: "", lastname: "" }]);

  const handleFirstName = (index: number, e: FormEvent<HTMLInputElement>) => {
    let data = [...founders];
    data[index].firstname = e.currentTarget.value;
    setFounders(data);
  };

  const handleLastName = (index: number, e: FormEvent<HTMLInputElement>) => {
    let data = [...founders];
    data[index].lastname = e.currentTarget.value;
    setFounders(data);
  };

  const addFields = () => {
    let newField = { firstname: "", lastname: "" };
    setFounders([...founders, newField]);
  };

  const removeFields = () => {
    if (founders.length === 1) {
      return;
    }
    let fields = [...founders];
    fields.pop();
    setFounders(fields);
  };

  return (
    <div className="relative w-full">
      <label
        className="block text-gray-700 text-sm font-bold mb-2 text-left"
        htmlFor="founders"
      >
        Founder(s)
      </label>
      {founders.map(function (input, index) {
        return (
          <div key={index} className="flex mb-3 space-x-2">
            <div className="flex-col w-1/2 text-center">
              <input
                required
                className="form-primary"
                id="first"
                type="text"
                placeholder="First Name"
                {...register(`founders[${index}].firstname`)}
              />
            </div>
            <div className="flex-col w-1/2 text-center">
              <input
                required
                className="form-primary"
                id="founders"
                type="text"
                placeholder="Last Name"
                {...register(`founders[${index}].lastname`)}
              />
            </div>
          </div>
        );
      })}
      <button onClick={addFields} className="relative left-[4.5%]">
        +
      </button>
      <button onClick={removeFields} className="relative left-[4.5%]">
        -
      </button>
      {/* <input className="hidden" {...register("founders")} value={founders.flatMap(f => f.firstname + " " + f.lastname)} /> */}
    </div>
  );
}
