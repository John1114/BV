import { FormEvent, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

export function Founders(register: {registerFunction: UseFormRegister<FieldValues>}) {
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
    if (founders.length === 1){
        return
    }
    let fields = [...founders];
    fields.pop();
    setFounders(fields);
  };

  return (
    <div className="relative w-full">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="founders"
      >
        Founder(s)
      </label>
      {founders.map(function (input, index) {
        return (
          <div key={index} className="flex mb-3">
            <div className="flex-col w-1/2">
              <input
                required
                className="shadow w-5/6 h-14 appearance-none border-2 border-black rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                id="first"
                type="text"
                placeholder="First Name"
                value={input.firstname}
                onChange={(e) => handleFirstName(index, e)}
              />
            </div>
            <div className="flex-col w-1/2">
              <input
                required
                className="shadow w-5/6 h-14 appearance-none border-2 border-black rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                id="founders"
                type="text"
                placeholder="Last Name"
                value={input.lastname}
                onChange={(e) => handleLastName(index, e)}
              />
            </div>
          </div>
        );
      })}
      <button onClick={addFields}>+</button>
      <button onClick={removeFields}>-</button>
      <input className="invisible absolute" 
        value={founders.toString()} 
        {...register.registerFunction("founders", {required: true})} />

    </div>
  );
}

{
  /* <div>
              <div className="flex-col w-1/2 justify-center">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="founders"
                >
                  Founder(s)
                </label>
                <input
                  required
                  className="shadow w-5/6 h-14 appearance-none border-2 border-black rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  id="founders"
                  type="text"
                  placeholder="First Name"
                  {...registerFunction("firstname", { required: true })}
                />
              </div>
              <div className="flex-col w-1/2 justify-center">
                <label
                  className="block text-white text-sm font-bold mb-2"
                  htmlFor="founders"
                >.</label>
                <input
                  required
                  className="shadow w-5/6 h-14 appearance-none border-2 border-black rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
                  id="founders"
                  type="text"
                  placeholder="Last Name"
                  {...registerFunction("lastname", { required: true })}
                />
              </div>
        </div> */
}
