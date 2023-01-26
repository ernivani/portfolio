
  const skills = document.querySelectorAll('#skills li');
  $(document).ready(function() {
      // Ajouter une fonction lorsque les éléments de la liste avec l'ID "skills" sont cliqués
      $("#skills li").click(function() {
          // Vérifier si un élément avec l'ID "popup-content" existe déjà dans le document
          if (document.getElementById("popup-content")) {
              // Vérifier si le contenu de cet élément est déjà égal à celui de l'élément de la liste cliqué
              if (document.getElementById("popup-content").querySelector("h2").innerHTML == $(this).text()) {
                  // Supprimer l'élément "popup-content" s'ils sont égaux
                  document.getElementById("popup-content").remove();
                  return;
              }
              // Supprimer l'élément "popup-content" pour être remplacé par un nouveau
              document.getElementById("popup-content").remove();
          }
          // Récupérer le texte de l'élément de la liste cliqué
          var text = $(this).text();
          // Récupérer les données associées à l'élément de la liste cliqué à partir d'un fichier JSON externe
          $.getJSON("/json/skills.json", function(data) {
              var data = data[text];
              // Créer un nouveau popup
              var popup = document.createElement('div');
              popup.id = "popup-content";
              // Ajouter le contenu du popup en utilisant les données récupérées
              popup.innerHTML = `
                        
              <h2>${data.nom}</h2>
              <p>${data.desc}</p>
              <p>Niveau Actuel :</p>
              <div class="progressbar-container">
                <div title="niveau" class="progressbar" style=" width: ${data.level}%;">${data.level}%</div>
              </div>
  `;
              // Modifier la couleur de la barre de progression en fonction du niveau actuel
              if (data.level < 30) {
                  popup.querySelector(".progressbar").style.backgroundColor = "#ff0000";
              } else if (data.level < 50) {
                  popup.querySelector(".progressbar").style.backgroundColor = "#ff8B00";
              } else if (data.level < 100) {
                  popup.querySelector(".progressbar").style.backgroundColor = "#00E720";
              }
              if (data.level < 15) {
                  popup.querySelector(".progressbar").style.color = "black";
              }
              // Ajouter un bouton de fermeture au popup
              var close = document.createElement('i');
              close.id = "popup-close";
              close.className = "fa fa-times";
              // Ajouter une fonction pour supprimer le popup lorsque le bouton de fermeture est cliqué
              close.addEventListener('click', function() {
                  popup.remove();
              });
              // Ce code ajoute la possibilité de fermer le popup en appuyant sur echap.
              document.addEventListener('keydown', function(e) {
                  if (e.key === "Escape") {
                      popup.remove();
                  }
              });
              popup.appendChild(close);
              // Ajouter la popup à la page
              document.body.appendChild(popup);
          });
      });
      // Ajouter une fonction lorsque l'utilisateur clique sur le popup
      $(document).on("mousedown", "#popup-content", function(e) {
        // Faire en sorte que l'élément "popup-content" soit déplaçable
          var $drag = $(this).addClass('draggable');
          // Récupérer les positions top et left de l'élément
          var z_idx = $drag.css('z-index'),
              drg_h = $drag.outerHeight(),
              drg_w = $drag.outerWidth(),
              pos_y = $drag.offset().top + drg_h - e.pageY,
              pos_x = $drag.offset().left + drg_w - e.pageX;
          // Appliquer les nouvelles positions top et left de l'élément lorsque le curseur bouge
            $drag.css('z-index', 1000).parents().on("mousemove", function(e) { 
                $('.draggable').offset({
                    top: e.pageY + pos_y - drg_h,
                    left: e.pageX + pos_x - drg_w
                }).on("mouseup", function() {
                    // Lorsque l'utilisateur relâche le bouton de la souris, supprimer la classe "draggable" et réinitialiser l'index z-index
                    $(this).removeClass('draggable').css('z-index', z_idx);
                });
            });
          e.preventDefault();
      }).on("mouseup", function() {
          // Supprimer la classe "draggable" lorsque l'utilisateur relâche le bouton de la souris
          $('.draggable').removeClass('draggable');
      });
  });
  // Ce code permet de créer une fenêtre de popup qui s'affiche lorsque l'utilisateur clique sur un élément de la liste de compétences.
  // La fenêtre de popup affiche le nom de la compétence, sa description, son niveau actuel et une barre de progression. Le contenu de la fenêtre de popup est chargé à partir d'un fichier JSON appelé "skills.json". 
  // La fenêtre de popup est également rendue draggable, c'est-à-dire que l'utilisateur peut la déplacer en cliquant et en faisant glisser la fenêtre. 
  // Il y a également un bouton de fermeture pour fermer la fenêtre de popup.  