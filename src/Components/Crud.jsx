import { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export function Crud() {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [id, setId] = useState("");

  const [show, setShow] = useState(false);
  const [val, setVal] = useState([]);
  const value = collection(db, "patients");

  useEffect(() => {
    const getData = async () => {
      const dbVal = await getDocs(value);
      setVal(dbVal.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  }, []);

  const handleCreate = async () => {
    if(fname.trim() === '' || lname.trim() === '') return
    await addDoc(value, { firstName: fname, lastName: lname });
  };

  const handleDelete = async (id) => {
    const deleteVal = doc(db, "patients", id);
    await deleteDoc(deleteVal);
  };

  const handleEdit = async (id, firstName, lastName) => {
    setFName(firstName);
    setLName(lastName);
    setId(id);
    setShow(true);
  };

  const handleUpdate = async () => {
    if(fname.trim() === '' || lname.trim() === '') return
    const updateData = doc(db, "patients", id);
    await updateDoc(updateData, { firstName: fname, lastName: lname });
    setShow(false);
  };

  return (
    <div className="text-center">
      <input
        type="text"
        color="warning"
        placeholder="First Name"
        value={fname}
        onChange={(e) => setFName(e.target.value)}
        className="max-w-[220px] pb-2 bg-slate-200"
      />
      <br />
      <br />
      <input
        type="text"
        color="warning"
        placeholder="Last name"
        value={lname}
        onChange={(e) => setLName(e.target.value)}
        className="max-w-[220px] pb-2 bg-yellow-200"
      />
      <br />
      <br />
      {!show ? (
        <button
          onClick={handleCreate}
          radius="full"
          className=" bg-black px-4 py-2 rounded-xl text-white shadow-lg"
        >
          Create Order
        </button>
      ) : (
        <button
          onClick={handleUpdate}
          radius="full"
          className=" bg-black px-4 py-2 rounded-xl text-white shadow-lg"
        >
          Update Order
        </button>
      )}
      <h1 className="pb-5 pt-5 text-2xl text-red-700">The orders are: </h1>
      {val.map((values) => (
        <div key={values.id}>
          <h1 className="pb-2">
            {values.firstName} {values.lastName}
          </h1>
          <div className="flex justify-around gap-4">
          <button
            className="bg-red-400 px-4 py-2 rounded-xl"
            color="danger"
            variant="bordered"
            onClick={() => handleDelete(values.id)}
          >
            Delete Order
          </button>
          <button
            className="bg-yellow-200 px-4 py-2 rounded-xl"
            color="primary"
            variant="bordered"
            onClick={() =>
              handleEdit(values.id, values.firstName, values.lastName)
            }
          >
            Edit Order
          </button>
          </div>
          <br />
          <br />
        </div>
      ))}
      ;
    </div>
  );
}
