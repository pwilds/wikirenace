const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// ============================================================
// WIKIRENACE | BOT DE COMUNIDAD
// Escuela Profesional de Administración - UNU
// ============================================================

// ============================================================
// CONFIGURACIÓN GENERAL
// ============================================================

const CONFIG = {
    nombre: 'WikiRENACE',
    comunidad: 'WikiRENACE | Comunidad General',
    institucion: 'Universidad Nacional de Ucayali',
    escuela: 'Escuela Profesional de Administración',

    // Formulario oficial
    formulario:
        'https://forms.gle/Qg2mNQDvavbbrr8b6',

    // Sitio web
    web:
        'http://0.0.0.0:8000/',

    // Administradores de la Comisión Central
    administradores: [
        {
            nombre: 'Wilde Garcia',
            numero: '51932457162'
        },
        {
            nombre: 'Angel del Aguila',
            numero: '51953782586'
        },
        {
            nombre: 'Cafu Quincas',
            numero: '51950807375'
        },
        {
            nombre: 'Leo Noriega',
            numero: '51942699106'
        },
        {
            nombre: 'Valery Rettis',
            numero: '51980427298'
        }
    ]
};

// ============================================================
// CLIENTE WHATSAPP
// ============================================================

const client = new Client({
    authStrategy: new LocalAuth(),

    puppeteer: {
        headless: true,

        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    }
});

// ============================================================
// FUNCIONES AUXILIARES
// ============================================================

function limpiarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/@[0-9]+/g, '')
        .trim();
}

function obtenerNombre(contact) {
    return (
        contact.pushname ||
        contact.name ||
        contact.shortName ||
        'nuevo integrante'
    );
}

function listaAdministradores() {
    return CONFIG.administradores
        .map(
            (admin, index) =>
                `${index + 1}. *${admin.nombre}*`
        )
        .join('\n');
}

function numerosAdministradores() {
    return CONFIG.administradores
        .map(
            (admin) =>
                `• *${admin.nombre}*: +${admin.numero}`
        )
        .join('\n');
}

// ============================================================
// MENSAJES DEL BOT
// ============================================================

const MENSAJES = {

    menu: `
🤖 *WIKIRENACE | MENÚ PRINCIPAL*

Hola 👋 Bienvenido/a a la comunidad.

Puedo ayudarte con información sobre nuestra comunidad académica, registro, normas y canales de contacto.

📚 *COMANDOS DISPONIBLES*

📌 *!info*
Conoce qué es WikiRENACE.

📌 *!registro*
Obtén el formulario oficial para registrarte.

📌 *!reglas*
Consulta las normas básicas de la comunidad.

📌 *!ciclos*
Información sobre la organización académica.

📌 *!wiki*
Conoce nuestro repositorio académico.

📌 *!comunidad*
Conoce el propósito de este grupo.

📌 *!administradores*
Consulta a los encargados de la Comisión Central.

📌 *!contacto*
Obtén los canales oficiales de contacto.

📌 *!ayuda*
Solicita asistencia.

📌 *!bot*
Información sobre este asistente.

━━━━━━━━━━━━━━━━━━
💡 También puedes escribir *hola*, *buenas* o *información*.
`,

    info: `
📚 *¿QUÉ ES WIKIRENACE?*

WikiRENACE es una iniciativa orientada a fortalecer el acceso, organización y difusión del conocimiento académico entre los estudiantes de la *Escuela Profesional de Administración de la Universidad Nacional de Ucayali*.

Nuestro objetivo es construir una comunidad donde los estudiantes puedan encontrar y compartir:

- Materiales académicos.
- Sílabos.
- Recursos de estudio.
- Información por ciclos.
- Enlaces de interés.
- Actividades académicas.
- Iniciativas de investigación.
- Oportunidades de participación estudiantil.

🌐 La plataforma WikiRENACE funciona como un espacio digital complementario para nuestra comunidad.

🎓 *Administración | UNU*
`,

    comunidad: `
🏛️ *WIKIRENACE | COMUNIDAD GENERAL*

Este grupo es el espacio general de comunicación de WikiRENACE.

Aquí buscamos:

📚 Compartir conocimiento.
🤝 Fortalecer la colaboración entre estudiantes.
🔎 Facilitar información académica.
💡 Promover iniciativas estudiantiles.
📢 Difundir actividades y oportunidades.
🎓 Fortalecer nuestra comunidad universitaria.

Este grupo reúne a estudiantes de diferentes ciclos, por lo que el respeto y la colaboración son fundamentales.

*Construimos comunidad compartiendo conocimiento.*
`,

    registro: `
📝 *REGISTRO WIKIRENACE*

Para formar parte de manera organizada de nuestra comunidad y facilitar la gestión de los integrantes, debes completar el formulario oficial.

🔗 *Formulario de registro:*

https://forms.gle/Qg2mNQDvavbbrr8b6

📌 Te recomendamos completar tus datos correctamente.

Una vez enviado el formulario, la Comisión Central podrá verificar la información correspondiente.

⚠️ *Importante:*
No compartas información personal sensible dentro del grupo.
`,

    reglas: `
📜 *REGLAS DE LA COMUNIDAD*

Para mantener un espacio ordenado y útil para todos:

1️⃣ *Respeto*
Trata a todos los integrantes con respeto, independientemente del ciclo o posición que ocupen.

2️⃣ *Finalidad académica*
El grupo está orientado principalmente a temas académicos, universitarios y relacionados con WikiRENACE.

3️⃣ *Evita el spam*
No envíes cadenas, mensajes repetitivos o contenido que no aporte a la comunidad.

4️⃣ *Publicidad*
No publiques publicidad o promociones sin autorización de la administración.

5️⃣ *Información*
Antes de compartir información, procura verificar su origen.

6️⃣ *Privacidad*
No difundas datos personales de otros integrantes sin autorización.

7️⃣ *Convivencia*
Las diferencias de opinión deben tratarse con respeto.

8️⃣ *Administración*
Las decisiones de moderación corresponden a la Comisión Central y administradores designados.

🤝 *La comunidad funciona mejor cuando todos colaboramos.*
`,

    ciclos: `
🎓 *ORGANIZACIÓN ACADÉMICA*

WikiRENACE busca facilitar el acceso organizado a recursos correspondientes a los diferentes ciclos académicos de Administración.

📚 *Cobertura académica*

I   → Primer ciclo
II  → Segundo ciclo
III → Tercer ciclo
IV  → Cuarto ciclo
V   → Quinto ciclo
VI  → Sexto ciclo
VII → Séptimo ciclo
VIII → Octavo ciclo
IX  → Noveno ciclo
X   → Décimo ciclo

La organización por ciclos permite encontrar los recursos de manera más rápida y ordenada.

💡 Si tienes materiales académicos que puedan ser útiles para otros estudiantes, puedes comunicarte con la administración.
`,

    wiki: `
🌐 *WIKIRENACE | REPOSITORIO ACADÉMICO*

WikiRENACE busca centralizar y organizar recursos académicos para los estudiantes de Administración.

En nuestra plataforma podrás encontrar progresivamente:

📚 Materiales académicos.
📄 Documentos.
📑 Sílabos.
🔎 Recursos organizados por asignatura.
🎓 Información por ciclos.
🔗 Enlaces de interés.

🌐 *Acceso a WikiRENACE:*

${CONFIG.web}

💡 La plataforma se encuentra en proceso de crecimiento y actualización.
`,

    administradores: `
👥 *COMISIÓN CENTRAL | WIKIRENACE*

Los siguientes integrantes forman parte del equipo encargado de la coordinación general:

${listaAdministradores()}

📌 *Contactos oficiales*

${numerosAdministradores()}

Para asuntos importantes, procura comunicarte directamente con un responsable y evita enviar información privada al grupo.

🤝 *Comisión Central WikiRENACE*
`,

    contacto: `
📞 *CANALES DE CONTACTO*

Si necesitas comunicarte con la Comisión Central, puedes contactar a cualquiera de los responsables:

${numerosAdministradores()}

📋 *Registro*
${CONFIG.formulario}

🌐 *WikiRENACE*
${CONFIG.web}

📌 Para asuntos relacionados con el grupo, procura indicar claramente el motivo de tu consulta.
`,

    ayuda: `
🆘 *CENTRO DE AYUDA WIKIRENACE*

Si necesitas ayuda, puedes:

1️⃣ Escribir *!menu* para consultar los comandos.

2️⃣ Escribir *!registro* para obtener el formulario.

3️⃣ Escribir *!administradores* para consultar a la Comisión Central.

4️⃣ Escribir *!contacto* para conocer los canales oficiales.

5️⃣ Si tu consulta requiere atención humana, comunícate directamente con uno de los administradores.

💡 *Consejo:* describe brevemente tu problema para que podamos ayudarte más rápido.
`,

    bot: `
🤖 *ASISTENTE WIKIRENACE*

Soy el asistente automatizado de la comunidad *WikiRENACE*.

Mi función es ayudarte a encontrar información básica de manera rápida.

Puedo proporcionarte:

📚 Información de WikiRENACE.
📝 Formulario de registro.
📜 Normas de la comunidad.
🎓 Información sobre ciclos.
👥 Contactos de la Comisión Central.
🌐 Información del repositorio.
🆘 Orientación básica.

Escribe:

*!menu*

para consultar todos mis comandos.

━━━━━━━━━━━━━━━━━━
⚙️ Asistente automatizado
🏛️ WikiRENACE | Administración UNU
`
};

// ============================================================
// EVENTO QR
// ============================================================

client.on('qr', (qr) => {

    console.clear();

    console.log('====================================================');
    console.log('      WIKIRENACE | CÓDIGO QR DE VINCULACIÓN');
    console.log('====================================================');
    console.log('');

    qrcode.generate(qr, {
        small: true
    });

    console.log('');
    console.log('Escanea el código QR desde WhatsApp.');
    console.log('');
});

// ============================================================
// AUTENTICACIÓN
// ============================================================

client.on('authenticated', () => {
    console.log('🔐 Sesión de WhatsApp autenticada correctamente.');
});

client.on('auth_failure', (message) => {
    console.error('❌ Error de autenticación:', message);
});

// ============================================================
// LISTO
// ============================================================

client.on('ready', () => {

    console.log('');
    console.log('====================================================');
    console.log('       WIKIRENACE | BOT ACTIVO');
    console.log('====================================================');
    console.log(`📚 Comunidad: ${CONFIG.comunidad}`);
    console.log(`🏛️ Institución: ${CONFIG.institucion}`);
    console.log(`🎓 Escuela: ${CONFIG.escuela}`);
    console.log('🤖 Estado: ESCUCHANDO EVENTOS');
    console.log('====================================================');
    console.log('');
});

// ============================================================
// MENSAJES
// ============================================================

client.on('message_create', async (msg) => {

    try {

        // Ignorar mensajes enviados por el propio bot
        if (msg.fromMe) return;

        const textoOriginal = msg.body || '';
        const texto = limpiarTexto(textoOriginal);

        if (!texto) return;

        console.log(
            `📩 Mensaje recibido: ${textoOriginal}`
        );

        // ====================================================
        // COMANDO MENÚ
        // ====================================================

        if (
            texto === '!menu' ||
            texto === '!comandos' ||
            texto === '!bot'
        ) {

            await msg.reply(MENSAJES.menu);

            console.log('✅ Menú enviado.');
            return;
        }

        // ====================================================
        // INFORMACIÓN
        // ====================================================

        if (
            texto === '!info' ||
            texto === '!wikirenace' ||
            texto === 'que es wikirenace'
        ) {

            await msg.reply(MENSAJES.info);

            console.log('✅ Información enviada.');
            return;
        }

        // ====================================================
        // REGISTRO
        // ====================================================

        if (
            texto === '!registro' ||
            texto === '!registrarme' ||
            texto === 'registro'
        ) {

            await msg.reply(MENSAJES.registro);

            console.log('✅ Formulario enviado.');
            return;
        }

        // ====================================================
        // REGLAS
        // ====================================================

        if (
            texto === '!reglas' ||
            texto === '!normas'
        ) {

            await msg.reply(MENSAJES.reglas);

            console.log('✅ Reglas enviadas.');
            return;
        }

        // ====================================================
        // CICLOS
        // ====================================================

        if (
            texto === '!ciclos' ||
            texto === '!ciclo'
        ) {

            await msg.reply(MENSAJES.ciclos);

            console.log('✅ Información de ciclos enviada.');
            return;
        }

        // ====================================================
        // WIKI
        // ====================================================

        if (
            texto === '!wiki' ||
            texto === '!web' ||
            texto === '!sitio'
        ) {

            await msg.reply(MENSAJES.wiki);

            console.log('✅ Información de Wiki enviada.');
            return;
        }

        // ====================================================
        // COMUNIDAD
        // ====================================================

        if (
            texto === '!comunidad' ||
            texto === '!grupo'
        ) {

            await msg.reply(MENSAJES.comunidad);

            console.log('✅ Información de comunidad enviada.');
            return;
        }

        // ====================================================
        // ADMINISTRADORES
        // ====================================================

        if (
            texto === '!admin' ||
            texto === '!admins' ||
            texto === '!administradores' ||
            texto === '!comision'
        ) {

            await msg.reply(MENSAJES.administradores);

            console.log('✅ Administradores enviados.');
            return;
        }

        // ====================================================
        // CONTACTO
        // ====================================================

        if (
            texto === '!contacto' ||
            texto === '!contactos'
        ) {

            await msg.reply(MENSAJES.contacto);

            console.log('✅ Contactos enviados.');
            return;
        }

        // ====================================================
        // AYUDA
        // ====================================================

        if (
            texto === '!ayuda' ||
            texto === '!soporte'
        ) {

            await msg.reply(MENSAJES.ayuda);

            console.log('✅ Ayuda enviada.');
            return;
        }

        // ====================================================
        // BOT
        // ====================================================

        if (
            texto === '!acercade' ||
            texto === '!sobrebot'
        ) {

            await msg.reply(MENSAJES.bot);

            console.log('✅ Información del bot enviada.');
            return;
        }

        // ====================================================
        // SALUDOS
        // ====================================================

        const saludos = [
            'hola',
            'holaa',
            'holaaa',
            'buenas',
            'buenos dias',
            'buenas tardes',
            'buenas noches',
            'hello',
            'hi'
        ];

        if (saludos.includes(texto)) {

            await msg.reply(`
👋 *¡Hola! Bienvenido/a a WikiRENACE.*

📚 Somos una comunidad académica de estudiantes de Administración de la *Universidad Nacional de Ucayali*.

🤖 Soy el asistente de WikiRENACE y puedo ayudarte con información básica.

Escribe:

*!menu*

para conocer todas las opciones disponibles.

🎓 *Administración | UNU*
`);

            console.log('👋 Saludo respondido.');
            return;
        }

        // ====================================================
        // PALABRAS CLAVE DE INFORMACIÓN
        // ====================================================

        if (
            texto.includes('informacion') ||
            texto.includes('información')
        ) {

            await msg.reply(`
ℹ️ *¿Qué información necesitas?*

Puedes consultar:

📚 *WikiRENACE*
→ Escribe *!info*

📝 *Registro*
→ Escribe *!registro*

📜 *Normas*
→ Escribe *!reglas*

🎓 *Ciclos*
→ Escribe *!ciclos*

👥 *Administradores*
→ Escribe *!administradores*

🌐 *Repositorio*
→ Escribe *!wiki*

🆘 *Ayuda*
→ Escribe *!ayuda*

💡 También puedes escribir *!menu*.
`);

            return;
        }

    } catch (error) {

        console.error(
            '❌ Error procesando mensaje:',
            error
        );
    }
});
// ============================================================
// CONTROL DE BIENVENIDAS
// ============================================================

const bienvenidos = new Map();

function yaFueBienvenido(participantId) {

    if (bienvenidos.has(participantId)) {
        return true;
    }

    bienvenidos.set(participantId, Date.now());

    setTimeout(() => {
        bienvenidos.delete(participantId);
    }, 10 * 60 * 1000);

    return false;
}

// ============================================================
// FUNCIÓN CENTRAL DE BIENVENIDA (CORREGIDA PARA COMUNIDADES)
// ============================================================

async function darBienvenida(notification, participantId) {

    try {

        if (yaFueBienvenido(participantId)) {
            return;
        }

        // Solución definitiva al error de getChatById en comunidades:
        // Obtenemos el chat de forma directa y segura usando chatId de la notificación
        const chat = await client.getChatById(notification.chatId).catch(() => null);
        if (!chat) return;

        let contact = null;
        try {
            contact = await client.getContactById(participantId);
        } catch (e) {
            // Si falla el contacto, se ignora para no detener el proceso
        }

        const nombre = contact ? obtenerNombre(contact) : 'nuevo integrante';

        const mensajeBienvenida = `
🎓 *¡BIENVENIDO/A A WIKIRENACE!*

Hola ${nombre} 👋

Te damos la bienvenida a la comunidad general de estudiantes de *Administración - UNU*.

📚 *¿Qué encontrarás aquí?*
- Información académica.
- Recursos y materiales.
- Actividades y oportunidades.
- Información de WikiRENACE.

📝 *Primer paso*
Completa tu registro oficial:

${CONFIG.formulario}

🤖 *¿Necesitas información?*
Escribe *!menu* para conocer todos los comandos disponibles.

📜 Te recomendamos revisar las normas con *!reglas*.

🤝 *WikiRENACE*
*Comunidad académica | Administración UNU*
`;

        const options = {};
        if (contact) {
            options.mentions = [contact];
        }

        await chat.sendMessage(mensajeBienvenida, options);

        console.log(
            `🎉 Bienvenida enviada correctamente a ${nombre}`
        );

    } catch (error) {

        console.error(
            '❌ Error enviando bienvenida:',
            error.message || error
        );
    }
}

// ============================================================
// BIENVENIDA AUTOMÁTICA A NUEVOS INTEGRANTES
// ============================================================

client.on('group_join', async (notification) => {

    try {

        const participantIds =
            notification.recipientIds || [];

        if (participantIds.length === 0) {
            return;
        }

        console.log(
            `👤 Nuevo ingreso detectado en chat ID: ${notification.chatId}`
        );

        for (const participantId of participantIds) {

            await darBienvenida(
                notification,
                participantId
            );
        }

    } catch (error) {

        console.error(
            '❌ Error detectando ingreso al grupo:',
            error.message || error
        );
    }
});

// ============================================================
// EVENTO DE DESCONEXIÓN
// ============================================================

client.on('disconnected', (reason) => {

    console.log('');
    console.log('⚠️ WIKIRENACE BOT DESCONECTADO');
    console.log('Motivo:', reason);
    console.log('');
});

// ============================================================
// CAMBIO DE ESTADO
// ============================================================

client.on('change_state', (state) => {

    console.log(
        `📡 Estado de WhatsApp: ${state}`
    );
});

// ============================================================
// INICIALIZAR
// ============================================================

console.log('');
console.log('====================================================');
console.log('     INICIANDO BOT WIKIRENACE...');
console.log('====================================================');
console.log('');

client.initialize();
