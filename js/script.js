const req = new XMLHttpRequest();
req.open('GET', 'https://api.pokemontcg.io/v1/cards?supertype=pokemon', false); // False pour pas que ce soit asynchrone
req.send(null);

if (req.status === 200) {
    var pokedex = JSON.parse(req.responseText);
    var url = window.location.href;
    var params = (new URL(document.location)).searchParams;
    var info = params.get("id");
    console.log(pokedex.cards[1].name);

    for (var i = 0; i < pokedex.cards.length; i++) {
        // Tri ordre alphabetique

        function tri(a, b)

        {

            return (a.name > b.name) ? 1 : -1;

        }

        var listePokemons = pokedex.cards[i];

        listePokemons.sort(tri);

        console.log(listePokemons);

    }

    for (var i = 0; i < pokedex.cards.length; i++) {
        var trHead = document.createElement("tr");
        trHead.innerHTML = "<tr ><th class='content link' id='" + i + "'>" + pokedex.cards[i].name + "</th></tr>";
        var containerHead = document.getElementById("listPokemons");
        containerHead.appendChild(trHead);

        // Pagination

        pageSize = 10;

        showPage = function(page) {
            $(".content").hide();
            $(".content").each(function(n) {
                if (n >= pageSize * (page - 1) && n < pageSize * page)
                    $(this).show();
            });
        }

        showPage(1);

        $("#pagin li a").click(function() {
            $("#pagin li a").removeClass("current");
            $(this).addClass("current");
            showPage(parseInt($(this).text()))
        });

    }

    // Profil

    function getProfil(i) {

        var title = document.createElement("h2");
        title.innerHTML = "<h2>Profil de " + pokedex.cards[i].name.toUpperCase() + "</h2>";
        var divTitle = document.getElementById("titles");
        divTitle.appendChild(title);


        var trProfil = document.createElement("tr");
        trProfil.innerHTML =
            "<ul id='profilUl'><li><b>Id : </b>" + pokedex.cards[i].id + "</Li><br>" +
            "<li><b> Nom : </b>" + pokedex.cards[i].name + "</li><br>" +
            "<li><b> Nombre national Pokedex : </b>" + pokedex.cards[i].nationalPokedexNumber + "</li></ul>" +
            "<tr><td><b> Carte : </b><img src='" + pokedex.cards[i].imageUrl + "'></td></tr>";
        var containerProfil = document.getElementById("profil");
        containerProfil.appendChild(trProfil);

        // Bouton retour
        var returnBtn = document.createElement("a");
        returnBtn.innerHTML = "<a type='button' id='return' class='btn btn-secondary btn-lg btn-block' href='cards.html'>Retour</a>";
        var containerbtnReturn = document.getElementById("return");
        containerbtnReturn.appendChild(returnBtn);

        $('h2').replaceAll('h1');

    }

    // Affiche un profil sur clic

    $(".link").click(function(event)

        {
            var idTh = event.target.id;
            window.document.getElementById("head").remove();
            getProfil(idTh);

        });



} else {
    console.log("Status de la réponse: %d (%s)", req.status, req.statusText);
}
