# ⚙️ Manual: Base de Datos Desacoplada (Indra Studio Floral)

Agencia Treze Labs.
Siguiendo los protocolos de alto rendimiento, este documento contiene las instrucciones precisas para generar el **Motor de Base de Datos** de Indra Studio Floral sin incurrir en costos de backend y con total libertad de gestión a través del Command Center.

---

## 1. Crear el Archivo en Google Sheets
1. Entra a tu cuenta de Google Drive de la agencia o de manera local.
2. Crea un nuevo Google Sheet llamado **"BD_INDRA_STUDIO"**.
3. Cambia el nombre de la pestaña abajo (Hoja 1) a: **Config**
4. Agrega una segunda pestaña (Hoja 2) y nómbrala: **Productos**

*(Nota: Deja los documentos en blanco. El Command Center se encargará de inyectar las cabeceras y los datos por ti la primera vez que se guarde).*

---

## 2. Inyectar el Código de la API (Backend Cero Costo)
1. Con tu Google Sheet abierto, ve al menú superior: **Extensiones > Apps Script**.
2. Borra todo el código que aparece ahí y **pega exactamente lo siguiente**:

```javascript
// =========================================
// TREZE LABS // GOOGLE SHEETS API ENGINE 
// Cliente: Indra Studio Floral
// =========================================

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheetConfig = sheet.getSheetByName("Config");
  var sheetProducts = sheet.getSheetByName("Productos");
  
  // Extraer Config dinámicamente
  var configData = sheetConfig.getDataRange().getValues();
  var configObj = {};
  
  // Asumimos que los datos empiezan en la fila 1 [Clave, Valor]
  if(configData.length > 0) {
    for(var i=0; i<configData.length; i++) {
        var key = configData[i][0];
        var value = configData[i][1];
        if(key) configObj[key] = value || '';
    }
  }
  
  // Extraer Productos
  var prodData = sheetProducts.getDataRange().getValues();
  var productos = [];
  if(prodData.length > 1) { // Asume renglón 1 es Headers
    for(var i=1; i<prodData.length; i++) {
       productos.push({
         id: prodData[i][0],
         nombre: prodData[i][1],
         categoria: prodData[i][2],
         precio: prodData[i][3],
         status: prodData[i][4],
         img: prodData[i][5],
         desc: prodData[i][6]
       });
    }
  }
  
  var response = { config: configObj, productos: productos };
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var postData = JSON.parse(e.postData.contents);
  var action = postData.action;
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  
  if(action === 'saveConfig') {
    var sheetConfig = sheet.getSheetByName("Config");
    sheetConfig.clear();
    
    var keys = Object.keys(postData.data);
    for(var i=0; i<keys.length; i++) {
       sheetConfig.getRange(i+1, 1).setValue(keys[i]);
       sheetConfig.getRange(i+1, 2).setValue(postData.data[keys[i]]);
    }
  }
  
  if(action === 'saveProducts') {
    var sheetProducts = sheet.getSheetByName("Productos");
    sheetProducts.clear();
    sheetProducts.appendRow(["ID", "NOMBRE", "CATEGORIA", "PRECIO", "STATUS", "IMG_URL", "DESC"]); // Headers
    
    var arr = postData.productos;
    for(var i=0; i<arr.length; i++) {
      var p = arr[i];
      sheetProducts.appendRow([p.id, p.nombre, p.categoria || "N/A", p.precio, p.status, p.img, p.desc]);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({"status":"success"})).setMimeType(ContentService.MimeType.JSON);
}
```

---

## 3. Desplegar como API (Webhook)
Este es el paso vital. Si no se hace con exactitud, la VCard móvil será bloqueada por políticas CORS.

1. En Apps Script, haz clic arriba a la derecha en el botón azul grande de **"Implementar" -> "Nueva Implementación"**.
2. En la ventana emergente, haz clic en el engranaje ⚙️ junto a *Elegir tipo* y selecciona **Aplicación Web**.
3. Te pedirá tres datos clave:
   * **Descripción**: Ponle "API Producción Indra"
   * **Ejecutar como**: Selecciona *"Yo (tu-email@gmail.com)"*
   * **Quién tiene acceso**: Selecciona **"Cualquier persona"** (Esto es obligatorio para que el Command Center y la VCard puedan leer la información libremente sin pedirle al usuario de internet que inicie sesión en Google).
4. Dale clic a **Implementar**. 
*(Si te pide "Autorizar Acceso", autorízalo y en la pantalla de "Unsafe" ve a Configuración Avanzada y dale a "Go to project" o Continuar).*

---

## 4. Conectar la API al Código Fuente
1. Copia la URL larguísima que te arroja Google al terminar el paso anterior (Termina en `/exec`).
2. Ve a los siguientes archivos en tu código de VS Code y reemplaza el texto `"PEGAR_AQUI_LA_URL_DEL_SCRIPT"` por tu verdadera URL:
    * Reemplazar línea `195` (aprox) de `indra-studio-floral/script.js`
    * Reemplazar línea `15` de `indra-studio-floral/admin/app.js`

## 5. Cierre Final - Render
* Sube los cambios a GitHub (Commit).
* Vercel construirá todo y **Listo**. El ecosistema estará completamente manejado mediante la base de datos externa de la Agencia.
