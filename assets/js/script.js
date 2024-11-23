import {RegistrarUsuario,ObtenerUsuario,EliminarUsuario,actualizarUsuario} from "./Promesas.js"
window.addEventListener("load",async ()=>{
    console.log("Pagina Cargada")
    const usuarios = await ObtenerUsuario();
    console.log("Usuario Obtenidos:",usuarios)

    const eTbody = document.getElementById("CuerpoTabla");
    

    let filas = "";
    usuarios.forEach((p) => {
        filas += `
            <tr>
                <td>${p.Nombre}</td>
                <td>${p.Apellido}</td>
                <td>${p.Rut}</td>
                <td>${p.CiudadDeNacimiento}</td> 
                <td>${p.EstadoMatrimonial}</td> 
                <td>${p.Genero}</td>
                <td>${p.Direccion}</td>
                <td>
                    <button id="mod${p.id}">Modificar</button>
                    <button id="eli${p.id}">Eliminar</button>
                </td>
            </tr>
        `;
    });
    eTbody.innerHTML = filas;

    // se le asignan las funcionaldiades a los botones
    usuarios.forEach((p) => {
        document.getElementById(`eli${p.id}`).addEventListener("click", async () => {
            if (confirm(`¿Desea eliminar el usuario ${p.Nombre}?`)) {
                try {
                    await EliminarUsuario(p.id);
                    alert("Usuario eliminado con éxito.");
                    location.reload(); // Recargar para reflejar cambios
                } catch (e) {
                    console.error("Error al eliminar:", e);
                }
            }
        });
        document.getElementById(`mod${p.id}`).addEventListener("click", () => {
        console.log(`Modificando usuario con ID: ${p.id}`);
        
        // muestra el formulario de edicion
        const formEditar = document.getElementById("formEditar");
        formEditar.style.display = "block";

        // Cargar datos en el formulario
        document.getElementById("editNombre").value = p.Nombre;
        document.getElementById("editApellido").value = p.Apellido;
        document.getElementById("editRut").value = p.Rut;
        document.getElementById("editCiudad").value = p.CiudadDeNacimiento;
        document.getElementById("editGenero").value = p.Genero;
        document.getElementById("editDireccion").value = p.Direccion;

        if (p.EstadoMatrimonial === "Soltero") {
            document.getElementById("editSoltero").checked = true;
        } else {
            document.getElementById("editCasado").checked = true;
        }

        // Este boton guarda los cambios
        document.getElementById("btnGuardarCambios").onclick = async () => {
            const nuevoUsuario = {
                Nombre: document.getElementById("editNombre").value.trim(),
                Apellido: document.getElementById("editApellido").value.trim(),
                Rut: document.getElementById("editRut").value.trim(),
                "Ciudad De Nacimiento": document.getElementById("editCiudad").value.trim(), // Campo exacto
                "Estado Matrimonial": document.getElementById("editSoltero").checked
                ? "Soltero"
                : "Casado", // Sobrescribe correctamente
        Genero: document.getElementById("editGenero").value,
        Direccion: document.getElementById("editDireccion").value.trim(),
            };
            try {
                await actualizarUsuario(p.id, nuevoUsuario); // Llama a la función para actualizar el usuario
                alert("Usuario actualizado con éxito.");
                location.reload(); // Recargar para reflejar cambios
            } catch (error) {
                console.error("Error al actualizar usuario:", error);
                alert("Hubo un error al actualizar el usuario.");
            }
        };
        //Boton para cancelar
        document.getElementById("btnCancelarEdicion").onclick = () => {
            formEditar.style.display = "none"; // con este se oculta el formulario
            };
        });
    });
    document.getElementById("btnRegistrar").addEventListener("click",()=>{
        console.log("boton presionado")
        //recuperar los inputs
        let INombre = document.getElementById("Nombre");
        let IApellido = document.getElementById("Apellido");
        let IRut = document.getElementById("Rut");
        let INCiudad = document.getElementById("Nciudad");
        let Iestado = document.getElementById("Soltero");
        let Iestado1 = document.getElementById("Casado");
        let IGenero = document.getElementById("Genero");
        let IDireccion = document.getElementById("Direccion");
        //recuperar los valores de los inputs
        let VNombre = INombre.value;
        let VApellido = IApellido.value;
        let VRut = IRut.value;  
        let VNCiudad = INCiudad.value;
        let VEstado = Iestado.checked;
        let VEstado1 = Iestado1.checked;
        let VGenero = IGenero.value;
        let VDireccion = IDireccion.value;

        if(VEstado === true ){ //esta funcion revisa si marcaron Soltero o casado y lo almacena en su variable correspondiente.
          // casado Vestado casado
          var EstadoMatrimonial = "casado" 
        } 
        else{
            var EstadoMatrimonial = "Soltero"
        }
        let Usuario =  {
            'Nombre': VNombre,
            'Apellido': VApellido,
            'Rut':VRut,
            'Ciudad De Nacimiento' : VNCiudad,
            'Estado Matrimonial' : EstadoMatrimonial,
            'Genero': VGenero,
            'Direccion':VDireccion
        }
        //Agregar esa variable en la funcion
        RegistrarUsuario(Usuario)
        alert("Usuario Registrado Con Exito!")
        console.log(Usuario)
        });
        document.getElementById("C_Color").addEventListener("click", () => {//esta funcion sirve para cambiar los colores
            const rootStyle = getComputedStyle(document.documentElement);
            const color = rootStyle.backgroundColor.trim(); 
            console.log("Color actual:", color); 
        
            if (color === "rgb(18, 18, 18)") { // modo claro
                
                document.documentElement.style.backgroundColor = "white";
                document.documentElement.style.color = "black";
            } else if (color === "rgb(255, 255, 255)" || color === "rgba(255, 255, 255, 1)") {//modo oscuro
                document.documentElement.style.backgroundColor = "#121212";
                document.documentElement.style.color = "#E0E0E0";
            } 
        });
        document.getElementById("C_Letra").addEventListener("click",()=>{// esta funcion sirve para cambiar el tamanio de la fuente
            var font = document.documentElement.style.fontSize
            if (font ==='20px'){
                document.documentElement.style.fontSize='22px'
            }
            else{
                document.documentElement.style.fontSize='20px'
            }
        })
    });