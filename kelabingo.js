var Kelabingo = {
    init: function() {
        var select = document.querySelector('select[name="ttpaivat_selvitys1"]')
        if(select == null) 
            /* ei löydetty formia, eli ei olla vielä oikealla sivulla. */
            return;
        
        var divi = document.createElement("div");
        divi.innerHTML = `
        <form id="kelaformi" onsubmit="return false">
        <table>
            <tr>
                <th>Pävät</th><th>ma</th><th>ti</th><th>ke</th><th>to</th><th>pe</th><th>la</th><th>su</th>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td><input type="checkbox" name="ma" checked></td>
                <td><input type="checkbox" name="ti" checked></td>
                <td><input type="checkbox" name="ke" checked></td>
                <td><input type="checkbox" name="to" checked></td>
                <td><input type="checkbox" name="pe" checked></td>
                <td><input type="checkbox" name="la"></td>
                <td><input type="checkbox" name="su"></td>
            </tr>
            <tr>
                <td colspan="4">Tunnit <input type="text" name="tunnit"></td>
                <td colspan="4">Minuutit <input type="text" name="minuutit"></td>
            </tr>
            <tr>
                <td colspan="2">Toiminto</td>
                <td colspan="6"><select name="toiminto"></select></td>
        </table>
            <input type="button" value="Täytä kentät" id="fill">
        </form>`;

        /* kloonataan toiminnot suoraan oikeasta formista */
        divi.querySelector('select[name="toiminto"]').innerHTML = select.innerHTML;

        divi.querySelector('#fill').onclick = Kelabingo.submit;

        var logo = document.querySelector("img.logo");
        logo.insertAdjacentElement("beforebegin", divi);
    },

    submit: function() {
        ;
    }
};

/* TODO: Keksi kivempi keino, kun setTimeout.
 * docsit kertoo, että voisi laittaa addEventListener("DOMContentLoaded", ...),
 * tai pelkkä addEventListener("load", ...), mutta en saanut äkkiseltään toimimaan. :(
 */
setTimeout(Kelabingo.init, 1500);
