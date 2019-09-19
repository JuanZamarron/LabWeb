$.ajax({
  url : 'https://tc2026daw.github.io/instrucciones/misc/comentarios.xml',
  type : 'GET',
  dataType : 'xml',
  success : function(data) {

    let newHtml = ''

    $(data).find('comment').each(function() {
      newHtml += `
        <div class="review">
          <h3>${$(this).find("name").text()}</h3>
          ${getStarsSpans($(this).find("stars").text())}
          <p>${$(this).find("text").text()}</p>
        </div>`
    })

    $('#seccion_reviews').append(newHtml)
  },
  error : function(errorMsg) {
    console.log(errorMsg)
  }
})

$('#escribe_reseña').on('click', function(){
  let $comentario = $('#seccion_comentario')
  let $reviews = $('#seccion_reviews')
  $comentario.removeClass('hidden')
  $reviews.removeClass('hidden')
})

$('#btn-publicar').on('click', function(){
  let $name = $('#nombre')
  let $comment = $('#comentario')
  let $email = $('#email')
  let $error = $('#error_comment')
  let $1 = $('#star1')
  let $2 = $('#star2')
  let $3 = $('#star3')
  let $4 = $('#star4')
  let $5 = $('#star5')
  let stars = 0

  if ($5.is(':checked')) {
    stars = 5
  } else if ($4.is(':checked')){
    stars = 4
  } else if ($3.is(':checked')){
    stars = 3
  } else if ($2.is(':checked')){
    stars = 2
  } else if ($1.is(':checked')){
    stars = 1
  } else {
    stars = 0
  }

  if ($name.val() == '' || $comment.text().length == 0){
    $error.removeClass('hidden')
  } else {
    newHtml = `
    <div class="review">
      <h3>${$name.val()}</h3>
      ${getStarsSpans(stars)}
      <p>${$comment.text()}</p>
    </div>`

    $('#seccion_reviews').append(newHtml)
    $name.val('')
    $comment.text('')
    $email.val('')
    $error.addClass('hidden')
  }
})

$('#btn-limpiar').on('click', function(){
  let $name = $('#nombre')
  let $comment = $('#comentario')
  let $email = $('#email')
  let $error = $('#error_comment')

  $name.val('')
  $comment.text('')
  $email.val('')
  $error.addClass('hidden')

})
/*
1. Función que muestra y esconde la sección para hacer comentarios 
   al hacer click el botón 'Escribe una reseña'. 
   on click!
   (5 puntos)
*/



/*
2. Cargar los comentarios de el archivo comentarios.xml o bien de 
  https://tc2026daw.github.io/instrucciones/misc/comentarios.xml 
  (función ajax, 25 puntos)
*/


/*
3. Funcion que apendiza el nuevo comentario al darle click a PUBLICAR
  on click!
  (función, 35 puntos)
*/


/*
4. Funcion que limpia el nombre, el email y el div "#comentarios" al darle
   click en "btn-limpiar" con leyenda de "CANCELAR"
   on click!
  (5 puntos)
*/


/*
Funcion que recibe un numero de stars y regresa los 5 spans 
que simbolizan las estrellas del rating. por ejemplo:
let stars = 3;
let html = getStarsSpans(stars);

html = '
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star checked"></span>
<span class="fa fa-star"></span>
<span class="fa fa-star"></span>
'
*/
function getStarsSpans(stars) {
  let new_html = '';
  for( let i = 0; i < stars; i++) {
    new_html += `
      <span class="fa fa-star checked"></span>
    `;
  }

  for ( let i = 0; i < 5 - stars; i++ ) {
    new_html += `
      <span class="fa fa-star"></span>
    `;
  }

  return new_html;
}
