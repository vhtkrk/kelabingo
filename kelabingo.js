var Kelabingo = {
    init: function() {
        let select = document.querySelector('select[name="ttpaivat_selvitys1"]')
        if(select == null) 
            /* ei löydetty formia, eli ei olla vielä oikealla sivulla. */
            return;
        
        let divi = document.createElement("div");
        divi.innerHTML = `
        <a href="#" id="bingo_otsikko">[<span id="sign">+</span>] Kelabingo</a>
        <form id="kelaformi" onsubmit="return false" style="display: none">
        <table>
            <tr>
                <th>Pävät</th><th>ma</th><th>ti</th><th>ke</th><th>to</th><th>pe</th><th>la</th><th>su</th>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td><input type="checkbox" name="Ma" checked></td>
                <td><input type="checkbox" name="Ti" checked></td>
                <td><input type="checkbox" name="Ke" checked></td>
                <td><input type="checkbox" name="To" checked></td>
                <td><input type="checkbox" name="Pe" checked></td>
                <td><input type="checkbox" name="La"></td>
                <td><input type="checkbox" name="Su"></td>
            </tr>
            <tr>
                <td colspan="4">Tunnit <input type="text" name="tunnit" size="4"></td>
                <td colspan="4">Minuutit <input type="text" name="minuutit" size="4"></td>
            </tr>
            <tr>
                <td colspan="8">Selvitys <select name="toiminto" id="toiminto"></select></td>
        </table>
            <input type="button" value="Täytä kentät" id="fill">
        </form>`;

        /* kloonataan toiminnot suoraan oikeasta formista */
        divi.querySelector('#toiminto').innerHTML = select.innerHTML;

        divi.querySelector('#fill').onclick = Kelabingo.submit;

        divi.querySelector("#bingo_otsikko").onclick = function() {
            if(document.querySelector("#kelaformi").style.display != 'none' )
            {
                document.querySelector("#kelaformi").style.display = 'none';
                document.querySelector("#sign").textContent = "+";
            }
            else
            {
                document.querySelector("#kelaformi").style.display = 'block';
                document.querySelector("#sign").textContent = "-";
            }
        }

        divi.querySelector("#kelaformi").style.width = '25em';
        divi.style.zIndex = 100;
        divi.style.border = '1px #ffc600 solid';
        divi.style.background = '#fef5d8';
        divi.style.position = 'absolute';
        divi.style.padding = '3px';
        divi.style.margin = '5px';
        divi.style.top = '5px';
        divi.style.left = '5px';

        document.querySelector("body").insertAdjacentElement("afterbegin", divi);
    },

    submit: function() {
        let formi = document.querySelector("#kelaformi");
        let toiminto = formi.querySelector("#toiminto").value;
        let paivat = {};

        for(let pv of ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"])
        {
            paivat[pv] = formi.querySelector('input[name="' + pv + '"]').checked;
        }

        let rivit = document.querySelectorAll("td.taulukko_pv");
        for(let rivi of rivit)
        {
            if(paivat[rivi.textContent.trim()])
            {
                let p = rivi.parentNode;
                p.querySelector("select").value = toiminto;
                let tekstit = p.querySelectorAll('input[type="text"]');
                if(tekstit.length > 1)
                {
                    tekstit[0].value = formi.querySelector('input[name="tunnit"]').value;
                    tekstit[1].value = formi.querySelector('input[name="minuutit"]').value;
                }
            }
        }
    }
};

/* TODO: Keksi kivempi keino, kun setTimeout.
 * docsit kertoo, että voisi laittaa addEventListener("DOMContentLoaded", ...),
 * tai pelkkä addEventListener("load", ...), mutta en saanut äkkiseltään toimimaan. :(
 */
setTimeout(Kelabingo.init, 500);
//document.addEventListener("DOMContentLoaded", Kelabingo.init , false)