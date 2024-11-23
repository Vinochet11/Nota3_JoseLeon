import { bd } from "./Firebase.js";
import { collection,addDoc,doc,deleteDoc,getDocs, updateDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

export const RegistrarUsuario = async (Usuario) => {//esta funcion registra en la base de datos
    const docRef = await addDoc(collection(bd,"Usuario"),Usuario);
}
export const ObtenerUsuario = async () => {//funcion para obtener los valores de la base de datos para mostrarlo en la pagina
    const querySnapshot = await getDocs(collection(bd,"Usuario"));
    var Lista= []
    querySnapshot.forEach((doc)=> {
        let Usuarios = {
            id: doc.id,
            Nombre: doc.data().Nombre,
            Apellido: doc.data().Apellido,
            Rut: doc.data().Rut,
            CiudadDeNacimiento: doc.data()["Ciudad De Nacimiento"], 
            EstadoMatrimonial: doc.data()["Estado Matrimonial"], 
            Genero: doc.data().Genero,
            Direccion: doc.data().Direccion,
        };
    Lista.push(Usuarios)
    });
    return Lista;     
};
export const EliminarUsuario = async (id) => {//elimina una coleccion de la base de datos
    try {
        const docRef = doc(bd, "Usuario", id);
        await deleteDoc(docRef); 
        console.log("Documento eliminado:", id);
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        throw error; 
    }
};

export const actualizarUsuario = async (id,usuarioActualizado) => {//actualiza las colecciones y verifica si hay algun error
    try{
        const docRef = doc(bd,"Usuario",id);
        await updateDoc(docRef,usuarioActualizado);
        console.log("Usuario Actualizado",id);
    } catch(error){
        console.error("Error al actualizar:",error);
        throw error;
    }
};
