import {useState, useEffect} from "react";
import Error from "./Error";

function Formulario({pacientes, setPacientes, paciente, setPaciente}) {
   //Acá definimos los states
   const [nombre, setNombre] = useState("");
   const [propietario, setPropietario] = useState("");
   const [email, setEmail] = useState("");
   const [fecha, setFecha] = useState("");
   const [sintomas, setSintomas] = useState("");

   //Mensaje de error si no está lleno
   const [error, setError] = useState(false);

   useEffect(() => {
      if (Object.keys(paciente).length > 0) {
         setNombre(paciente.nombre);
         setPropietario(paciente.propietario);
         setEmail(paciente.email);
         setFecha(paciente.fecha);
         setSintomas(paciente.sintomas);
      }
   }, [paciente]);

   const generarID = () => {
      const fecha = Date.now().toString(36);
      return fecha;
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      //Validación de formularios
      if ([nombre, propietario, email, fecha, sintomas].includes("")) {
         console.log("Hay almenos un campo vacío ");
         setError(true);
         return;
      }
      setError(false);

      //Construir un objeto de paciente
      const objetoPaciente = {
         nombre,
         propietario,
         email,
         fecha,
         sintomas,
         id: generarID(),
      };

      if (paciente.id) {
         //Editando el registro
         objetoPaciente.id = paciente.id;

         const pacientesActualizados = pacientes.map((pacienteState) => {
            pacienteState.id === paciente.id ? objetoPaciente : pacienteState;

            setPacientes(pacientesActualizados);
            setPaciente({});
         });
      } else {
         //Nuevo registro
         objetoPaciente.id = generarID();
         setPacientes([...pacientes, objetoPaciente]);
      }

      //Reiniciar el formulario
      setNombre("");
      setPropietario("");
      setEmail("");
      setFecha("");
      setSintomas("");
   };

   return (
      <div className="md:w-1/2 lg:w-2/5 mx-5">
         <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>
         <p className="text-lg mt-5 text-center mb-10">
            Añade pacientes y{" "}
            <span className="text-indigo-600 font-bold">Administralos</span>{" "}
         </p>

         <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
            {error && <Error mensaje="Todos los campos son obligatorios" />}

            {/* Mascota  */}
            <div className="mb-5">
               <label
                  className="block text-gray-700 uppercase font-bold"
                  htmlFor="mascota">
                  Nombre mascota
               </label>
               <input
                  id="mascota"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  type="text"
                  placeholder="Nombre de la mascota"
                  value={nombre}
                  onChange={(e) => {
                     setNombre(e.target.value);
                  }}
               />
            </div>

            {/* Propietario */}
            <div className="mb-5">
               <label
                  className="block text-gray-700 uppercase font-bold"
                  htmlFor="propietario">
                  Nombre Propietario
               </label>
               <input
                  id="propietario"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  type="text"
                  placeholder="Nombre del propietario"
                  value={propietario}
                  onChange={(e) => {
                     setPropietario(e.target.value);
                  }}
               />
            </div>

            {/* Email */}
            <div className="mb-5">
               <label className="block text-gray-700 uppercase font-bold" htmlFor="email">
                  Email
               </label>
               <input
                  id="email"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  type="email"
                  placeholder="Email contácto propietario"
                  value={email}
                  onChange={(e) => {
                     setEmail(e.target.value);
                  }}
               />
            </div>

            {/* Alta */}
            <div className="mb-5">
               <label className="block text-gray-700 uppercase font-bold" htmlFor="alta">
                  Alta
               </label>
               <input
                  id="alta"
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  type="date"
                  value={fecha}
                  onChange={(e) => {
                     setFecha(e.target.value);
                  }}
               />
            </div>

            {/* Comentarios */}
            <div className="mb-5">
               <label
                  className="block text-gray-700 uppercase font-bold"
                  htmlFor="sintomas">
                  Comentarios
               </label>
               <textarea
                  className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                  name="sintomas"
                  id="sintomas"
                  cols="30"
                  rows="10"
                  placeholder="Describe los síntomas..."
                  value={sintomas}
                  onChange={(e) => {
                     setSintomas(e.target.value);
                  }}></textarea>
            </div>

            <input
               type="submit"
               className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
               value={paciente.id ? "Editar paciente" : "Agregar Paciente"}
            />
         </form>
      </div>
   );
}

export default Formulario;
