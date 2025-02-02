const regex = {
    restriction1:/(select|update|delete|insert|drop|alter|create|truncate|exec|xp_cmdshell)/i,
    restriction2:/(\bfunction\b|\bif\b|\belse\b|\bfor\b|\bwhile\b|\bdo\b|\btry\b|\bcatch\b|\bthrow\b|\bnew\b|\breturn\b|\bclass\b|\bextends\b|\bimport\b|\bfrom\b|\bconst\b|\blet\b|\bvar\b|\bpublic\b|\bprivate\b|\bprotected\b|\bstatic\b|\binterface\b|\bimplements\b|\bnamespace\b|\bdef\b|\bend\b|\bclass\b|\bmodule\b|\binclude\b|\brequire\b|\bprint\b|\bputs\b|\bsystem\.out\.print\b|\bSystem\.out\.println\b|\bprintf\b|\bcout\b|\bendl\b|\binclude\b|\bdefine\b|\becho\b|\bifconfig\b|\bexec\b|\bshell_exec\b|\bphpinfo\b|\bscript\b)/i,
    text:/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s.,:;!¡¿?()\-\+*_><]+$/,
    text_num:/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s.,@:;!¡¿?\d.\-\+*_><()]+$/,
    number:/^[0-9]+([.])?([0-9]+)?$/,
    email:/^(\d{9}|\d{8}|[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})$/,
    date:/^(\d{2}|\d{4})[-\/](0[1-9]|1[0-2])[-\/](0[1-9]|[12][0-9]|3[01])$/,
    timer:/^((1[0-2]|0?[1-9]):([0-5][0-9])(\s?[APap][mM])?|([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?)$/,
    pass:/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[.,/@$%#()+\-*=])[a-zA-Z\d.,/@$%#()+\-*=]{5,}$/,
    img:/\.(png|jpg|jpeg)$/i,
    moneda:/(\$|€|¥|£|₩|₱|₹|₽|₮|₴|₦|₲|₵|₡|₭|₤|₾|₥|₵|₠|₢|₣|₧|฿|₮|₯|₰|₨|₤|AED|AFN|ALL|AMD|ANG|AOA|ARS|AUD|AWG|AZN|BAM|BBD|BDT|BGN|BHD|BIF|BMD|BND|BOB|BRL|BSD|BTN|BWP|BYN|BZD|CAD|CDF|CHF|CLP|CNY|COP|CRC|CUP|CVE|CZK|DJF|DKK|DOP|DZD|EGP|ERN|ETB|EUR|FJD|FKP|GBP|GEL|GHS|GIP|GMD|GNF|GTQ|GYD|HKD|HNL|HRK|HTG|HUF|IDR|ILS|INR|IQD|IRR|ISK|JMD|JOD|JPY|KES|KGS|KHR|KMF|KPW|KRW|KWD|KYD|KZT|LAK|LBP|LKR|LRD|LSL|LYD|MAD|MDL|MGA|MKD|MMK|MNT|MOP|MRU|MUR|MVR|MWK|MXN|MYR|MZN|NAD|NGN|NIO|NOK|NPR|NZD|OMR|PAB|PEN|PGK|PHP|PKR|PLN|PYG|QAR|RON|RSD|RUB|RWF|SAR|SBD|SCR|SDG|SEK|SGD|SHP|SLE|SLL|SOS|SRD|SSP|STN|SVC|SYP|SZL|THB|TJS|TMT|TND|TOP|TRY|TTD|TVD|TWD|TZS|UAH|UGX|USD|UYU|UZS|VES|VND|VUV|WST|XAF|XCD|XOF|XPF|YER|ZAR|ZMW|ZWL)/
};
const messagePop = {
    search:{
        deepSearch:"Buscando en la base de datos, espero por favor...",
        searching:"Buscando en la tabla presente, espere por favor...",
        searchSuccess:"Dato encontrado...",
        emptyPhase:"Sin resultados en la tabla",
        emptyPhase2:"Sin resultados en la base de datos"
    },
    system:{
        checkField:"Comprobando campos...",
        deleteImage:"Imagen eliminada!",
        loadDataToExport:"Cargando datos para exportar...",
        loadPage:"Cargando...",
        emptyResult:"Sin datos por mostrar",
        registerSuccess:"Registro exitoso",
        updatedSuccess:"Actualización exitosa",
        rejectProcess:"Transacción rechazada",
        restoreSuccess:"Restauración exitosa!",
        deletedSuccess:"Eliminación exitosa",
        selectItem:"Seleccione un item",
        moneda:"Ingrese el ícono de su moneda"
    },
    field:{
        emptyField:"Algún campo obligatorio está vacío",
        rejectPattern:"Algún campo no cumple los requisitos"
    },
}
const modeMessagePop = {
    success:"success",
    error:"error",
    warning:"warning"
}

//PROFORMA
var moneda ="";
let producto = [];
$(document).ready(function() {
    // Menú móvil
    $('.menu-toggle').click(function() {
        $(this).toggleClass('active');
        $('.menu').toggleClass('active');
        $('.background').toggleClass('active');
    });

    // Accesibilidad
    let currentFontSize = 16;
    $('#accessibility-button').click(function() {
        $('#accessibility-options').toggleClass("active");
        $(this).toggleClass("active")
    });
    $('#increase-font').click(function() {
        currentFontSize++;
        $('body').css('font-size', currentFontSize + 'px');
        localStorage.setItem('fontSize', currentFontSize);
    });
    $('#decrease-font').click(function() {
        currentFontSize--;
        $('body').css('font-size', currentFontSize + 'px');
        localStorage.setItem('fontSize', currentFontSize);
    });
    $('#reset-font').click(function() {
        currentFontSize = 16;
        $('body').css('font-size', currentFontSize + 'px');
        localStorage.removeItem('fontSize');
    });
    $(".has-submenu").click(function(){
        $(this).toggleClass("open");
        $(".menu-toggle").toggleClass("backward")
    });
    $(".close-submenu").click(function(){});
    $(document).on("click","i.help",function(){
        clickHelpIcon(messagePop['system'][$(this).attr("data-value")]);
    });

    //Se guarda el tamaño de letra en local
    if (localStorage.getItem('fontSize')) {
        currentFontSize = parseInt(localStorage.getItem('fontSize'));
        $('body').css('font-size', currentFontSize + 'px');
    } 

    //Revision de input con datos
    $(document).on("blur","input",function(){
        if($(this).val().trim() != ""){
            if(checkField($(this))){
                $(this).addClass("full");
                if($(this).hasClass("precio"))
                    $(this).val(formatCurrency($(this).val()));
            }    
            else{
                $(this).val(null);
                $(this).removeClass("full");
            }
        }
        else
            $(this).removeClass("full");
    });
    $(document).on("focus","input",function(){
        if($(this).hasClass("precio"))
            $(this).val(unformatCurrency($(this).val()));
    })

    //PROFORMAS
    $(document).on("click","#click-logo",function(){
        $("#empresa-logo").click();
    })
    $('#empresa-logo').change(function() {
        let file = this.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = function(e) {
                $('#logo-preview').html('<img src="' + e.target.result + '" alt="Logo">');
            }
            reader.readAsDataURL(file);
        } else {
            $('#logo-preview').html('');
        }
    });
    $(document).on("click","#click-plantilla-guardar",function() {
        if(!$(".form-section.empresa input").hasClass("error")){
            let plantilla = {
                proformaEmpresa: $('#empresa-proforma').val(),
                idEmpresa: $('#empresa-id').val(),
                nombreEmpresa: $('#empresa-nombre').val(),
                telefonoEmpresa:$("#empresa-telefono").val(),
                correoEmpresa:$("#empresa-correo").val(),
                logo: $('#logo-preview img').attr('src'), // Obtener la URL del logo
                unidadEmpresa:[],
                monedaEmpresa:$("#empresa-moneda").val()
            };
            $(".form-section.producto select option").each(function(){
                if($(this).hasClass("newOption")){
                    plantilla.unidadEmpresa.push({value:$(this).val(),name:$(this).text()});
                }                    
                
            });
            saveJson(plantilla)
        }
        else{
            showPopup(messagePop['field']['rejectPattern'],modeMessagePop['error']);
        }
    });
    $(document).on("click","#click-plantilla",async function() {
        try{
            var data = await loadJson();
            $('#empresa-proforma').val(data.proformaEmpresa);
            $('#empresa-id').val(data.idEmpresa);
            $('#empresa-nombre').val(data.nombreEmpresa);
            $('#empresa-telefono').val(data.telefonoEmpresa);
            $('#empresa-correo').val(data.correoEmpresa);
            $('#empresa-moneda').val(data.monedaEmpresa);
            $('#logo-preview').html('<img src="' + data.logo + '" alt="Logo">');
            $(".form-section.empresa input").each(function(){
                if($(this).val().trim().length > 0)
                    $(this).addClass("full");
            })
            if(data.unidadEmpresa.length > 0){
                for(var i = 0; i < data.unidadEmpresa.length; i++){
                    $(".form-section.producto select").append(buildHTML['select'].option(data.unidadEmpresa[i].value,data.unidadEmpresa[i].name));
                }
                $(".form-section.producto select").find("option").attr("selected",false);
                $(".form-section.producto select").val("");
            }
            moneda = data.monedaEmpresa;
        }
        catch(error){
            showPopup("Problemas al cargar la plantilla",modeMessagePop['warning']);
        }
    });
    $(document).on("click","#click-plantilla-guardar-cliente",function() {
        if(!$(".form-section.empresa input").hasClass("error")){
            let plantilla = {
                idCliente: $('#cliente-id').val(),
                nombreCliente: $('#cliente-nombre').val(),
                telefonoCliente:$("#cliente-telefono").val(),
                correoCliente:$("#cliente-correo").val()
            };
            saveJson(plantilla)
        }
        else{
            showPopup(messagePop['field']['rejectPattern'],modeMessagePop['error']);
        }
    });
    $(document).on("click","#click-plantilla-cliente",async function() {
        try{
            var data = await loadJson();
            $('#cliente-id').val(data.idCliente);
            $('#cliente-nombre').val(data.nombreCliente);
            $('#cliente-telefono').val(data.telefonoCliente);
            $('#cliente-correo').val(data.correoCliente);
            $(".form-section.cliente input").each(function(){
                if($(this).val().trim().length > 0)
                    $(this).addClass("full");
            })
        }
        catch(error){
            showPopup("Problemas al cargar la plantilla",modeMessagePop['warning']);
        }
    });
    $(document).on("change",".form-section.producto select",function(){
        $(this).addClass("full");
        if($(this).val().toLowerCase() == "otro"){
            let newValue = {
                abbr:"",
                name:""
            };
            newValue.name = prompt("Ingrese el nombre del nuevo parámetro de unidad");
            newValue.abbr = prompt("Ingrese la abreviación del nuevo parámetro de unidad");

            if(newValue){
                $(this).find("option").attr("selected",false);
                $(this).append(buildHTML['select'].option(newValue.abbr,newValue.name));
            }
            else{
                $(this).val("");
                showPopup("No se ha registrado el nuevo parámetro de unidad",modeMessagePop['warning']);
                $(this).removeClass("full");
            }
        }
    });
    $(document).on("change","#empresa-moneda",function(){
        if($(this).val().trim().length > 0)
            moneda = $(this).val();
    });
    $(document).on("click","#limpiar-campos",function(){
        $(".form-section.producto input").each(function(){
            $(this).val("");
            $(this).removeClass("full");
        });
    });
    $(document).on("click","#agregar-item",function(){
        var flag = true;
        var Subtotal = 0;
        var total = 0;
        //Se validan los campos tipo input
        $(".form-section.producto input").each(function(){
            if(!checkField($(this)))
                flag = false;
        });        
        //Se validan los campos tipo select
        $(".form-section.producto select").each(function(){
            if(!checkField($(this)))
                flag = false;
        });
        if(flag){
            //Se calcula el subtotal
            Subtotal = unformatCurrency($("#producto-precio").val())*$("#producto-cantidad").val();
            
            //Se calcula el impuesto
            if($("#producto-impuesto").val() > 0)
                Subtotal = Subtotal + (Subtotal*($("#producto-impuesto").val()/100).toFixed(2));
            
            //Se calcula el descuento
            if($("#producto-descuento").val() > 0)
                Subtotal = Subtotal - (Subtotal*($("#producto-descuento").val()/100).toFixed(2));
            
            producto.push({
                Codigo:$("#producto-codigo").val(),
                Descripcion:$("#producto-descripcion").val(),
                Unidad:$("#producto-unidad").val(),
                Cantidad:$("#producto-cantidad").val(),
                Precio:formatCurrency($("#producto-precio").val()),
                Descuento:$("#producto-descuento").val(),
                Impuesto:$("#producto-impuesto").val(),
                Subtotal:formatCurrency(Subtotal)
            });            
            
            //Se refresca la tabla
            $("#productos-table tbody tr").remove();
            for(var i = 0; i < producto.length; i++){
                buildHTML['table'].proforma($("#productos-table tbody"),(i+1),producto[i]);
                total = parseFloat(total) + parseFloat(unformatCurrency(producto[i].Subtotal));
                console.log(total);                                
            }
            $("#total-proforma").text(formatCurrency(total));

            //Se limpian los campos
            $(".form-section.producto input").each(function(){
                $(this).val("");
                $(this).removeClass("full");
            })
            $(".form-section.producto select").val("");
            $(".form-section.producto select").removeClass("full");
            $("#producto-codigo").focus();
        }
    });

});
// Click de iconos de ayuda
function clickHelpIcon(message){
    showPopup(message,modeMessagePop['success']);
}

// Popups
function showPopup(message, type) {
    let popup = $('<div class="popup ' + type + '">' + message + '</div>');
    $('#popup-container').append(popup);
    setTimeout(() => {
        $(popup).addClass("active");
    }, 500);
    setTimeout(function() {
        $(popup).removeClass("active");
        setTimeout(() => {
            popup.remove();
        }, 500);
    }, 5550); // Se cierra después de 3 segundos
}
// Pantalla de carga (Ejemplo)
function loadingData() {
    $('#loading-screen').toggleClass("active");
}   
function saveJson(data){
    let nombrePlantilla = prompt("Ingrese el nombre para guardar el archivo");
    if(nombrePlantilla){
        // Convertir el objeto JSON a una cadena
        let jsonStr = JSON.stringify(data);
    
        // Crear un enlace para descargar el archivo
        let link = document.createElement('a');
        link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr);
        link.download = nombrePlantilla+'.json';
        link.click();
        showPopup("Exportación de datos exitosa!",modeMessagePop['success']);
    }
    else{
        showPopup("Ingrese el nombre para guardar el archivo",modeMessagePop['warning']);
    }
}
async function loadJson() {
    // Crear un input de tipo file para seleccionar el archivo JSON
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.click();
    return new Promise((resolve, reject) => {
        input.onchange = function (e) {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.onload = function (e) {
            resolve(JSON.parse(e.target.result));
        };
        reader.onerror = reject;
        reader.readAsText(file);
        };
    });
}  
function checkField(object){
    var value = $(object).val();
    var type = $(object).attr("data-type");
    var checkEmptyField = evaluateEmptyField(value,type);        
    var res = true;
    if(type == "number"){        
        value = unformatCurrency(value);
        $(object).val(value);        
        type = "number";
    }
    if(checkEmptyField != "Sin registrar" && checkEmptyField != 0 && checkEmptyField != "01/01/9999"){
        if(!regex['restriction1'].test(value) && !regex['restriction2'].test(value)){            
            if(!regex[type].test(value)){
                $(object).addClass("error");
                res = false;
            }
            else{
                $(object).removeClass("error");                
            }
        }
    }
    else{
        if($(object).prop("required")){
            showPopup(messagePop['field']['emptyField'],modeMessagePop['warning']);   
            $(object).addClass("error");
            res = false;
        }
        else{                         
            if(type == "number")
                $(object).val(0);
            else if(type == "date"){
                $(object).val(dateFail);
            }                
            else if(type == "img")
                $(object).val(null);
            else{
                $(object).val("Sin registrar");
            }
        }
    }
    if($(object).val().length > 0)
        $(object).addClass("full");

    return res;
}
function evaluateEmptyField(value,type){    
    if ((value === null || value === undefined || value === "") && (type == "text" || type == "text_num" || type == "pass")) {
        return "Sin registrar";
    } else if(type == "img" && (value === null || value === undefined || value.trim() === "")){
        return "Sin registrar";
    } else if (Array.isArray(value)) {
        return value.length === 0 ? 0 : value;
    } else if(type == "date" && (value === null || value === undefined || value.trim() === "")){
        return "01/01/9999";
    } else if ((value === null || value === undefined || value === "") && type == "number") {
        return 0;
    } else {
        return value;
    }
}
function formatCurrency(number) {
    number = number.toString().replace(/\s+/g, '');

    var parts = number.split('.');
    var integerPart = parts[0];
    var decimalPart = parts.length > 1 ? '.' + parts[1] : '';

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    var result = moneda + integerPart + decimalPart;

    return result;
}
function unformatCurrency(number){
    var unformattedNumber = number.replace(/[,]/g, '');
    unformattedNumber = unformattedNumber.replace(moneda,'');
    return unformattedNumber;
}