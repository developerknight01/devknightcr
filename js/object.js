const buildHTML = {
    select:{
        option:function(value, name){
            var option = $(
                "<option class='newOption' value='"+value+"' selected>"+name+"</option>"
            );
            return option;
        }
    },
    table:{
        proforma:function(tabla,fila,producto){
            $.ajax({
                url:"../../objetos/tabla/proforma.html",
                success:function(html){
                    var pos = 0;
                    const objProducto = [
                        "Codigo",
                        "Descripcion",
                        "Unidad",
                        "Cantidad",
                        "Precio",
                        "Descuento",
                        "Impuesto",
                        "Subtotal"
                    ];
                    var row = $(html);
                    $(row).addClass("fila-"+fila);
                    $(row).find("td:first-child").text(fila);
                    $(row).find("button").attr("data-value",fila);
                    $(tabla).append(row);
                    $(tabla).find("tr:last-child td.values").each(function(){                                                
                        $(this).text(producto[objProducto[pos]]);
                        pos++;
                    });
                }
            });
        }
    }
}
